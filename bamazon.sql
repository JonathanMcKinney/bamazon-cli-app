DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARcHAR(50) NOT NULL,
    price DECIMAL(10,2),
    stock_quantity INT(10),
    PRIMARY KEY (item_id)
);

SELECT*FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Road Bike Tube", "Sporting Goods", 6, 150), 
("MTB Tube", "Sporting Goods", 6.50, 120), 
("Ishmael", "Books", 12, 30), 
("The Gunslinger", "Books", 9.99, 12), 
("Pizza Cutter", "Kitchen Supplies", 12.75, 99), 
("Cutting Board", "Kitchen Supplies", 30, 17), 
("Microplane", "Kitchen Supplies", 19.95, 24),
("Evolv Shamans", "Sporting Goods", 129.99, 6),
("La Sportiva Solutions", "Sporting Goods", 159.99, 9),
("Sick in the Head", "Books", 9.99, 12);


