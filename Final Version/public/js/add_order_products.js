/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State University.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addOrderProductsForm = document.getElementById('add-order_products-form-ajax');

// Modify the objects we need
addOrderProductsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputQuantity = document.getElementById("input-quantity");
    let inputPrice = document.getElementById("input-price");

    // Get the values from the form fields
    let quantityValue = inputQuantity.value;
    let priceValue = inputPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        quantity: quantityValue,
        price: priceValue
    }
    
    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order_products-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputQuantity.value = '';
            inputPrice.value = '';
        }
        else if (xhttp.readyState === 4 && xhttp.status !== 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// OrderProductss table.
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("orderProductss-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let orderIDCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let priceCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    orderIDCell.innerText = newRow.orderID;
    quantityCell.innerText = newRow.quantity;
    priceCell.innerText = newRow.price;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteOrderProducts(newRow.orderID);
    };

    // Add the cells to the row 
    row.appendChild(orderIDCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.orderID);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.orderID;
    option.value = newRow.orderID;
    selectMenu.add(option);
    
}