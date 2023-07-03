import { TProducts, TUsers } from "./types";

export const users: TUsers[] = [
    {
        id: "u001",
        name: "Fulado",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: new Date().toLocaleString("pt-br")
    }, {
        id: "u002",
        name: "Beltrana",
        email: "beltrana@email.com",
        password: "beltrana00",
        createdAt: new Date().toLocaleString("pt-br")
    },
]

export const products: TProducts[] = [
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    }, {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
]

export const createUser = (id: string, name: string, email: string, password: string): void => {
    const newUser: TUsers = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toLocaleString("pt-br")
    }
    users.push(newUser)
    console.log("Cadastro realizado com sucesso!")
}

export const getAllUsers = (): TUsers[] => {
    return users
}

export const createProduct = (id: string, name: string, price: number, description: string, imageUrl: string): void => {
    const newProduct: TProducts = {
        id,
        name,
        price,
        description,
        imageUrl
    }
    products.push(newProduct)
    console.log("Cadatro realizado com sucesso!")
}

export const getAllProducts = (): TProducts[] => {
    return products
}

export const searchProductsByName = (name: string): TProducts[] => {
    const search = products.filter((product) => {
        return product.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    })
    return search
}   
