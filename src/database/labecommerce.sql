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
VALUES ('p001', 'Monitor Gamer', 1546.99, 'Melhor Monitor do Mercado', 'https://picsum.photos/seed/Mouse%20gamer/400'),
('p002', 'Mouse Gamer', 1546.99, 'Melhor Monitor do Mercado', 'https://picsum.photos/seed/Mouse%20gamer/400'),
VALUES ('p003', 'Teclado Gamer', 1546.99, 'Melhor Monitor do Mercado', 'https://picsum.photos/seed/Mouse%20gamer/400'),
VALUES ('p004', 'Mesa Gamer', 1546.99, 'Melhor Monitor do Mercado', 'https://picsum.photos/seed/Mouse%20gamer/400'),
VALUES ('p005', 'Cadeira Gamer', 1546.99, 'Melhor Monitor do Mercado', 'https://picsum.photos/seed/Mouse%20gamer/400');

SELECT * from users;
SELECT * FROM products;
SELECT * FROM products 
WHERE name LIKE '%gamer%';
DELETE FROM users WHERE id = 'u001';
DELETE FROM products WHERE id = 'p001';
UPDATE products SET 
name = 'Monitor Gamer UltraScreen',
price = 3999.99,
description = description,
image_url = image_url
WHERE id = 'p002';

