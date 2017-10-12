CREATE DATABASE Bamazon_db;
USE Bamazon_db;

CREATE TABLE products (

item_id INT (10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50),
department_name VARCHAR(50),
price INT (255),
stock INT (99),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("The Legend of Zelda: Breath of the Wild", "Video Games", 60, 50);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Horizon: Zero Dawn", "Video Games", 60, 0);

INSERT INTO products (product_name, department_name, price, stock)
VALUES("Reclining Chair", "Furniture", 30, 10);

INSERT INTO products (product_name, department_name, price, stock)
VALUES("Coffee Table", "Furniture", 200, 30);


INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Silverware", "Kitchen & Appliances", 30, 40);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Toaster", "Kitchen & Appliances", 30, 20);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Football", "Sports & Outdoors", 20, 10);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Soccer ball", "Sports & Outdoors", 10, 15);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("50' Panasonic Television HD", "Electronics", 200, 10);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ("Toshiba Blu-Ray Player", "Electronics", 100, 20);



