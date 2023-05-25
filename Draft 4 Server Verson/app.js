// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 5588;                 // Set a port number at the top so it's easy to change in the future

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.get('/', function(req, res)
    {
        // Define our queries
        query1 = 'DROP TABLE IF EXISTS diagnostic;';
        query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
        query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
        query4 = 'SELECT * FROM diagnostic;';

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // DROP TABLE...
        db.pool.query(query1, function (err, results, fields){

            // CREATE TABLE...
            db.pool.query(query2, function(err, results, fields){

                // INSERT INTO...
                db.pool.query(query3, function(err, results, fields){

                    // SELECT *...
                    db.pool.query(query4, function(err, results, fields){

                        // Send the results to the browser
                        res.send(JSON.stringify(results));
                    });
                });
            });
        });
    });

// Route for index
app.get('/', function(req, res) {res.render('index');});
app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM bsg_people;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });     
// Route for customers
//app.get('/customers', function(req, res) {res.render('customers');});
// Route for inventory
app.get('/inventory', function(req, res) {res.render('inventory');});



// app.js

app.get('/customers', function(req, res)
    {  
        let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(rows){    // Execute the query

            res.render('customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query



/*
    ROUTES
*/

app.get('/', function(req, res)
    {
        res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});