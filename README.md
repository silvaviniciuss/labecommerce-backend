<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-como-executar-a-api">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
</p>

## 💻 Sobre o projeto

Projeto desenvolvido no **Bootcamp Web Full-Stack** da [Labenu](https://www.labenu.com.br/curso-de-programacao-web-full-stack-integral), com o intuito de criar uma API, ou seja a comunicação
entre front e back-end.

---

## ⚙️ Funcionalidades
 API disponibiliza os seguintes endpoints de conexão com o banco de dados:
  - [x] Get all users - requisão retorna todos os usuários cadastrados no banco de dados.
  - [x] Get all products -requisão retorna todos os produtos cadastrados no banco de dados.
  - [x] Create user - requisão para a criação de um novo usuário.
  - [x] Create product - requisão para a criação de um novo produto.
  - [x] Delete user by id - requisão para a exclusão de usuário.
  - [x] Delete product by id - requisão para a exclusão de produto.
  - [x] Edit product by id - requisão para a edição de produto.
  - [x] Create purchase - requisão para cadastro de uma compra.
  - [x] Get purchase by id - requisão retorna detalhes da compra.
  - [x] Delete purchase by id - requisão para o cancelamento da compra.

---

## 🚀 Como executar a api

### Pré-requisitos
Ferramentas que devem ser instaladas para a correta execução da API:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Postman](https://www.postman.com/downloads/) ou a sua versão WEB [PostmanWeb](https://web.postman.co)

Ferramenta para edição de códigos:
- [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando a API

Utilizar os seguintes comandos:
```bash

# Clone este repositório
$ git clone https://github.com/silvaviniciuss/labecommerce-backend

# Acesse a pasta do projeto no terminal/cmd
$ cd Labecommerce-back-end

# Para abrir o vsCode
$ code .

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3003 

```

Referencie a documentação da [API](https://documenter.getpostman.com/view/27681045/2s946mZ9Zt).

### Requisições
```
'http://localhost:3003/'

```

#### Get all users
```
http://localhost:3003/users
```
Retorna todos os usuários cadastrados em um Array de Obejtos [{}].
```
[
    {
        "id": "u001",
        "name": "Vinicius da Silva",
        "email": "viniciusdasilvax@gmail.com",
        "password": "12345",
        "createdAt": "2023-07-20 10:31:20"
    },
    {
        "id": "u002",
        "name": "Danieli H. Ferreira",
        "email": "danieli@gmail.com",
        "password": "12345",
        "createdAt": "2023-07-20 10:31:20"
    },
    {
        "id": "u003",
        "name": "Jarcelino da Silva",
        "email": "jarcelino@gmail.com",
        "password": "12345",
        "createdAt": "2023-07-20 10:31:20"
    }
]
```
```
http://localhost:3003/users?name=vinicius
```
Retorna o resultado da pesquisa em um array de obejtos [{}].
```
[
    {
        "id": "u001",
        "name": "Vinicius da Silva",
        "email": "viniciusdasilvax@gmail.com",
        "password": "12345",
        "createdAt": "2023-07-20 10:31:20"
    }
]
```
```
http://localhost:3003/users?name=fulano
```
Retorna um objeto {} com a mensagem de Usuário não encotrado.
```
{
    "message": "Usuário não encontrado"
}
```

#### Create user
```
http://localhost:3003/users
```
Nescessário informar os seguintes dados:
```
{
    "id": "u005",
    "name": "Astrodev",
    "email": "astrodev@gmail.com",
    "password": "123456"
}
```
resultado positvo de cadastro:
```
{
    "message": "Cadastro realizado com sucesso!"
}
```
Restrições ao cadastrar:
- Não permite dualidade de ID e email.

##### Create product
```
http://localhost:3003/products
```
Nescessário informar os seguintes dados:
```
{
    "id": "p003",
    "name": "Teclado gamer",
    "price": 313,
    "description": "Melhor teclado do mercado",
    "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400"
}
```
resultado positvo de cadastro:
```
{
    "message": "Cadastro realizado com sucesso!"
}
```
Restrições ao cadastrar:
- Não permite dualidade de ID e email.


#### Get all products
```
http://localhost:3003/products
```
Retorna todos os produtos cadastrados em um Array de Obejtos [{}].
```
[
    {
        "id": "p001",
        "name": "Monitor Gamer",
        "price": 250,
        "description": "Melhor Monitor do Mercado",
        "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        "id": "p002",
        "name": "Mouse Gamer",
        "price": 199,
        "description": "Melhor Monitor do Mercado",
        "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        "id": "p003",
        "name": "Teclado Gamer",
        "price": 230,
        "description": "Melhor Monitor do Mercado",
        "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        "id": "p004",
        "name": "Mesa Gamer",
        "price": 800,
        "description": "Melhor Monitor do Mercado",
        "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        "id": "p005",
        "name": "Cadeira Gamer",
        "price": 1400,
        "description": "Melhor Monitor do Mercado",
        "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400"
    }
]
```
```
http://localhost:3003/users?name=vinicius
```
Retorna o resultado da pesquisa em um array de obejtos [{}].
```
[
    {
        "id": "u001",
        "name": "Vinicius da Silva",
        "email": "viniciusdasilvax@gmail.com",
        "password": "12345",
        "createdAt": "2023-07-20 10:31:20"
    }
]
```
```
http://localhost:3003/users?name=fulano
```
Retorna um objeto {} com a mensagem de Usuário não encotrado.
```
{
    "message": "Usuário não encontrado"
}
```
#### Edit product by id
```
http://localhost:3003/products/:id
```
Nescessário informar o parametro do produto (id) que desejar editar,
passando o campo qe dejesa alterar.

```
{
        "name": "Cadeira Gamer",
        "price": 1400,
        "description": "Melhor Monitor do Mercado",
        "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400"
}
```
```
{
    "message": "Produto atualizado com sucesso!"
}
```

#### Create purchase
```
http://localhost:3003/purchases
```
Realiza o cadastro dos pedidos.
```
{
    "id": "pur001",
    "buyer": "u001",
    "products": [
        {
            "id": "p001",
            "quantity": 2
        },
        {
            "id": "p002",
            "quantity": 1
        }
    ]
}
```
Retrições:
- Dualidade de ID
- Usuário não cadastrado
- Produto não cadastrado

#### Delete purchase by id
```
http://localhost:3003/purchases/:id
```
Nescessário informar o parametro da compra (id) que desejar cancelar.
```
{
    "message": "Pedido cancelado com sucesso"
}
```

#### Get purchase by id
```
http://localhost:3003/purchases/:id
```
Retorna todos as compras cadastradas em um obejto {}. 
```
{
    "purchaseId": "pur001",
    "buyerId": "u001",
    "buyerName": "Vinicius da Silva",
    "buyerEmail": "viniciusdasilvax@gmail.com",
    "totalPrice": 699,
    "createdAt": "21/07/2023, 13:20:09",
    "products": [
        {
            "id": "p001",
            "name": "Monitor gammer widescreen",
            "price": 250,
            "description": "Melhor Monitor do Mercado",
            "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400",
            "quantity": 2
        },
        {
            "id": "p002",
            "name": "Mouse Gamer",
            "price": 199,
            "description": "Melhor Monitor do Mercado",
            "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400",
            "quantity": 1
        }
    ]
}
```

## 🛠 Tecnologias

Ferramentas utilizadas no desenvolvimento do projeto:

-   [NodeJS](https://nodejs.org/en/) - software que permite a execução de JS fora de um navegador WEB.
-   [CORS](https://expressjs.com/en/resources/middleware/cors.html) - biblioteca que permite enviar requisições de uma página hospedada localmente.
-   [APIs & Express](https://expressjs.com/pt-br/) - framework de recursos para impletar funcionalidades em APIs.
-   [TypeScript](https://www.typescriptlang.org/) - linguagem de programação que adiciona tipagem estática ao JS.
-   [ts-node](https://github.com/TypeStrong/ts-node) - ferramenta de compilação de projetos TypeScript.
-   [SQLite](https://github.com/mapbox/node-sqlite3) - banco de dados.
-   [Knex](https://knexjs.org/guide/query-builder.html) - permite que os códigos SQL sejam mais estruturados.
