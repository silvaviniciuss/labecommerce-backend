import express, { Request, Response } from 'express'
import cors from "cors"
import { TProducts, TUsers } from './types'
import { db } from './database/knex'
import { theme } from '@chakra-ui/react'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get('/users', async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("Campo nome deve ser string!")
            }
        }
        if (name) {
            const result: TUsers[] = await db("users")
            .select(
                "id",
                "name",
                "email",
                "password",
                "created_at AS createdAt"
                )
            .where("users.name", "LIKE", `%${name}%`)
            if (result.length !== 0) {
                res.status(200).send(result)
            } else {
                res.status(404).send({ message: "Usuário não encontrado" })
            }
        } else {
            const result2: TUsers[] = await db("users")
            .select(
                "id",
                "name",
                "email",
                "password",
                "created_at AS createdAt"
                )
            res.status(200).send(result2)
        }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/products", async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string

        if (name !== undefined && name.length === 0) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("Campo nome deve ser string!")
            }
            res.status(400)
            throw new Error("o campo nome deve possuir pelo menos um caractere")
        }
        if (name) {
            const result: TProducts[] = await db("products")
            .select(
                "id",
                "name",
                "price",
                "description",
                "image_url AS imageUrl"
                )
            .where("products.name", "LIKE", `%${name}%`)
            if (result.length !== 0) {
                res.status(200).send(result)
            } else {
                res.status(404).send({ message: "Produto não encontrado" })
            }
        } else {
            const result2: TProducts[] = await db("products")
            .select(
                "id",
                "name",
                "price",
                "description",
                "image_url AS imageUrl"
                )
            res.status(200).send(result2)
        }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.post("/users", async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string
        const createdAt = new Date().toLocaleString("pt-br")

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' de ser no formato string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' de ser no formato string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' de ser no formato string")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' de ser no formato string")
        }

        const [idExist] = await db("users").where("users.id", "=", `${id}`)

        if (idExist) {
            res.status(400)
            throw new Error('"id" já cadatrado')
        }

        const [emailExist] = await db("users").where("users.email", "=", `${email}`)

        if (emailExist) {
            res.status(400)
            throw new Error('"email" já cadatrado')
        }

        await db("users")
            .insert({
                id, name, email, password, created_at: createdAt
            })

        res.status(201).send({ message: "Cadastro realizado com sucesso!" })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/products", async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const description = req.body.description as string
        const imageUrl = req.body.imageUrl as string

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser no formato string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser no formato string")
        }

        if (typeof price !== "number") {
            res.status(400)
            throw new Error("'price' deve ser no formato number")
        }

        if (typeof description !== "string") {
            res.status(400)
            throw new Error("'description' deve ser no formato string")
        }

        if (typeof imageUrl !== "string") {
            res.status(400)
            throw new Error("'imageUrl' deve ser no formato string")
        }

        const [idExist] = await db("products").where("products.id", "=", `${id}`)

        if (idExist) {
            res.status(400)
            throw new Error('id do produto ja cadastrado')
        }

        await db("products")
            .insert({
                id, name, price, description, image_url: imageUrl
            })

        res.status(201).send({ message: "Produto cadastrado com sucesso" })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const buyer = req.body.buyer
        const products = req.body.products
        const createAt = new Date().toLocaleString("pt-br")

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' precisa ser string")
        }

        if (typeof buyer !== "string") {
            res.status(400)
            throw new Error("'comprador' precisa ser string")
        }

        const [purchase] = await db('purchases').where({ id })

        if (purchase) {
            res.status(400)
            throw new Error("purchase existente")
        }

        const resultProducts = []
        let totalPrice = 0
        for (let prod of products) {
            const [product] = await db('products').where({ id: prod.id })
            if (!product) {
                res.status(400)
                throw new Error(`${prod.id} não encontrado`)
            }
            resultProducts.push({ ...product, quantity: prod.quantity })
        }

        for (let product of resultProducts) {
            totalPrice += product.price * product.quantity
        }

        const newPurchase = {
            id, buyer, total_price: totalPrice, created_at: createAt
        }

        await db('purchases').insert(newPurchase)

        for (let product of products) {
            const newPurchaseProducts = {
                purchase_id: id,
                product_id: product.id,
                quantity: product.quantity
            }
            await db('purchases_products').insert(newPurchaseProducts)
        }

        res.status(201).send({ message: "Compra cadastrada com sucesso" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToFind = req.params.id
        const [purchase] = await db("purchases").where({ id: idToFind })
        if (purchase) {
            const [result] = await db("purchases")
                .select(
                    "purchases.id AS purchaseId",
                    "purchases.buyer AS buyerId",
                    "users.name AS buyerName",
                    "users.email AS buyerEmail",
                    "purchases.total_price AS totalPrice",
                    "purchases.created_at AS createdAt"
                )
                .innerJoin(
                    "users",
                    "purchases.buyer",
                    "=",
                    "users.id"
                )
                .where("purchases.id", "=", idToFind)

            const products = await db("purchases_products")
                .select(
                    "prod.id AS id",
                    "prod.name AS name",
                    "prod.price AS price",
                    "prod.description AS description",
                    "prod.image_url AS imageUrl",
                    "purchases_products.quantity AS quantity"
                )
                .innerJoin(
                    "products AS prod",
                    "purchases_products.product_id",
                    "=",
                    "prod.id"
                )
                .where("purchases_products.purchase_id", "=", idToFind)

            res.status(200).send({ ...result, products })

        } else {
            res.status(404)
            throw new Error("Compra não encontrada")
        }

    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [findToDelete] = await db("users").where({ id: idToDelete })

        if (findToDelete) {
            await db("users").del().where({ id: idToDelete })
            res.status(200).send({ message: "Usuário deletado com sucesso!" })
        } else {
            res.status(404)
            throw new Error("Usuário não encontrado!")
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.delete("/purchases/:id",async (req:Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const [findToDelete] = await db("purchases").where({id: idToDelete})

        if(findToDelete) {
            await db("purchases").del().where({id: idToDelete})
            res.status(200).send({message: "Pedido cancelado com sucesso"})
        } else {
            res.status(404)
            throw new Error("Pedido inexistente")
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const findToDelete = await db("products").where({ id: idToDelete })

        if (findToDelete) {
            await db("products").del().where({ id: idToDelete })
            res.status(200).send({ message: "Produto apagado com sucesso!!" })
        } else {
            res.status(404)
            throw new Error("Produto não encontrado")
        }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id
        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.imageUrl as string | undefined

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("Id deve ser uma string")
            }
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("Name deve ser uma string")
            }
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("Preço deve ser um valor numérico")
            }
        }

        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400)
                throw new Error("Descrição  deve ser uma string")
            }
        }

        if (newImageUrl !== undefined) {
            if (typeof newImageUrl !== "string") {
                res.status(400)
                throw new Error("ImageUrl  deve ser uma string")
            }
        }

        const [updateProduct] = await db("products").where({ id: idToEdit })

        if (updateProduct) {
          
                await db("products").update({
                    id: newId || updateProduct.id,
                    name: newName || updateProduct.name,
                    description: newDescription || updateProduct.description,
                    image_url: newImageUrl || updateProduct.imageUrl,
                    price: isNaN(Number(newPrice)) ? updateProduct.price : newPrice as number
                }).where({ id: idToEdit })
                res.status(200).send({ message: "Produto atualizado com sucesso!" })
           
        } else {
            res.status(404)
            throw new Error("Produto não encontrado")
        }
    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
