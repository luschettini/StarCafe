# Documentação da API - StarCafé

## Descrição
A API StarCafé permite visualizar o cardápio, efetuar pedidos e verificar ou cancelar pedidos já realizados na cafeteria. As respostas são sempre retornadas em formato JSON.

## Tecnologias Utilizadas
- Node.js
- Express
- UUID para identificação de pedidos e produtos

## HTTP esperados:
- `Content-Type: application/json` → Define que o corpo da requisição/resposta está em JSON.
- `Accept: application/json` → Indica que o cliente espera uma resposta em JSON.

## Postman
Foram criadas coleções de requisições para testar a API.

## Endpoints

### 1. GET /api/menu
**Descrição:** Retorna a lista do cardápio da cafeteria, exibindo detalhadamente todos os itens disponíveis para os clientes.

**Cabeçalhos da Requisição:**
- `Accept: application/json` → Indica que o cliente deseja receber a resposta no formato JSON.

**Códigos de Status:**
- `200 OK` → O menu é retornado com sucesso.

**Exemplo de Requisição:**
```http
GET /api/menu HTTP/1.1
Host: api.starcafe.com
Accept: application/json
```

**Exemplo de Resposta:**
```json
[
  {"nome": "Café Preto", "preco": 5.0, "tamanho": "grande", "status": "pendente"},
  {"nome": "Pão de Batata", "preco": 7.0, "tamanho": "médio", "status": "em preparação"},
  {"nome": "Pão na Chapa", "preco": 4.0, "tamanho": "grande", "status": "em preparação"},
  {"nome": "Cappucino", "preco": 4.0, "tamanho": "grande", "status": "pronto"},
  {"nome": "Bolo de Fubá", "preco": 6.0, "tamanho": "grande", "status": "pronto"}
]
```

---


