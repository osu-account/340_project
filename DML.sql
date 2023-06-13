/*
    OSU CS340 Intro to Databases (Spring 2023)
    Portland Cycling Specialties Project

    Team 86, Schema-Teama
    Chris Hall and John McCormick
    2023-05-04

    Updated 2023-06-12
*/


-- INSERT QUERIES

-- Insert into Customers
INSERT INTO Customers (FirstName, LastName, Email, Address, PhoneNumber)
VALUES (:firstName, :lastName, :email, :address, :phone);

-- Insert into Products
INSERT INTO Products (ProductName, Description, Price, SupplierID)
VALUES (:productName, :description, :price, :supplierID);

-- Insert into Suppliers
INSERT INTO Suppliers (CompanyName, Email, PhoneNumber, ContactPerson)
VALUES (:companyName, :email, :phone, :contactPerson);

-- Insert into Inventory
INSERT INTO Inventory (ProductID, LocationID, Quantity)
VALUES (:productID, :locationID, :quantity);

-- Insert into Locations
INSERT INTO Locations (StoreName, Address, PhoneNumber)
VALUES (:storeName, :address, :phone);

-- Insert into Orders
INSERT INTO Orders (CustomerID, OrderDate, TotalAmount)
VALUES (:customerID, :orderDate, :totalAmount);

-- Insert into OrderProducts
INSERT INTO OrderProducts (OrderID, ProductID, Quantity, Price)
VALUES (:orderID, :productID, :quantity, :price);


-- SELECT QUERIES

-- Select all from Customers
SELECT * FROM Customers;

-- Select all from Products
SELECT * FROM Products;

-- Select all from Suppliers
SELECT * FROM Suppliers;

-- Select all from Inventory
SELECT * FROM Inventory;

-- Select all from Locations
SELECT * FROM Locations;

-- Select all from Orders
SELECT * FROM Orders;

-- Select all from OrderProducts
SELECT * FROM OrderProducts;


-- UPDATE QUERIES

-- Update Customers
UPDATE Customers 
SET FirstName = :newFirstName, LastName = :newLastName, Email = :newEmail, Address = :newAddress, Phone = :newPhone
WHERE CustomerID = :customerID;

-- Update Products
UPDATE Products 
SET ProductName = :newProductName, Description = :newDescription, Price = :newPrice, SupplierID = :newSupplierID
WHERE ProductID = :productID;

-- Update Suppliers
UPDATE Suppliers
SET CompanyName = :newCompanyName, ContactEmail = :newContactEmail, Phone = :newPhone, ContactPerson = :newContactPerson
WHERE SupplierID = :supplierID;

-- Update Inventory
UPDATE Inventory 
SET ProductID = :newProductID, LocationID = :newLocationID, Quantity = :newQuantity
WHERE InventoryID = :inventoryID;

-- Update Locations
UPDATE Locations
SET LocationName = :newLocationName, Address = :newAddress, Phone = :newPhone
WHERE LocationID = :locationID;

-- Update OrderProducts
UPDATE OrderProducts 
SET Quantity = :quantity, Price = :price
WHERE OrderID = :orderID AND ProductID = :productID;


-- DELETE QUERIES

-- Delete from Customers
DELETE FROM Customers WHERE CustomerID = :customerID;

-- Delete from Products
DELETE FROM Products WHERE ProductID = :productID;

-- Delete from Suppliers
DELETE FROM Suppliers WHERE SupplierID = :supplierID;

-- Delete from Inventory
DELETE FROM Inventory WHERE InventoryID = :inventoryID;

-- Delete from Locations
DELETE FROM Locations WHERE LocationID = :locationID;

-- Delete from OrderProducts
DELETE FROM OrderProducts WHERE OrderID = :orderID AND ProductID = :productID;
