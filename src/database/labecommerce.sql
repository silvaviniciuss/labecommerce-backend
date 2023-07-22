-- Active: 1689010433123@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

SELECT * FROM users WHERE name ;

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u001',
        'Vinicius da Silva',
        'viniciusdasilvax@gmail.com',
        '12345',
        DATETIME('now', 'localtime')
    ), (
        'u002',
        'Danieli H. Ferreira',
        'danieli@gmail.com',
        '12345',
        DATETIME('now', 'localtime')
    ), (
        'u003',
        'Jarcelino da Silva',
        'jarcelino@gmail.com',
        '12345',
        DATETIME('now', 'localtime')
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'p001',
        'Monitor Gamer',
        250,
        'Melhor Monitor do Mercado',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    ), (
        'p002',
        'Mouse Gamer',
        199,
        'Melhor Monitor do Mercado',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    ), (
        'p003',
        'Teclado Gamer',
        230,
        'Melhor Monitor do Mercado',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    ), (
        'p004',
        'Mesa Gamer',
        800,
        'Melhor Monitor do Mercado',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    ), (
        'p005',
        'Cadeira Gamer',
        1400,
        'Melhor Monitor do Mercado',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    );

SELECT * from users;

SELECT * FROM products;

DROP TABLE users;

SELECT * FROM products WHERE name LIKE '%gamer%';

DELETE FROM users WHERE id = 'u001';

DELETE FROM products WHERE id = 'p001';

UPDATE products
SET
    name = 'Monitor Gamer UltraScreen',
    price = 3999.99,
    description = description,
    image_url = image_url
WHERE id = 'p002';

DROP TABLE products;

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY(buyer) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

SELECT * from purchases;

DROP TABLE purchases;

INSERT INTO
    purchases (
        id,
        buyer,
        total_price,
        creat_at
    )
VALUES (
        'c001',
        'u001',
        499.9,
        DATETIME('now', 'localtime')
    ), (
        'c002',
        'u002',
        55.78,
        DATETIME('now', 'localtime')
    ), (
        'c003',
        'u003',
        159.99,
        DATETIME('now', 'localtime')
    );

UPDATE purchases SET total_price = 800.99 WHERE id = 'c003';

SELECT
    purchases.id AS purchaseId,
    purchases.buyer AS buyerId,
    users.name AS buyerName,
    users.email AS buyerEmail,
    purchases.total_price AS totalPrice,
    purchases.creat_at AS createdAt
FROM purchases
    INNER JOIN users ON purchases.buyer = users.id
WHERE purchases.id = 'pur001';

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

SELECT * FROM purchases_products;

DROP TABLE purchases_products;

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ('c001', 'p003', 1), ('c002', 'p004', 4), ('c003', 'p002', 3);

SELECT *
FROM purchases_products
    INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
    INNER JOIN products ON purchases_products.product_id = products.id;

SELECT purchase_id AS purchaseId FROM purchases;

SELECT
    prod.id AS id,
    prod.name AS name,
    prod.price AS price,
    prod.description AS description,
    prod.image_url AS imageUrl,
    purchases_products.quantity AS quantity
FROM purchases_products
    INNER JOIN products AS prod ON purchases_products.product_id = prod.id
WHERE
    purchases_products.purchase_id = "pur003";

SELECT
    purchase_id AS purchaseId,
    userName.id AS buyerId,
    productName.name,
    quantity,
    userName.name
FROM purchases_products
    INNER JOIN purchases AS purchasesBuyer ON purchases_products.purchase_id = purchasesBuyer.id
    INNER JOIN products AS productName ON purchases_products.product_id = productName.id
    INNER JOIN users AS userName ON purchasesBuyer.buyer = userName.id;