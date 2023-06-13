/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State University.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-firstName");
    let inputLastName = document.getElementById("input-lastName");
    let inputEmail = document.getElementById("input-email");
    let inputAddress = document.getElementById("input-address");
    let inputPhoneNum = document.getElementById("input-phoneNum");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let addressValue = inputAddress.value;
    let phoneNumValue = inputPhoneNum.value;

    // Put our data we want to send in a javascript object
    let data = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        address: addressValue,
        phoneNum: phoneNumValue
    }
    
    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
            inputAddress.value = '';
            inputPhoneNum.value = '';
        }
        else if (xhttp.readyState === 4 && xhttp.status !== 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Customers table.
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("customers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let customerIDCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let phoneNumCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    customerIDCell.innerText = newRow.customerID;
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;
    emailCell.innerText = newRow.email;
    addressCell.innerText = newRow.address;
    phoneNumCell.innerText = newRow.phoneNum;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteCustomer(newRow.customerID);
    };

    // Add the cells to the row 
    row.appendChild(customerIDCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(addressCell);
    row.appendChild(phoneNumCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.customerID);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.firstName + ' ' +  newRow.lastName;
    option.value = newRow.customerID;
    selectMenu.add(option);
    
}