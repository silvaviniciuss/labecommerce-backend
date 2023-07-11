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
    try {
        const name = req.query.name as string
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("Campo nome deve ser string!")
            }
        }
        if (name) {
            const result: TUsers[] = users.filter((user) =>
                user.name.toLowerCase().includes(name.toLowerCase())
            )
            res.status(200).send(result)
        } else {
            res.status(200).send(users)
        }
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.get("/products", (req: Request, res: Response) => {
    try {
        const name = req.query.name as string

        if (name !== undefined && name.length === 0) {
            res.status(400)
            throw new Error("o campo nome deve possuir pelo menos um caractere")
        }

        if (name) {
            const result: TProducts[] = products.filter((product) =>
                product.name.toLowerCase().includes(name.toLowerCase())
            )
            res.status(200).send(result)
        } else {
            res.status(200).send(products)
        }

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.post("/users", (req: Request, res: Response) => {
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

        const findId = users.find((user) => user.id === id)

        if (findId) {
            res.status(400)
            throw new Error("Id ja cadastrado no sistema")
        }

        const findEmail = users.find((user) => user.email === email)

        if (findEmail) {
            res.status(400)
            throw new Error("Email ja cadastrado no sistema")
        }

        const newUsers: TUsers = {
            id,
            name,
            email,
            password,
            createdAt
        }

        users.push(newUsers)

        res.status(201).send("Usuário cadatrado com sucesso!")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})


app.post("/products", (req: Request, res: Response) => {
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

        const findId = products.find((product) => product.id === id)

        if (findId) {
            res.status(409)
            throw new Error("Id ja cadastrado no sistema")
        }

        const newProduct: TProducts = {
            id,
            name,
            price,
            description,
            imageUrl
        }

        products.push(newProduct)

        res.status(201).send("Produto cadastrado com sucesso!")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }


})

app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const findToDelete = users.find((user) => user.id === id)

        if (findToDelete) {
            const userIndex = users.findIndex((user) => user.id === id)
            if (userIndex >= 0) {
                users.splice(userIndex, 1)
            }
            res.status(200).send("User apagado com sucesso!!")
        } else {
            res.status(404)
            throw new Error("Id não encontrado")
        }
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.delete("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const findToDelete = products.find((product) => product.id === id)

        if (findToDelete) {
            const productIndex = products.findIndex((product) => product.id === id)
            if (productIndex >= 0) {
                products.splice(productIndex, 1)
            }
            res.status(200).send("Produto apagado com sucesso!!")
        } else {
            res.status(404)
            throw new Error("Produto não encontrado")
        }
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
    
        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.imageUrl as string | undefined
    
        const updateProduct = products.find((product) => product.id === id)
        
        if(newId !== undefined) {
            if(typeof newId !== "string") {
                res.status(400)
                throw new Error("Id deve ser uma string")
            }
        }
        
        if(newName !== undefined) {
            if(typeof newName !== "string") {
                res.status(400)
                throw new Error("Name deve ser uma string")
            }
        }
        
        if(newPrice !== undefined) {
            if(typeof newPrice !== "number") {
                res.status(400)
                throw new Error("Preço deve ser um valor numérico")
            }
        }
        
        if(newDescription !== undefined) {
            if(typeof newDescription !== "string") {
                res.status(400)
                throw new Error("Descrição  deve ser uma string")
            }
        }
        
        if(newImageUrl !== undefined) {
            if(typeof newImageUrl !== "string") {
                res.status(400)
                throw new Error("ImageUrl  deve ser uma string")
            }
        }
        
        if (updateProduct) {
            updateProduct.id = newId || updateProduct.id
            updateProduct.name = newName || updateProduct.name
            updateProduct.description = newDescription || updateProduct.description
            updateProduct.imageUrl = newImageUrl || updateProduct.imageUrl
            updateProduct.price = isNaN(Number(newPrice)) ? updateProduct.price : newPrice as number
            res.status(200).send("Produto atualizado com sucesso!!")
        } else {
            res.status(404)
            throw new Error("Produto não encontrado")
        }
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})
