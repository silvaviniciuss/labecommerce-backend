-- Active: 1689010433123@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createAt TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (id, name, email, password, createAt)
VALUES ('u001', 'Vinicius da Silva', 'viniciusdasilvax@gmail.com', '12345', DATETIME('now'));
INSERT INTO users (id, name, email, password, createAt)
VALUES ('u002', 'Danieli H. Ferreira', 'danieli@gmail.com', '12345', DATETIME('now'));
INSERT INTO users (id, name, email, password, createAt)
VALUES ('u003', 'Jarcelino da Silva', 'jarcelino@gmail.com', '12345', DATETIME('now'));

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url)
VALUES ('p001', 'Monitor Gamer', 1546.99, 'Melhor Monitor do Mercado', 'https://picsum.photos/seed/Mouse%20gamer/400');
INSERT INTO products (id, name, price, description, image_url)
VALUES ('p002', 'Mouse Gamer', 1546.99, 'Melhor Monitor do Mercado', 'https://picsum.photos/seed/Mouse%20gamer/400');
INSERT INTO products (id, name, price, description, image_url)
VALUES ('p003', 'Teclado Gamer', 1546.99, 'Melhor Monitor do Mercado', 'https://picsum.photos/seed/Mouse%20gamer/400');
INSERT INTO products (id, name, price, description, image_url)
VALUES ('p004', 'Mesa Gamer', 1546.99, 'Melhor Monitor do Mercado', 'https://picsum.photos/seed/Mouse%20gamer/400');
INSERT INTO products (id, name, price, description, image_url)
VALUES ('p005', 'Cadeira Gamer', 1546.99, 'Melhor Monitor do Mercado', 'https://picsum.photos/seed/Mouse%20gamer/400');

SELECT * FROM products;
