/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State Univirisity.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (event) {

    // Prevent the form from submitting
    event.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerFname = document.getElementById("input-customer-fname");
    let inputCustomerLname = document.getElementById("input-customer-lname");
    let inputCustomerEmail = document.getElementById("input-customer-email");
    let inputCustomerAddress = document.getElementById("input-customer-address");
    let inputCustomerPhone = document.getElementById("input-customer-phone");


    // Get the values from the form fields
    let customerFnameValue = inputCustomerFname.value;
    let customerLnameValue = inputCustomerLname.value;
    let customerEmailValue = inputCustomerEmail.value;
    let customerAddressValue = inputCustomerAddress.value;
    let customerPhoneValue = inputCustomerPhone.value;

    let data = {
        customerFname: customerFnameValue,
        customerLname: customerLnameValue,
        customerEmail: customerEmailValue,
        customerAddress: customerAddressValue,
        customerPhone: customerPhoneValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();

    // Add new row to database using Express route.
    xhttp.open("POST", "/add-customer", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve.
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table (see helper function below)
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerFname.value = '';
            inputCustomerLname.value = '';
            inputCustomerEmail.value = '';
            inputCustomerAddress.value = '';
            inputCustomerPhone.value = '';
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
    let currentTable = document.getElementById("customers-table");
    let tbody = currentTable.getElementsByTagName("tbody")[0];

    // Get a reference to the new row from the database query (last object)
    const parsedData = JSON.parse(data);
    const newRow = parsedData[parsedData.length - 1] // last row of data

    // Create a row
    const row = document.createElement("tr");
    row.setAttribute("data-value", `${newRow.customer_id}`);

    let editCell = document.createElement("td");
    editCell.innerHTML = `<button onclick=updateCustomer(${newRow.customer_id})>Edit</button>`;

    let deleteCell = document.createElement("td");
    deleteCell.innerHTML = `<button onclick=confirmDelete(${newRow.customer_id})>Delete</button>`;

    let customerIdCell = document.createElement("td");
    customerIdCell.className = "customer-id";

    let customerFnameCell = document.createElement("td");
    customerFnameCell.className = "customer-fname";

    let customerLnameCell = document.createElement("td");
    customerLnameCell.className = "customer-lname";

    let customerEmailCell = document.createElement("td");
    customerEmailCell.className = "customer-email";

    let customerAddressCell = document.createElement("td");
    customerAddressCell.className = "customer-address";

    let customerPhoneCell = document.createElement("td");
    customerPhoneCell.className = "customer-phone";


    // Fill the cells with correct data
    customerIdCell.innerText = newRow.customer_id;

    customerFnameCell.innerText = newRow.first_name;
    customerLnameCell.innerText = newRow.last_name;
    customerEmailCell.innerText = newRow.email;
    customerAddressCell.innerText = newRow.address;
    customerPhoneCell.innerText = newRow.phone;;

    // Add the cells to the row
    row.appendChild(editCell);
    row.appendChild(deleteCell);
    row.appendChild(customerIdCell);

    row.appendChild(customerFnameCell);
    row.appendChild(customerLnameCell);
    row.appendChild(customerEmailCell);
    row.appendChild(customerAddressCell);
    row.appendChild(customerPhoneCell);

    // Add the row to the table
    tbody.appendChild(row);
}