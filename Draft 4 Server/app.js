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
    let query1 = `INSERT INTO Customers (firstName, lastName, email, address, phoneNum) VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', '${data.address}', '${data.phoneNum}')`;
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
    let deleteCustomer = `DELETE FROM Customers WHERE customerID = ?`;

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
        let query = `SELECT * FROM Customers WHERE customerID = ?`;
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

// UPDATE a Customer
app.put("/put-customer-ajax", function (req, res) {
    let data = req.body;
    console.log(data);
    let customerID = parseInt(data.customerID);

    let query = `UPDATE Customers SET fullName = ?, email = ?, address = ?, phoneNum = ? WHERE customerID = ?`;
    db.pool.query(query, [data.fullName, data.email, data.address, data.phoneNum, customerID], function (error, rows, fields) {
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
