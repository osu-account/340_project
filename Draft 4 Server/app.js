/*
    SETUP
*/
let express = require("express");
let app = express();
const PORT = 5588;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Database
let db = require("./database/db-connector");

// Handlebars
const { engine } = require("express-handlebars");
let exphbs = require("express-handlebars");
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

/*
    ROUTES
*/

// ROUTE FOR HOMEPAGE
app.get("/", function (req, res) {
    res.render("index");
});

// ROUTE FOR CUSTOMERS PAGE
app.get("/customers", function (req, res) {
    let query;
    if (req.query.lastName === undefined) {
        query = "SELECT * FROM Customers;";
    } else {
        query = `SELECT * FROM Customers WHERE lastName LIKE "${req.query.lastName}%"`;
    }
    db.pool.query(query, function (error, rows, fields) {
        res.render("customers", { data: rows });
    });
});

// ADD a Customer (AJAX)
app.post("/add-customer-ajax", function (req, res) {
    let data = req.body;
    console.log(data);
    let query1 = `INSERT INTO Customers (firstName, lastName, email, address, phoneNum) VALUES ("${data.firstName}", "${data.lastName}", "${data.email}", "${data.address}", "${data.phoneNum}")`;
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let query2 = `SELECT Customers.customerID, Customers.firstName, Customers.lastName, Customers.email, Customers.address, Customers.phoneNum FROM Customers;`;
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

// DELETE a Customer
app.delete("/delete-customer-ajax/", function (req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.customerID);
    let deleteCustomer = `DELETE FROM Customers WHERE customerID = (?)`;

    db.pool.query(deleteCustomer, [customerID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// SEARCH for a Customer
app.get("/search-customer-html", function (req, res) {
    let customerID = req.query["input-customerID"];
    if (customerID) {
        let query = `SELECT * FROM Customers WHERE customerID = (?)`;
        db.pool.query(query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.render("customers", { data: rows });
            }
        });
    } else {
        let query = "SELECT * FROM Customers";
        db.pool.query(query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.render("customers", { data: rows });
            }
        });
    }
});

// UPDATE a Customer's email
app.put("/put-customer-ajax", function (req, res) {
    let data = req.body;
    let customerID = parseInt(data.customerID);

    let query = `UPDATE Customers SET email = (?) WHERE customerID = (?)`;
    db.pool.query(query, [data.email, customerID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(rows);
        }
    });
});

// ROUTE FOR SUPPLIERS PAGE
app.get("/suppliers", function (req, res) {
    let query;
    if (req.query.name === undefined) {
        query = "SELECT * FROM Suppliers;";
    } else {
        query = `SELECT * FROM Suppliers WHERE name LIKE "${req.query.name}%"`;
    }
    db.pool.query(query, function (error, rows, fields) {
        res.render("suppliers", { data: rows });
    });
});

// ADD a Supplier (AJAX)
app.post("/add-supplier-ajax", function (req, res) {
    let data = req.body;
    console.log(data);
    let query1 = `INSERT INTO Suppliers (name, email, phone, representativeName) VALUES ("${data.name}", "${data.email}", "${data.phone}", "${data.representativeName}")`;
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let query2 = `SELECT Suppliers.supplierID, Suppliers.name, Suppliers.email, Suppliers.phone, Suppliers.representativeName FROM Suppliers;`;
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

// DELETE a Supplier
app.delete("/delete-supplier-ajax/", function (req, res, next) {
    let data = req.body;
    let supplierID = parseInt(data.supplierID);
    let deleteSupplier = `DELETE FROM Suppliers WHERE supplierID = (?)`;

    db.pool.query(deleteSupplier, [supplierID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// SEARCH for a Supplier
app.get("/search-supplier-html", function (req, res) {
    let supplierID = req.query["input-supplierID"];
    if (supplierID) {
        let query = `SELECT * FROM Suppliers WHERE supplierID = (?)`;
        db.pool.query(query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.render("suppliers", { data: rows });
            }
        });
    } else {
        let query = "SELECT * FROM Suppliers";
        db.pool.query(query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.render("suppliers", { data: rows });
            }
        });
    }
});

// UPDATE a Supplier's email
app.put("/put-supplier-ajax", function (req, res) {
    let data = req.body;
    let supplierID = parseInt(data.supplierID);

    let query = `UPDATE Suppliers SET email = (?) WHERE supplierID = (?)`;
    db.pool.query(query, [data.email, supplierID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(rows);
        }
    });
});

// ROUTE FOR INVENTORY PAGE
app.get("/inventory", function (req, res) {
    let query;
    if (req.query.inventoryID === undefined) {
        query = "SELECT * FROM Inventory;";
    } else {
        query = `SELECT * FROM Inventory WHERE inventoryID LIKE "${req.query.inventoryID}%"`;
    }
    db.pool.query(query, function (error, rows, fields) {
        res.render("inventory", { data: rows });
    });
});

// SEARCH for Inventory Quantities
app.get("/search-inventory-html", function (req, res) {
    let customerID = req.query["input-inventoryID"];
    if (customerID) {
        let query = `SELECT * FROM Inventory WHERE inventoryID = (?)`;
        db.pool.query(query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.render("inventory", { data: rows });
            }
        });
    } else {
        let query = "SELECT * FROM Inventory";
        db.pool.query(query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.render("inventory", { data: rows });
            }
        });
    }
});

// UPDATE Inventory Quantity
app.put("/put-inventory-ajax", function (req, res) {
    let data = req.body;
    let inventoryID = parseInt(data.inventoryID);

    let query = `UPDATE Inventory SET inStockQuantity = (?) WHERE inventoryID = (?)`;
    db.pool.query(query, [data.inStockQuantity, inventoryID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(rows);
        }
    });
});

// ROUTE FOR ORDERS PAGE
app.get("/orders", function (req, res) {
    let query;
    if (req.query.orderID === undefined) {
        query = "SELECT * FROM Orders;";
    } else {
        query = `SELECT * FROM Orders WHERE orderID LIKE "${req.query.orderID}%"`;
    }
    db.pool.query(query, function (error, rows, fields) {
        res.render("orders", { data: rows });
    });
});

// ADD an Order (AJAX)
app.post("/add-order-ajax", function (req, res) {
    let data = req.body;
    console.log(data);
    let query1 = `INSERT INTO Orders (customerID, orderDate, total) VALUES ("${data.customerID}", "${data.orderDate}", "${data.total}")`;
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let query2 = `SELECT Orders.orderID, Orders.customerID, Orders.orderDate, Orders.total FROM Orders;`;
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

// DELETE an Order
app.delete("/delete-order-ajax/", function (req, res, next) {
    let data = req.body;
    let orderID = parseInt(data.orderID);
    let deleteOrder = `DELETE FROM Orders WHERE orderID = (?)`;

    db.pool.query(deleteOrder, [orderID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// SEARCH for an Order
app.get("/search-order-html", function (req, res) {
    let orderID = req.query["input-orderID"];
    if (orderID) {
        let query = `SELECT * FROM Orders WHERE orderID = (?)`;
        db.pool.query(query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.render("orders", { data: rows });
            }
        });
    } else {
        let query = "SELECT * FROM Orders";
        db.pool.query(query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.render("orders", { data: rows });
            }
        });
    }
});

// UPDATE an Order Date
app.put("/put-order-ajax", function (req, res) {
    let data = req.body;
    let orderID = parseInt(data.orderID);

    let query = `UPDATE Orders SET orderDate = (?) WHERE orderID = (?)`;
    db.pool.query(query, [data.orderDate, orderID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(rows);
        }
    });
});

// ROUTE FOR ORDER PRODUCTS PAGE
app.get("/order_products", function (req, res) {
    let query;
    if (req.query.orderID === undefined) {
        query = "SELECT * FROM OrderProducts;";
    } else {
        query = `SELECT * FROM OrderProducts WHERE orderID LIKE "${req.query.orderID}%"`;
    }
    db.pool.query(query, function (error, rows, fields) {
        res.render("order_products", { data: rows });
    });
});

// ADD a Product Order (AJAX)
app.post("/add-order_products-ajax", function (req, res) {
    let data = req.body;
    console.log(data);
    let query1 = `INSERT INTO OrderProducts (productID, quantity, price) VALUES ("${data.productID}", "${data.quantity}", "${data.price}")`;
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let query2 = `SELECT OrderProducts.orderID, OrderProducts.productID, OrderProducts.quantity, OrderProducts.price FROM OrderProducts;`;
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

// DELETE a Product Order
app.delete("/delete-order_products-ajax/", function (req, res, next) {
    let data = req.body;
    let orderID = parseInt(data.orderID);
    let deleteOrder = `DELETE FROM OrderProducts WHERE orderID = (?)`;

    db.pool.query(deleteOrder, [orderID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// SEARCH for a Product Order
app.get("/search-order_products-html", function (req, res) {
    let orderID = req.query["input-orderID"];
    if (orderID) {
        let query = `SELECT * FROM OrderProducts WHERE orderID = (?)`;
        db.pool.query(query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.render("order_products", { data: rows });
            }
        });
    } else {
        let query = "SELECT * FROM OrderProducts";
        db.pool.query(query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.render("order_products", { data: rows });
            }
        });
    }
});

// UPDATE a Product Order Quantity
app.put("/put-order_products-ajax", function (req, res) {
    let data = req.body;
    let orderID = parseInt(data.orderID);

    let query = `UPDATE OrderProducts SET quantity = (?) WHERE orderID = (?)`;
    db.pool.query(query, [data.quantity, orderID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(rows);
        }
    });
});

// ROUTE FOR LOCATIONS PAGE
app.get("/locations", function (req, res) {
    let query;
    if (req.query.name === undefined) {
        query = "SELECT * FROM Locations;";
    } else {
        query = `SELECT * FROM Locations WHERE name LIKE "${req.query.name}%"`;
    }
    db.pool.query(query, function (error, rows, fields) {
        res.render("locations", { data: rows });
    });
});

// ADD a Location (AJAX)
app.post("/add-location-ajax", function (req, res) {
    let data = req.body;
    console.log(data);
    let query1 = `INSERT INTO Locations (name, address, phone) VALUES ("${data.name}", "${data.address}", "${data.phone}")`;
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let query2 = `SELECT Locations.locationID, Locations.name, Locations.address, Locations.phone FROM Locations;`;
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

// DELETE a Location
app.delete("/delete-location-ajax/", function (req, res, next) {
    let data = req.body;
    let locationID = parseInt(data.locationID);
    let deleteLocation = `DELETE FROM Locations WHERE locationID = (?)`;

    db.pool.query(deleteLocation, [locationID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// SEARCH for a Location
app.get("/search-location-html", function (req, res) {
    let locationID = req.query["input-locationID"];
    if (locationID) {
        let query = `SELECT * FROM Locations WHERE locationID = (?)`;
        db.pool.query(query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.render("locations", { data: rows });
            }
        });
    } else {
        let query = "SELECT * FROM Locations";
        db.pool.query(query, function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.render("locations", { data: rows });
            }
        });
    }
});

// UPDATE a Location's Phone Number
app.put("/put-location-ajax", function (req, res) {
    let data = req.body;
    let locationID = parseInt(data.locationID);

    let query = `UPDATE Locations SET phone = (?) WHERE locationID = (?)`;
    db.pool.query(query, [data.phone, locationID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(rows);
        }
    });
});


/*
    LISTENER
*/
app.listen(PORT, function () {
    console.log(
        "Express started on http://localhost:" +
            PORT +
            "; press Ctrl-C to terminate."
    );
});
