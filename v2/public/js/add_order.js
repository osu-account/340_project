/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State Univirisity.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let inputOrderDate = document.getElementById("input-order-date");
let inputShipDate = document.getElementById("input-ship-date");
let inputNote = document.getElementById("input-note");
let inputCustomerId = document.getElementById("input-customer-id");
let inputProductId = document.getElementById("input-product-id");

document.getElementById("add-order-button").addEventListener("click", function() {
  // Get the values from the form fields
  let orderDateValue = inputOrderDate.value;
  let shipDateValue = inputShipDate.value;
  let noteValue = inputNote.value;
  let customerIdValue = inputCustomerId.value;
  let productIdValue = inputProductId.value;

  let data = {
    orderDate: orderDateValue,
    shipDate: shipDateValue,
    note: noteValue,
    customerId: customerIdValue,
    productId: productIdValue
  };

  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-order", true);
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table (see helper function below)
      addRowToTable(xhttp.response, data);

      // Clear the input fields for another transaction
      inputOrderDate.value = "";
      inputShipDate.value = "";
      inputNote.value = "";
      inputCustomerId.value = "";
      inputProductId.value = "";
    }
  };

  xhttp.send(JSON.stringify(data));
});

function addRowToTable(orderId, data) {
  let table = document.getElementById("orders-table");

  let newRow = table.insertRow();
  newRow.innerHTML = `
    <td>${orderId}</td>
    <td>${data.orderDate}</td>
    <td>${data.shipDate}</td>
    <td>${data.note}</td>
    <td>${data.customerId}</td>
    <td>${data.productId}</td>
  `;
}



/*
// OLD SAVE
// Get the objects we need to modify
let addOrderForm = document.getElementById('add-order-form');

// Modify the objects we need
addOrderForm.addEventListener("submit", function (event) {
    
    // Prevent the form from submitting
    event.preventDefault();

    // Get form fields we need to get data from
    let inputOrderDate = document.getElementById("input-order-date");
    let inputShipDate = document.getElementById("input-ship-date");
    let inputNote = document.getElementById("input-note");
    let inputCustomerId = document.getElementById("input-customer-id");

    // Get the values from the form fields
    let orderDateValue = inputOrderDate.value;
    let shipDateValue = inputShipDate.value;
    let noteValue = inputNote.value;
    let customerIdValue = inputCustomerId.value;

    // Perform data validation.
    if (shipDateValue && new Date(orderDateValue) > new Date(shipDateValue)) {
        alert("Ship date must be later than or equal to order date.");
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        orderDate: orderDateValue,
        shipDate: shipDateValue,
        note: noteValue,
        customerId: customerIdValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();

    // Add new row to database using Express route.
    xhttp.open("POST", "/add-order", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve.
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table (see helper function below)
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderDate.value = '';
            inputShipDate.value = '';
            inputNote.value = '';
            inputCustomerId.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});


// Creates a single HTML row from an Object representing a single record,
// where data is the response that includes all records, including the newly created one.
addRowToTable = (data) => {

    // Get a reference to the current table on the page.
    let currentTable = document.getElementById("orders-table");
    let tbody = currentTable.getElementsByTagName("tbody")[0];

    // Get a reference to the new row from the database query (last object)
    const parsedData = JSON.parse(data);
    const newRow = parsedData[parsedData.length - 1] // last row of data

    // Create a row
    const row = document.createElement("tr");
    row.setAttribute("data-value", `${newRow.order_id}`);

    let editCell = document.createElement("td");
    editCell.innerHTML = `<button onclick=updateOrder(${newRow.order_id})>Edit</button>`;

    let deleteCell = document.createElement("td");
    deleteCell.innerHTML = `<button onclick=confirmDelete(${newRow.order_id})>Delete</button>`;

    let orderIdCell = document.createElement("td");
    orderIdCell.className = "order-id";

    let orderDateCell = document.createElement("td");
    orderDateCell.className = "order-date";

    let shipDateCell = document.createElement("td");
    shipDateCell.className = "ship-date";

    let noteCell = document.createElement("td");
    noteCell.className = "note";

    let customerIdCell = document.createElement("td");
    customerIdCell.className = "customer-id";

    // Fill the cells with correct data
    orderIdCell.innerText = newRow.order_id;
    orderDateCell.innerText = newRow.order_date.substring(0,10);
    shipDateCell.innerText = newRow.ship_date.substring(0,10);
    noteCell.innerText = newRow.note;
    customerIdCell.innerText = newRow.customer_id;

    // Add the cells to the row
    row.appendChild(editCell);
    row.appendChild(deleteCell);
    row.appendChild(orderIdCell);
    row.appendChild(orderDateCell);
    row.appendChild(shipDateCell);
    row.appendChild(noteCell);
    row.appendChild(customerIdCell);
    
    // Add the row to the table
    tbody.appendChild(row);
}*/