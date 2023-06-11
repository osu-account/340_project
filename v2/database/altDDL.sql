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

Or maybe I'm screwing this up? ...

Alright, I think this is going to work.


*/


SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Customers table
CREATE OR REPLACE TABLE `Customers` (
    `c_id` INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `address` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(15) DEFAULT NULL,
    PRIMARY KEY (c_id)
);

INSERT INTO
    `Customers` (
        `first_name`,
        `last_name`,
        `email`,
        `address`,
        `phone`
    )
VALUES
    (
        'John',
        'Doe',
        'j.doe@email.com',
        '123 Main St, Portland, OR 98427',
        '503-555-5555'
    ),
    (
        'Jane',
        'Doe',
        'jane.d@email.com',
        '456 Elm St, Portland, OR 97323',
        '503-555-5556'
    ),
    (
        'Bob',
        'Dole',
        'b.dole@email.com',
        '789 Oak St, Portland, OR 99877',
        '503-555-5557'
    ),
    (
        'Meow',
        'Wolf',
        'meowwolf@wolfmeow.com',
        '3588 Some St, Portland, OR 97998',
        '655-585-8854'
    ),
    (
        'Guy',
        'Dude',
        'guy@dude.co',
        '420 Whoa St, Happy Valley, OR 99987',
        NULL
    );


-- Products table
CREATE OR REPLACE TABLE `Products` (
    `p_id` INT(11) AUTO_INCREMENT NOT NULL,
    `description` varchar(100) NOT NULL UNIQUE,
    `type` ENUM('road bike', 'mountain bike', 'eBike', 'cruiser bike', 'kid bike', 'accessory', 'safety gear') NOT NULL,
    `condition` ENUM('new', 'used') NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (p_id)
);

INSERT INTO
    `Products` (
        `description`,
        `type`,
        `condition`,
        `price`
    )
VALUES
    (
        '500 Speed XL',
        'road bike',
        'new',
        3000.00
    ),
    (
        'Power Puff Girls bike',
        'kid bike',
        'used',
        100.00
    ),
    (
        'Retro adult black helmet',
        'safety gear',
        'new',
        80.00
    ),
    (
        'Kids punk helmet',
        'safety gear',
        'new',
        60.00
    ),
    (
        'Playa eBike',
        'eBike',
        'new',
        4300.00
    ),
    (
        'Backwoods bike',
        'mountain bike',
        'used',
        600.00
    ),
    (
        'Returned playa bike',
        'cruiser bike',
        'used',
        200.00
    );


-- Suppliers table
CREATE OR REPLACE TABLE `Suppliers` (
    `s_id` INT(11) AUTO_INCREMENT,
    `company_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `phone` VARCHAR(15) NOT NULL,
    `rep_name` VARCHAR(50) DEFAULT NULL,
    PRIMARY KEY (s_id)
);


INSERT INTO
    `Suppliers` (`company_name`, `email`, `phone`, `rep_name`)
VALUES
    (
        'AllTerrain Co.',
        'allterrain@email.com',
        '503-555-0001',
        'John'
    ),
    (
        'SpeedBikes Inc.',
        'speedbikes@email.com',
        '503-555-0002',
        NULL
    ),
    (
        'SafeCyclist Ltd.',
        'safecyclist@email.com',
        '503-555-0003',
        'Robert'
    );


-- Inventory table
CREATE OR REPLACE TABLE `Inventory` (
    `i_id` INT(11) AUTO_INCREMENT NOT NULL,
    `product_id` INT(11) NOT NULL,
    `stock_amount` INT(11) NOT NULL,
    `supplier_id` INT(11) NOT NULL,
    PRIMARY KEY (i_id),
    FOREIGN KEY (product_id) REFERENCES Products(p_id),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(s_id)
);

INSERT INTO `Inventory` (`product_id`, `stock_amount`, `supplier_id`)
VALUES
    (
        1, -- product_id, 500 Speed XL road bike
        5, -- stock_amount
        2  -- supplier_id, SpeedBikes Inc.
    ),
    (
        2,  -- product_id, Power Puff Girls bike
        10, -- stock_amount
        1   -- supplier_id, AllTerrain Co.
    ),
    (
        3,  -- product_id, Retro adult black helmet
        20, -- stock_amount
        3   -- supplier_id, SafeCyclist Ltd.
    );


-- Orders table
CREATE OR REPLACE TABLE `Orders` (
    `o_id` INT(11) AUTO_INCREMENT NOT NULL,
    `product_id` INT(11) NOT NULL,
    `inventory_id` INT(11) NOT NULL,
    `order_date` DATE NOT NULL,
    `ship_date` DATE NULL,
    `note` VARCHAR(200) NULL,
    `customer_id` INT(11) NOT NULL,
    PRIMARY KEY (o_id),
    FOREIGN KEY (product_id) REFERENCES Products(p_id),
    FOREIGN KEY (inventory_id) REFERENCES Inventory(i_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(c_id)
);

INSERT INTO `Orders` (`product_id`, `inventory_id`, `order_date`, `ship_date`, `note`, `customer_id`)
VALUES
    (
        1,                      -- product_id, 500 Speed XL road bike
        1,                      -- inventory_id, corresponding inventory item
        '2023-06-11',           -- order_date
        NULL,                   -- ship_date, not yet shipped
        'Expedited shipping',   -- note
        1                       -- customer_id, John Doe
    ),
    (
        2, -- product_id, Power Puff Girls bike
        2, -- inventory_id
        '2023-06-12', 
        NULL, 
        'Include gift wrap', 
        2  -- customer_id, Jane Doe
    ),
    (
        3, -- product_id, Retro adult black helmet
        3, -- inventory_id
        '2023-06-10', 
        '2023-06-13', 
        NULL, 
        3  -- customer_id, Bob Dole
    );


SET FOREIGN_KEY_CHECKS = 1;
COMMIT;