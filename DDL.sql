/*
    OSU CS340 Intro to Databases (Spring 2023)
    Project Step 2 Draft: Normalized Schema + DDL with
    Sample Data

    Team 86, Schema-Teama
    Chris Hall and John McCormick
    2023-05-04
*/

/* SET CHECKS AND DROPS */
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

/* CREATE ALL THE TABLES */
CREATE OR REPLACE TABLE `Customers` (
    `customerID` int NOT NULL AUTO_INCREMENT,
    `firstName` varchar(45) NOT NULL,
    `lastName` varchar(45) NOT NULL,
    `email` varchar (45) NOT NULL,
    `address` varchar(45) NOT NULL,
    `phoneNum` varchar(45) NOT NULL,
    UNIQUE KEY `customerID` (`customerID`),
    PRIMARY KEY (`customerID`)
);

CREATE OR REPLACE TABLE `Products` (
    `productID` int NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL,
    `description` varchar(45) NOT NULL,
    `price` decimal(10,2) NOT NULL,
    `supplierID` int NOT NULL,
    UNIQUE KEY `productID` (`productID`),
    PRIMARY KEY (`productID`),
    FOREIGN KEY (`supplierID`) REFERENCES `Suppliers`(`supplierID`) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE `Suppliers` (
    `supplierID` int NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL,
    `email` varchar(45) NOT NULL,
    `phone` varchar(45) NOT NULL,
    `representativeName` varchar(45) NOT NULL,
    UNIQUE KEY `supplierID` (`supplierID`),
    PRIMARY KEY (`supplierID`)
);

CREATE OR REPLACE TABLE `Inventory` (
    `inventoryID` int NOT NULL AUTO_INCREMENT,
    `productID` int NOT NULL,
    `locationID` int NOT NULL,
    `inStockQuantity` int NOT NULL,
    UNIQUE KEY `inventoryID` (`inventoryID`),
    PRIMARY KEY (`inventoryID`),
    FOREIGN KEY (`productID`) REFERENCES `Products`(`productID`) ON DELETE CASCADE,
    FOREIGN KEY (`locationID`) REFERENCES `Locations`(`locationID`) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE `Orders` (
    `orderID` int NOT NULL AUTO_INCREMENT,
    `customerID` int NOT NULL,
    `orderDate` date NOT NULL,
    `total` decimal(10,2) NOT NULL,
    UNIQUE KEY `orderID` (`orderID`),
    PRIMARY KEY (`orderID`),
    FOREIGN KEY (`customerID`) REFERENCES `Customers`(`customerID`) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE `OrderProducts` (
    `orderID` int NOT NULL AUTO_INCREMENT,
    `productID` int NOT NULL,
    `quantity` int NOT NULL,
    `price` decimal(10,2) NOT NULL,
    FOREIGN KEY (`orderID`) REFERENCES `Orders` (`orderID`) ON DELETE CASCADE,
    FOREIGN KEY (`productID`) REFERENCES `Products` (`productID`) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE `Locations` (
    `locationID` int NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL,
    `address` varchar(45) NOT NULL,
    `phone` varchar(45) NOT NULL,
    UNIQUE KEY `locationID` (`locationID`),
    PRIMARY KEY (`locationID`)
);

/*
SHOW TABLES;
DESCRIBE Customers;
DESCRIBE Products;
DESCRIBE Suppliers;
DESCRIBE Inventory;
DESCRIBE Orders;
DESCRIBE OrderProducts;
DESCRIBE Locations;
 */

/* INSERT SAMPLE DATA */
/* -- INTO Customers */
INSERT INTO `Customers` (
    firstName,
    lastName,
    email,
    address,
    phoneNum
)
VALUES 
(
    'John',
    'Doe',
    'j.doe@email.com',
    '123 Main St, Portland',
    '5035555555'
),
(
    'Jane',
    'Doe',
    'jane.d@email.com',
    '456 Elm St, Portland',
    '5035555556'
),
(
    'Bob',
    'Dole',
    'b.dole@email.com',
    '789 Oak St, Portland',
    '5035555557'
);

/* -- INTO Products */
INSERT INTO `Products` (
    name,
    description,
    price
)
VALUES 
(
    'Mountain Bike',
    'Sturdy all-terrain bike',
    '350.00'
),
(
    'Road Bike',
    'Lightweight and fast road bike',
    '550.00'
),
(
    'Helmet',
    'Protective headgear',
    '50.00'
);

/* -- INTO Suppliers */
INSERT INTO `Suppliers` (
    name,
    email,
    phone,
    representativeName
)
VALUES 
(
    'AllTerrain Co.',
    'allterrain@email.com',
    '5035550001',
    'John'
),
(
    'SpeedBikes Inc.',
    'speedbikes@email.com',
    '5035550002',
    'Sarah'
),
(
    'SafeCyclist Ltd.',
    'safecyclist@email.com',
    '5035550003',
    'Robert'
);

/* -- INTO Inventory */
INSERT INTO `Inventory` (
    productID,
    locationID,
    inStockQuantity
)
VALUES 
(
    '1',
    '1',
    '10'
),
(
    '2',
    '1',
    '8'
),
(
    '3',
    '1',
    '20'
);

/* -- INTO Locations */
INSERT INTO `Locations` (
    name,
    address,
    phone
)
VALUES 
(
    'Portland Downtown',
    '124 Main St, Portland',
    '5035551122'
),
(
    'Portland East',
    '456 82nd St, Portland',
    '5035552233'
),
(
    'Gresham',
    '789 Main St, Gresham',
    '5035553344'
);

/* -- INTO Orders */
INSERT INTO `Orders` (
    customerID,
    orderDate,
    total
)
VALUES 
(
    '1',
    '20230501',
    '700.00'
),
(
    '2',
    '20230502',
    '600.00'
),
(
    '3',
    '2023-05-03',
    '400.00'
);

/* -- INTO OrderProducts */
INSERT INTO `OrderProducts` (
    orderID,
    productID,
    quantity,
    price
)
VALUES 
(
    '1',
    '1',
    '1',
    '350.00'
),
(
    '1',
    '3',
    '1',
    '50.00'
),
(
    '2',
    '2',
    '1',
    '550.00'
),
(
    '3',
    '3',
    '2',
    '100.00'
);

/* SET CHECKS AND DROPS */
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;