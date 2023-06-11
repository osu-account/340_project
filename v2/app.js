/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State Univirisity.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

/* ------------------
  SETUP
-------------------*/

// Express
const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Port
require('dotenv').config();
const PORT = process.env.PORT;

// Database
const db = require('./database/db-connector');

// Handlebars
const Handlebars = require('handlebars');
const { engine } = require('express-handlebars');
require('express-handlebars');
app.engine('.hbs', engine({ extname: ".hbs" }));
app.set('view engine', '.hbs');

/* ------------------
  ROUTES
-------------------*/

// HOMEPAGE
app.get('/', function (req, res) {
  res.render('index');
});

// CUSTOMERS
app.get('/customers', function (req, res) {
  let selectAllCustomersQuery = "SELECT customer_id, first_name, last_name, email, address, phone FROM Customers;";
  db.pool.query(selectAllCustomersQuery, function (error, customers, fields) {
    res.render('customers', { customers: customers });
  })
});

app.post('/add-customer', function (req, res) {
  let data = req.body;
  const insertCustomerQuery = `
    INSERT INTO Customers (first_name, last_name, email, address, phone)
    VALUES
    (
        '${data.customerFname}',
        '${data.customerLname}',
        '${data.customerEmail}',
        '${data.customerAddress}',
        '${data.customerPhone}'
    );`;
  db.pool.query(insertCustomerQuery, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400);
    } else {
      const selectAllCustomersQuery = `SELECT customer_id, first_name, last_name, email, address, phone FROM Customers;`
      db.pool.query(selectAllCustomersQuery, function (error, rows, fields) {
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

app.delete('/delete-customer', function (req, res) {
  let data = req.body;
  let customerID = parseInt(data.id);
  let deleteCustomerQuery = `DELETE FROM Customers WHERE customer_id = ? `;

  db.pool.query(deleteCustomerQuery, [customerID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

app.put('/update-customer', function (req, res) {

  let data = req.body;
  let customerID = parseInt(data.customer_id);
  let firstName = data.first_name;
  let lastName = data.last_name;
  let email = data.email;
  let address = data.address;
  let phone = data.phone;

  const updateCustomerQuery = `UPDATE Customers SET first_name = ?, last_name = ?, email = ?, address = ?, phone = ? WHERE customer_id = ?;`;
  const selectCustomerQuery = `SELECT first_name, last_name, email, address, phone FROM Customers WHERE customer_id = ?;`;

  db.pool.query(updateCustomerQuery, [firstName, lastName, email, address, phone, customerID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      db.pool.query(selectCustomerQuery, [customerID], function (error, rows, fields) {
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


// ORDERS
// TEST
// NEW ORDER PAGE FOR NEW DDL SETUP
app.get('/orders', async function (req, res) {
  const selectAllOrdersQuery = `
      SELECT o.o_id AS order_id, 
          p.p_id AS product_id, 
          p.description, 
          p.type,
          i.i_id AS inventory_id,
          IF(o.order_date = '0000-00-00', '', DATE_FORMAT(o.order_date, '%Y-%m-%d')) AS order_date, 
          IF(o.ship_date = '0000-00-00', '', DATE_FORMAT(o.ship_date, '%Y-%m-%d')) AS ship_date, 
          o.note, 
          c.c_id AS customer_id,
          CONCAT(c.first_name, ' ', c.last_name, ' (', c.email, ')') AS customer_name 
      FROM Orders AS o 
      JOIN Products AS p ON o.product_id = p.p_id
      JOIN Inventory AS i ON o.inventory_id = i.i_id
      JOIN Customers AS c ON o.customer_id = c.c_id 
      ORDER BY o.o_id`;

  const selectAllItemsQuery = `SELECT p_id AS item_id, description, type FROM Products`;

  const selectAllCustomersQuery = `SELECT c_id AS customer_id, first_name, last_name, email FROM Customers`;

  let orders, products, customers;
  try {
      [orders] = await db.pool.query(selectAllOrdersQuery);
      [products] = await db.pool.query(selectAllItemsQuery);
      [customers] = await db.pool.query(selectAllCustomersQuery);
  } catch (error) {
      // Handle the error
      console.error(error);
      res.status(500).send('Error retrieving data from database');
      return;
  }

  // Render the 'orders' page and pass in the orders, products, and customers data
  res.render('orders', { orders: orders, products: products, customers: customers });
});

// ADD
app.post('/add-order', async function (req, res) {
  // Prepare SQL query
  const insertOrderQuery = `
      INSERT INTO Orders (product_id, inventory_id, order_date, ship_date, note, customer_id) 
      VALUES (?, ?, ?, ?, ?, ?)
  `;

  // Extract fields from request body
  let { productId, inventoryId, orderDate, shipDate, note, customerId } = req.body;

  // Provide default values for date fields if they are not present
  orderDate = orderDate || null;
  shipDate = shipDate || null;

  try {
      // Execute the query with the provided data
      const [result] = await db.pool.query(insertOrderQuery, [productId, inventoryId, orderDate, shipDate, note, customerId]);

      // If successful, send back the inserted id
      res.json({ orderId: result.insertId });
  } catch (error) {
      // Log the error and send a server error status code
      console.error(error);
      res.status(500).send('Error inserting data into database');
  }
});


/*
// OLD ORDER PAGE

app.get('/orders', function (req, res) {
  const selectAllOrdersQuery = `SELECT o.order_id, 
    CONCAT(items.item_id, ' - ', items.description, ' ', items.type') AS customer_id FROM Orders AS o JOIN Products AS items ON o.customer_id = items.item_id BY o.order_id,
    IF(o.order_date = '0000-00-00', '', DATE_FORMAT(o.order_date, '%Y-%m-%d')) AS order_date, 
    IF(o.ship_date = '0000-00-00', '', DATE_FORMAT(o.ship_date, '%Y-%m-%d')) AS ship_date, 
    o.note, 
    CONCAT(c.customer_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ')') 
    AS customer_id FROM Orders AS o JOIN Customers AS c ON o.customer_id = c.customer_id ORDER BY o.order_id;`;
  
  const selectAllItemsQuery = `SELECT items.item_id, items.description, items.type FROM Products`;
  const selectAllCustomersQuery = `SELECT customer_id, first_name, last_name, email FROM Customers; `;

  db.pool.query(selectAllOrdersQuery, function (error, orders, fields) {
    db.pool.query(selectAllCustomersQuery, function (error, customers, fields) {
      res.render('orders', { orders: orders, customers: customers });
    });
    db.pool.query(selectAllItemsQuery, function (error, products, fields) {
      res.render('orders', { orders: orders, products: products });
    });
  });
});

app.post('/add-order', function (req, res) {
  let data = req.body;
  const insertOrderQuery = `
  INSERT INTO Orders(product_id, order_date, ship_date, note, customer_id)
  VALUES
    (
      '${data.productId}'
      '${data.orderDate}',
      '${data.shipDate}',
      '${data.note}',
      '${data.customerId}'
    ); `;
  db.pool.query(insertOrderQuery, function (error, rows, fields) {

    if (error) {
      console.log(error)
      res.sendStatus(400);
    } else {
      const selectAllOrdersQuery = `
        SELECT o.order_id,
        CONCAT(items.item_id, ' - ', items.description, ' ', items.type') AS customer_id FROM Orders AS o JOIN Products AS items ON o.customer_id = items.item_id BY o.order_id,
        IF(o.order_date = '0000-00-00', '', DATE_FORMAT(o.order_date, '%Y-%m-%d')) AS order_date,
        IF(o.ship_date = '0000-00-00', '', DATE_FORMAT(o.ship_date, '%Y-%m-%d')) AS ship_date,
        o.note, CONCAT(c.customer_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ')') AS customer_id
        FROM Orders AS o JOIN Customers AS c ON o.customer_id = c.customer_id ORDER BY o.order_id; `;
      db.pool.query(selectAllOrdersQuery, function (error, rows, fields) {
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
*/
// END TEST

app.delete('/delete-order', function (req, res) {

  let data = req.body;

  let orderId = parseInt(data.id);
  let deleteOrderQuery = `DELETE FROM Orders WHERE order_id = ? `;

  db.pool.query(deleteOrderQuery, [orderId], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

app.put('/update-order', function (req, res) {

  let data = req.body;
  let orderId = parseInt(data.orderId);
  let productId = parseInt(data.productId);
  let orderDate = data.orderDate;
  let shipDate = data.shipDate;
  let note = data.note;
  let customerId = parseInt(data.customerId);

  const updateOrderQuery = `UPDATE Orders SET product_id = ?, order_date = ?, ship_date = ?, note = ?, customer_id = ? WHERE order_id = ? `;

  const selectOrderQuery = `SELECT o.order_id,
  CONCAT(items.item_id, ' - ', items.description, ' ', items.type') AS customer_id FROM Orders AS o JOIN Products AS items ON o.customer_id = items.item_id AND o.order_id = ?,
    o.order_date, o.note, CONCAT(c.customer_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ')') AS customer_id
    FROM Orders AS o JOIN Customers AS c ON o.customer_id = c.customer_id AND o.order_id = ? `;

  db.pool.query(updateOrderQuery, [productId, orderDate, shipDate, note, customerId, orderId], function (error, rows, fields) {
    if (error) {

      console.log(error);
      res.sendStatus(400);
    }
    else {
      db.pool.query(selectOrderQuery, [orderId], function (error, rows, fields) {
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


// PRODUCTS
app.get('/products', function (req, res) {
  const selectAllItemsQuery = `SELECT items.item_id, items.description, items.type, items.condition, items.price, CONCAT(o.order_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ') on ', DATE_FORMAT(o.order_date, '%Y-%m-%d')) AS order_id FROM Products AS items LEFT JOIN Orders AS o ON items.order_id = o.order_id LEFT JOIN Customers AS c ON o.customer_id = c.customer_id ORDER BY items.item_id; `;
  const selectAllOrdersQuery = `SELECT o.order_id, DATE_FORMAT(o.order_date, '%Y-%m-%d') AS order_date, CONCAT(c.first_name, ' ', c.last_name, ' (', c.email, ')') AS customer FROM Orders AS o JOIN Customers AS c ON o.customer_id = c.customer_id ORDER BY o.order_id; `;

  db.pool.query(selectAllItemsQuery, function (error, items, fields) {
    db.pool.query(selectAllOrdersQuery, function (error, orders, fields) {
      res.render('products', { items: items, orders: orders });
    });
  });
});


app.post('/add-products', function (req, res) {

  let data = req.body;

  let orderId = parseInt(data.orderId);
  if (isNaN(orderId)) {
    orderId = 'NULL';
  }

  // Create query
  const insertItemQuery = `INSERT INTO Products(description, type, \`condition\`, price, order_id)
    VALUES
    (
        '${data.description}',
        '${data.type}',
        '${data.condition}',
        '${data.price}',
        ${orderId}
    );`;
  db.pool.query(insertItemQuery, function (error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400);
    } else {
      const selectAllItemsQuery = `
        SELECT items.item_id,
        items.description,
        items.type,
        items.condition,
        items.price,
        CONCAT(o.order_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ') on ', DATE_FORMAT(o.order_date, '%Y-%m-%d')) AS order_id
        FROM Products AS items
        LEFT JOIN Orders AS o ON items.order_id = o.order_id
        LEFT JOIN Customers AS c ON o.customer_id = c.customer_id
        ORDER BY items.item_id;`;
      db.pool.query(selectAllItemsQuery, function (error, rows, fields) {
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


app.delete('/delete-products', function (req, res) {
  let data = req.body;
  let itemId = parseInt(data.id);
  let deleteItemQuery = `DELETE FROM Products WHERE item_id = ?`;

  db.pool.query(deleteItemQuery, [itemId], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});


app.put('/update-products', function (req, res) {
  let data = req.body;
  let itemId = parseInt(data.itemId);
  let description = data.description;
  let type = data.type;
  let condition = data.condition;
  let price = data.price;
  let orderId = parseInt(data.orderId);
  if (isNaN(orderId)) {
    orderId = null;
  }

  const updateProductsQuery = `UPDATE Products SET description = ?, type = ?, \`condition\` = ?, price = ?, order_id = ? WHERE item_id = ?`;

  const selectItemQuery = `
    SELECT items.item_id, items.description, items.type, items.\`condition\`, items.price,
    CONCAT(o.order_id, ' - ', c.first_name, ' ', c.last_name, ' (', c.email, ') on ', DATE_FORMAT(o.order_date, '%Y-%m-%d')) AS order_id
    FROM Products AS items
    LEFT JOIN Orders AS o ON items.order_id = o.order_id
    LEFT JOIN Customers AS c ON o.customer_id = c.customer_id
    WHERE items.item_id = ?`;

  db.pool.query(updateProductsQuery, [description, type, condition, price, orderId, itemId], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }

    else {
      db.pool.query(selectItemQuery, [itemId], function (error, rows, fields) {
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


// SUPPLIERS
app.get('/suppliers', function (req, res) {

  const selectAllSuppliersQuery = `SELECT suppliers_id, name, email, phone, rep FROM Suppliers ORDER BY suppliers_id;`;
  db.pool.query(selectAllSuppliersQuery, function (error, suppliers, fields) {
    res.render('suppliers', { suppliers: suppliers });
  });
});

app.post('/add-suppliers', function (req, res) {

  let data = req.body;

  const insertSuppliersQuery = `
    INSERT INTO Suppliers (name, email, phone, rep) VALUES ('${data.name}', '${data.email}', '${data.phone}', '${data.rep});`;
  db.pool.query(insertSuppliersQuery, function (error, rows, fields) {

    if (error) {
      console.log(error)
      res.sendStatus(400);
    } else {
      const selectAllSuppliersQuery = `SELECT suppliers_id, name, email, phone, rep FROM Suppliers ORDER BY suppliers_id;`;
      db.pool.query(selectAllSuppliersQuery, function (error, rows, fields) {

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


app.delete('/delete-suppliers', function (req, res) {

  let data = req.body;

  let suppliersId = parseInt(data.id);
  let deleteSuppliersQuery = `DELETE FROM Suppliers WHERE suppliers_id = ?`;

  db.pool.query(deleteSuppliersQuery, [suppliersId], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});


app.put('/update-suppliers', function (req, res) {

  let data = req.body;

  let suppliersId = parseInt(data.suppliersId);
  let name = data.name;
  let email = data.email;
  let phone = data.phone;
  let rep = data.rep;

  const updateSuppliersQuery = `UPDATE Suppliers SET name = ?, email = ?, phone = ?, rep = ? WHERE suppliers_id = ?;`;
  const selectSuppliersQuery = `SELECT suppliers_id, name, email, phone, rep FROM Suppliers WHERE suppliers_id = ?;`;

  db.pool.query(updateSuppliersQuery, [name, email, phone, rep, suppliersId], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      db.pool.query(selectSuppliersQuery, [suppliersId], function (error, rows, fields) {
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


// INVENTORY
app.get('/inventory', function (req, res) {

  const selectAllInventoryQuery = `
    SELECT inv.inventory_item_id,
    CONCAT(i.item_id, ' - ', i.description) AS item_id,
    CONCAT(s.suppliers_id, ' - ', s.name, ' (', s.email, ')') AS suppliers_id
    FROM Inventory AS inv
    JOIN Products AS i ON inv.item_id = i.item_id
    JOIN Suppliers AS s ON s.suppliers_id = inv.suppliers_id
    ORDER BY inv.inventory_item_id;`;

  const selectAllProductsQuery = `SELECT item_id, description FROM Products ORDER BY item_id;`;
  const selectAllSuppliersQuery = `SELECT suppliers_id, CONCAT(name, ' (', email, ')') AS Suppliers FROM Suppliers ORDER BY suppliers_id;`;

  db.pool.query(selectAllInventoryQuery, function (error, inventory, fields) {
    db.pool.query(selectAllProductsQuery, function (error, products, fields) {
      db.pool.query(selectAllSuppliersQuery, function (error, suppliers, fields) {
        res.render('inventory', { inventory: inventory, products: products, suppliers: suppliers });
      });
    });
  });
});

app.post('/add-inventory', function (req, res) {

  let data = req.body;

  const insertInventoryQuery = `
    INSERT INTO Inventory (item_id, suppliers_id) VALUES ('${data.itemId}','${data.suppliersId}');`;

  db.pool.query(insertInventoryQuery, function (error, rows, fields) {

    if (error) {
      console.log(error)
      res.sendStatus(400);
    } else {
      const selectAllInventoryQuery = `
                SELECT inv.inventory_item_id,
                CONCAT(i.item_id, ' - ', i.description) AS item_id,
                CONCAT(s.suppliers_id, ' - ', s.name, ' (', s.email, ')') AS suppliers_id
                FROM MovieItems AS inv
                JOIN Products AS i ON inv.item_id = i.item_id
                JOIN Suppliers AS s ON s.suppliers_id = inv.suppliers_id
                ORDER BY inv.inventory_item_id;`;
      db.pool.query(selectAllInventoryQuery, function (error, rows, fields) {

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

app.delete('/delete-inventory', function (req, res) {

  let data = req.body;

  let movieItemID = parseInt(data.id);
  let deleteMovieItemQuery = `DELETE FROM inventory WHERE inventory_item_id = ?`;

  db.pool.query(deleteMovieItemQuery, [movieItemID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

app.put('/update-inventory', function (req, res) {

  let data = req.body;

  let movieItemId = parseInt(data.movieItemId);
  let itemId = parseInt(data.itemId);
  let movieId = parseInt(data.movieId);

  const updateMovieItemQuery = `
    UPDATE MovieItems SET item_id = ?, suppliers_id = ? WHERE inventory_item_id = ?`;

  const selectMovieItemQuery = `
        SELECT inv.inventory_item_id,
        CONCAT(i.item_id, ' - ', i.description) AS item_id,
        CONCAT(s.suppliers_id, ' - ', s.name, ' (', s.email, ')') AS suppliers_id
        FROM MovieItems AS inv
        JOIN Products AS i ON i.item_id = inv.item_id
        JOIN Suppliers AS s ON s.suppliers_id = inv.suppliers_id
        WHERE inv.inventory_item_id = ?;`;

  db.pool.query(updateMovieItemQuery, [itemId, movieId, movieItemId], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      db.pool.query(selectMovieItemQuery, [movieItemId], function (error, rows, fields) {
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



/*
    LISTENER
*/
app.listen(PORT, function () {
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});