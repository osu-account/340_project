/*
So my thoughts here are we should have Orders pull info from Prodcuts, Inventory, and Customers.
Inventory gets its info from Products and Suppliers.


| Inventory Item | <---- | Supplier Info |
   ^   
   |<--- | Product Info |

| Product Info | ---> | Order | <--- Customer Info |
                          ^
                          |<-- | Inventory Info |

In other words the inventoy knows N items of Product A from Supplier B are in stock.
And the Order knows its getting Prodcut A for Customer A and N inventory of Product A is going down.

Or maybe I'm screwing this up?


*/


SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Customers table
CREATE OR REPLACE TABLE `Customers` (
    `c_id` INT(11) AUTO_INCREMENT NOT NULL UNIQUE PRIMARY KEY,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `address` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(15) DEFAULT NULL
);

-- PUT INSERT HERE LATER

-- Products table
CREATE OR REPLACE TABLE `Products` (
    `p_id` INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `description` varchar(100) NOT NULL UNIQUE,
    `type` ENUM('road bike', 'mountain bike', 'eBike', 'cruiser bike', 'kid bike', 'accessory', 'safety gear') NOT NULL,
    `condition` ENUM('new', 'used') NOT NULL,
    `price` DECIMAL(10,2) NOT NULL
);

-- PUT INSERT HERE LATER

-- Suppliers table
CREATE OR REPLACE TABLE `Suppliers` (
    `s_id` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `company_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `phone` VARCHAR(15) NOT NULL,
    `rep_name` VARCHAR(50) DEFAULT NULL
);

-- PUT INSERT HERE LATER

-- Inventory table
CREATE OR REPLACE TABLE `Inventory` (
    `i_id` INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `product_id` INT(11) NOT NULL,
    `stock_amount` INT(11) NOT NULL,
    `supplier_id` INT(11) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(id)
);

-- PUT INSERT HERE LATER

-- Orders table
CREATE OR REPLACE TABLE `Orders` (
    `o_id` INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `product_id` INT(11) DEFAULT NOT NULL,
    `inventory_id` INT(11) DEFAULT NOT NULL,
    `order_date` DATE NOT NULL,
    `ship_date` DATE NULL,
    `note` VARCHAR(200) DEFAULT NULL,
    `customer_id` INT(11) DEFAULT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (inventory_id) REFERENCES Inventory(id),
    FOREIGN KEY (customer_id) REFERENCES Customers(id)
);

-- PUT INSERT HERE LATER


SET FOREIGN_KEY_CHECKS = 1;
COMMIT;