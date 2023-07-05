import express, { Request, Response } from 'express'
import cors from "cors"
import { createUser, products, users } from './database'
import { TProducts, TUsers } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get("/products", (req: Request, res: Response) => {
    const name = req.query.name as string

    if (name) {
        const result: TProducts[] = products.filter((product) =>
            product.name.toLowerCase().includes(name.toLowerCase())
        )
        res.status(200).send(result)
    } else {
        res.status(200).send(products)
    }

})

app.post("/users", (req: Request, res: Response) => {

    const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string
    // const createdAt = new Date().toLocaleString("pt-br")

    createUser(id, name, email, password)

    // const newUsers : TUsers = {
    //     id,
    //     name,
    //     email,
    //     password, 
    //     createdAt
    // }

    // users.push(newUsers)

    res.status(201).send("Usuário cadatrado com sucesso!")

})


app.post("/products", (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string

    const newProduct: TProducts = {
        id,
        name,
        price,
        description,
        imageUrl
    }

    products.push(newProduct)

    res.status(201).send("Produto cadastrado com sucesso!")

})

app.delete("/users/:id", (req: Request, res: Response) => {
    const findToDelete = req.params.id

    const userIndex = users.findIndex((user) => user.id === findToDelete)

    if (userIndex >= 0) {
        users.splice(userIndex, 1)
    }

    res.status(200).send("User apagado com sucesso!!")

})

app.delete("/products/:id", (req: Request, res: Response) => {
    const findToDelete = req.params.id

    const productIndex = products.findIndex((product) => product.id === findToDelete)

    if (productIndex >= 0) {
        products.splice(productIndex, 1)
    }

    res.status(200).send("Produto apagado com sucesso!!")

})

app.put("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined

    const updateProduct = products.find((product) => product.id === id)

    if (updateProduct) {
        updateProduct.id = newId || updateProduct.id
        updateProduct.name = newName || updateProduct.name
        updateProduct.description = newDescription || updateProduct.description
        updateProduct.imageUrl = newImageUrl || updateProduct.imageUrl
        updateProduct.price = isNaN(Number(newPrice)) ? updateProduct.price : newPrice as number 
    }

    res.status(200).send("Produto atualizado com sucesso!!")

})

