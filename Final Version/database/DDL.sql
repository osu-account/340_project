/*
    OSU CS340 Intro to Databases (Spring 2023)
    Portland Cycling Specialties Project

    Team 86, Schema-Teama
    Chris Hall and John McCormick
    2023-05-04

    Updated 2023-06-12
*/

/* SET CHECKS AND DROPS */
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

/* CREATE ALL THE TABLES */
CREATE OR REPLACE TABLE `Customers` (
    `customerID` int NOT NULL AUTO_INCREMENT,
    `firstName` varchar(45) NOT NULL,
    `lastName` varchar(45) NOT NULL,
    `email` varchar (100) NOT NULL,
    `address` varchar(200) NOT NULL,
    `phoneNum` varchar(20) NOT NULL,
    UNIQUE KEY `customerID` (`customerID`),
    PRIMARY KEY (`customerID`)
);

CREATE OR REPLACE TABLE `Suppliers` (
    `supplierID` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `email` varchar(100) NOT NULL,
    `phone` varchar(20) NOT NULL,
    `representativeName` varchar(100) NOT NULL,
    UNIQUE KEY `supplierID` (`supplierID`),
    PRIMARY KEY (`supplierID`)
);

CREATE OR REPLACE TABLE `Products` (
    `productID` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `description` varchar(200),
    `price` decimal(10,2) NOT NULL,
    `supplierID` int NOT NULL,
    UNIQUE KEY `productID` (`productID`),
    PRIMARY KEY (`productID`),
    FOREIGN KEY (`supplierID`) REFERENCES `Suppliers`(`supplierID`) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE `Locations` (
    `locationID` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `address` varchar(200) NOT NULL,
    `phone` varchar(20) NOT NULL,
    UNIQUE KEY `locationID` (`locationID`),
    PRIMARY KEY (`locationID`)
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
    PRIMARY KEY (`orderID`),
    UNIQUE KEY `orderID` (`orderID`),
    FOREIGN KEY (`customerID`) REFERENCES `Customers`(`customerID`) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE `OrderProducts` (
    `orderID` int NOT NULL,
    `productID` int NOT NULL,
    `quantity` int NOT NULL,
    `price` decimal(10,2) NOT NULL,
    FOREIGN KEY (`orderID`) REFERENCES `Orders` (`orderID`) ON DELETE CASCADE,
    FOREIGN KEY (`productID`) REFERENCES `Products` (`productID`) ON DELETE CASCADE
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
    `firstName`,
    `lastName`,
    `email`,
    `address`,
    `phoneNum`
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
    'Janetta',
    'Beltran',
    'janetta6332@eml.cc',
    '404 Cinder Summit Village, Tice, ID 04340',
    '273-619-9128'
),
(
    'Derrick',
    'Baker',
    'derrick_baker7303@fastmail.jp',
    '216 Cloud Estate, Mill Valley, OR 36352',
    '255-639-1250'
),
(
    'Fredric',
    'Wade',
    'wade1219@mm.st',
    '814 Lazy Terrace, Leesburg village, NV 27151',
    '328-069-6800'
),
(
    'Dwain',
    'Plateel',
    'plateel5850@fastmail.es',
    'P.O. Box 33434, Cuartelez, PA 03116',
    '257-011-0521'
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

/* -- INTO Products */
INSERT INTO `Products` (
    name,
    description,
    price,
    supplierID
)
VALUES 
(
    'Mountain Bike',
    'Sturdy all-terrain bike',
    '350.00',
    1
),
(
    'Road Bike',
    'Lightweight and fast road bike',
    '550.00',
    2
),
(
    'Helmet',
    'Protective headgear',
    '50.00',
    3
);

/* -- INTO Inventory */
INSERT INTO `Inventory` (
    productID,
    locationID,
    inStockQuantity
)
VALUES 
(
    1,
    1,
    15
),
(
    1,
    2,
    10
),
(
    2,
    1,
    5
),
(
    3,
    3,
    25
);

/* -- INTO Orders */
INSERT INTO `Orders` (
    customerID,
    orderDate,
    total
)
VALUES 
(
    1,
    '2023-05-01',
    '550.00'
),
(
    2,
    '2023-05-02',
    '50.00'
),
(
    3,
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
    1,
    2,
    1,
    '550.00'
),
(
    2,
    3,
    1,
    '50.00'
),
(
    3,
    1,
    1,
    '350.00'
),
(
    3,
    3,
    1,
    '50.00'
);

COMMIT;
SET FOREIGN_KEY_CHECKS=1;
