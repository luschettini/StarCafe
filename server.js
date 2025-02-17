const Produto = require("../models/Produto");
const ListaMenu = require("../models/ListaMenu");
const PedidoLista = require("../models/PedidoLista");
const { v4: uuidv4 } = require("uuid");

const listaMenu = new ListaMenu();
const pedidoLista = new PedidoLista();

const produto1 = new Produto("Café com Leite", 5.0, "grande");
const produto2 = new Produto("Pão de Queijo", 3.0, "médio");
const produto3 = new Produto("Tapioca", 7.0, "grande", "em preparação");
const produto4 = new Produto("Bolo de Cenoura", 4.0, "grande", "pronto");
const produto5 = new Produto("Café Expresso", 3.0, "pequeno");

listaMenu.addProduto(produto1);
listaMenu.addProduto(produto2);
listaMenu.addProduto(produto3);
listaMenu.addProduto(produto4);
listaMenu.addProduto(produto5);

const pedidoController = {
  createOrder: (req, res) => {
    try {
      const { itens } = req.body;
      if (!itens || !Array.isArray(itens) || itens.length === 0) {
        return res
          .status(400)
          .json({ error: "O pedido deve conter itens válidos." });
      }
      const pedidoItens = [];
      let statusPedido = "pendente";
      for (const nomeItem of itens) {
        // Verifica se o produto está no menu
        const produto = listaMenu
          .getMenu()
          .find((item) => item.nome === nomeItem);
        if (!produto) {
          return res
            .status(400)
            .json({ error: `Item '${nomeItem}' não encontrado no menu.` });
        }
        pedidoItens.push(produto);
        // Define o status do pedido com base no status dos produtos
        if (produto.status === "pronto") {
          statusPedido = "pronto";
        } else if (
          produto.status === "em preparação" &&
          statusPedido !== "pronto"
        ) {
          statusPedido = "em preparação";
        }
      }
      // Cria o objeto do pedido com um ID único, os itens e o status
      const pedido = {
        id: uuidv4(),
        itens: pedidoItens,
        status: statusPedido,
      };
      pedidoLista.addPedido(pedido);
      res.status(201).json({
        message: "Pedido realizado com sucesso!",
        pedido: {
          id: pedido.id, // ID do pedido gerado
          itens: pedido.itens.map((item) => ({
            nome: item.nome,
            preco: item.preco,
            status: item.status,
          })),
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getMenu: (req, res) => {
    res.json(listaMenu.getMenu());
  },
  getOrderById: (req, res) => {
    try {
      const pedido = pedidoLista.getPedidoById(req.params.id);
      res.json(pedido);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  deleteOrder: (req, res) => {
    try {
      const pedidoId = req.params.id;
      const pedido = pedidoLista.getPedidoById(pedidoId);
      if (pedido.status !== "pendente") {
        return res.status(403).json({
          error:
            "O pedido não pode ser cancelado, pois já foi preparado ou está em outro status.",
        });
      }
      pedidoLista.deletePedido(pedidoId);
      res.json({ message: "Pedido cancelado com sucesso!" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};
module.exports = pedidoController;