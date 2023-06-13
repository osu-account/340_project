/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State University.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addSupplierForm = document.getElementById('add-supplier-form-ajax');

// Modify the objects we need
addSupplierForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputEmail = document.getElementById("input-email");
    let inputPhone = document.getElementById("input-phone");
    let inputRepresentativeName = document.getElementById("input-representativeName");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    let representativeNameValue = inputRepresentativeName.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        representativeName: representativeNameValue
    }
    
    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-supplier-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputEmail.value = '';
            inputPhone.value = '';
            inputRepresentativeName.value = '';
        }
        else if (xhttp.readyState === 4 && xhttp.status !== 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Suppliers table.
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("suppliers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let supplierIDCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");
    let representativeNameCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    supplierIDCell.innerText = newRow.supplierID;
    nameCell.innerText = newRow.name;
    emailCell.innerText = newRow.email;
    phoneCell.innerText = newRow.phone;
    representativeNameCell.innerText = newRow.representativeName;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteSupplier(newRow.supplierID);
    };

    // Add the cells to the row 
    row.appendChild(supplierIDCell);
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(representativeNameCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.supplierID);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.name;
    option.value = newRow.supplierID;
    selectMenu.add(option);
    
}