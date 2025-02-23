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

---

## **Endpoints da API**

### **1️⃣ Listar Cafés**
- **Rota:** `GET /api/menu`
- **Funcionalidade:** Retorna a lista de todos os cafés disponíveis no menu.
  
- **Cabeçalhos:**
  - `Accept: application/json` → Define que o cliente espera resposta em JSON.
- **Respostas:**
  - `200 OK`: Retorna a lista de cafés.
 
**Exemplo de Requisição:**
```http
GET /api/menu HTTP/1.1
Host: api.starcafe.com
Accept: application/json
```

**Exemplo de Resposta:**
    ```json
    [
      {
        "id": 1,
        "nome": "Pão de Batata",
        "preço": 7.0,
        "tamanho": "Médio",
        "status": "em preparação
      }
    ]
    ```

---

### **2️⃣ Buscar Café por ID**
- **Rota:** `GET /api/order/:id`
- **Funcionalidade:** Retorna um café específico pelo ID.

- **Cabeçalhos:**
  - `Accept: application/json`
- **Respostas:**
  - `200 OK`: Retorna o café encontrado.
  - `404 Not Found`: Se o ID não existir.
    
 **Exemplo de Requisição:**
```http
GET /api/order/123e4567-e89b-12d3-a456-426614174000 HTTP/1.1
Host: api.starcafe.com
Accept: application/json
```

**Exemplo de Resposta:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "itens": [
    {"nome": "Café Preto", "preco": 5.0, "status": "pendente"}
  ],
  "status": "pendente"
}
```

---

### **3️⃣ Criar um Novo Café**
- **Rota:** `POST /api/order`
- **Funcionalidade:** Adiciona um novo café ao menu.
  
- **Cabeçalhos:**
  - `Content-Type: application/json` → Define que o corpo da requisição está em JSON.
  - `Accept: application/json`
-**Respostas:**
- `201 Created` → Pedido criado com sucesso.
- `400 Bad Request` → Erro ao criar o pedido (exemplo: pedido vazio ou item inexistente).

**Exemplo de Requisição:**
```http
POST /api/order HTTP/1.1
Host: api.starcafe.com
Content-Type: application/json
Accept: application/json

{
  "itens": ["Bolo de Fubá"]
}
```

**Exemplo de Resposta:**
```json
{
  "message": "Pedido realizado com sucesso!",
  "pedido": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "itens": [
      {"nome": "Bolo de Fubá", "preco": 7.0, "status": "pendente"}
    ],
    "status": "pendente"
  }
}
```

---

### **4️⃣ Remover um Café**
- **Rota:** `DELETE /api/order/:id`
- **Funcionalidade:** Remove um café do menu pelo ID.

- **Cabeçalhos:**
  - `Accept: application/json`
- **Respostas:**
-  `200 OK` → Pedido cancelado com sucesso.
- `403 Forbidden` → Pedido não pode ser cancelado pois já está em andamento ou finalizado.
- `404 Not Found` → Pedido não encontrado.
  
  **Exemplo de Requisição:**
```http
DELETE /api/order/123e4567-e89b-12d3-a456-426614174000 HTTP/1.1
Host: api.starcafe.com
Accept: application/json
```

**Exemplo de Resposta:**
```json
{
  "message": "Pedido cancelado com sucesso!"
}
```

---

## Como Executar
1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o servidor:
   ```sh
   npm start
   ```
3. Acesse a API em `http://localhost:3000/api`


