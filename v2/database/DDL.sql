
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Create Customers table and insert data
CREATE OR REPLACE TABLE `Customers` (
    `customer_id` int(11) AUTO_INCREMENT NOT NULL UNIQUE,
    `first_name` varchar(50) NOT NULL,
    `last_name` varchar(50) NOT NULL,
    `email` varchar(50) NOT NULL UNIQUE,
    `address` varchar(200) NOT NULL,
    `phone` varchar(50) DEFAULT NULL,
    PRIMARY KEY (customer_id)
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

-- Create Products table and insert data
CREATE OR REPLACE TABLE `Products` (
    `item_id` int(11) AUTO_INCREMENT NOT NULL,
    `description` varchar(100) NOT NULL UNIQUE,
    `type` enum('road bike', 'mountain bike', 'eBike', 'cruiser bike', 'kid bike', 'accessory', 'safety gear') NOT NULL,
    `condition` enum('new', 'used') NOT NULL,
    `price` decimal(6, 2) NOT NULL,
    `order_id` int(11) DEFAULT NULL,
    PRIMARY KEY (item_id),
    -- FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT UNIQUE(item_id)
);

INSERT INTO
    `Products` (
        `description`,
        `type`,
        `condition`,
        `price`,
        `order_id`
    )
VALUES
    (
        '500 Speed XL',
        'road bike',
        'new',
        3000.00,
        1
    ),
    (
        'Power Puff Girls bike',
        'kid bike',
        'used',
        100.00,
        1
    ),
    (
        'Retro adult black helmet',
        'safety gear',
        'new',
        80.00,
        2
    ),
    (
        'Kids punk helmet',
        'safety gear',
        'new',
        60.00,
        3
    ),
    (
        'Playa eBike',
        'eBike',
        'new',
        4300.00,
        4
    ),
    (
        'Backwoods bike',
        'mountain bike',
        'used',
        600.00,
        NULL
    ),
    (
        'Returned playa bike',
        'cruiser bike',
        'used',
        200.00,
        NULL
    );

-- Create Suppliers table and insert data
CREATE OR REPLACE TABLE `Suppliers` (
    `suppliers_id` int(11) AUTO_INCREMENT NOT NULL,
    `name` varchar(100) NOT NULL,
    `email` varchar(50) NOT NULL UNIQUE,
    `phone` varchar(50) DEFAULT NULL,
    `rep` varchar(50) DEFAULT NULL,
    PRIMARY KEY (suppliers_id),
    CONSTRAINT UNIQUE(suppliers_id),
    CONSTRAINT UNIQUE(name, email)
);

INSERT INTO
    `Suppliers` (`name`, `email`, `phone`, `rep`)
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


-- Create Orders table and insert data
CREATE OR REPLACE TABLE `Orders` (
    `order_id` int(11) AUTO_INCREMENT NOT NULL,
    `item_id` int(11) DEFAULT NULL,
    `order_date` datetime NOT NULL,
    `ship_date` datetime DEFAULT NULL,
    `note` varchar(500) DEFAULT NULL,
    `customer_id` int(11) DEFAULT NULL,
    PRIMARY KEY (order_id),
    -- FOREIGN KEY (item_id) REFERENCES Products(item_id) ON DELETE SET NULL ON UPDATE CASCADE,
    -- FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT UNIQUE(order_id)
);

INSERT INTO
    `Orders` (
        `item_id`,
        `order_date`,
        `ship_date`,
        `note`,
        `customer_id`
    )
VALUES
    (
        1,
        '2023-01-05 00:00:00',
        '2023-01-06 00:00:00',
        NULL,
        1
    ),
    (
        3,
        '2023-01-10 00:00:00',
        '2023-01-12 00:00:00',
        NULL,
        2
    ),
    (
        4,
        '2023-02-02 00:00:00',
        '2023-02-02 00:00:00',
        'Neat',
        3
    ),
    (
        2,
        '2023-02-02 00:00:00',
        '2023-02-03 00:00:00',
        NULL,
        4
    );


-- Create Inventory table and insert data
CREATE OR REPLACE TABLE `Inventory` (
    `inventory_item_id` int(11) AUTO_INCREMENT NOT NULL,
    `item_id` int(11) NOT NULL,
    `suppliers_id` int(11) NOT NULL,
    PRIMARY KEY (inventory_item_id),
    FOREIGN KEY (item_id) REFERENCES Products(item_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (suppliers_id) REFERENCES Suppliers(suppliers_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT UNIQUE(inventory_item_id),
    CONSTRAINT UNIQUE(item_id, suppliers_id)
);

INSERT INTO
    `Inventory` (`item_id`, `suppliers_id`)
VALUES
    ((SELECT item_id FROM Products WHERE description = '500 Speed XL' AND type = 'road bike' AND price = '3000.00'),
     (SELECT suppliers_id FROM Suppliers WHERE name = 'SpeedBikes Inc' AND email = 'speedbikes@email.com'));



-- Fixing the key issue, maybe?
ALTER TABLE `Products` ADD FOREIGN KEY (`order_id`) REFERENCES `Orders`(`order_id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Orders` ADD FOREIGN KEY (`item_id`) REFERENCES `Products`(`item_id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `Orders` ADD FOREIGN KEY (`customer_id`) REFERENCES `Customers`(`customer_id`) ON DELETE SET NULL ON UPDATE CASCADE;


/* SET CHECKS AND DROPS */
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;