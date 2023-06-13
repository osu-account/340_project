/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State University.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addLocationForm = document.getElementById('add-location-form-ajax');

// Modify the objects we need
addLocationForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputAddress = document.getElementById("input-address");
    let inputPhone = document.getElementById("input-phone");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let addressValue = inputAddress.value;
    let phoneValue = inputPhone.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        address: addressValue,
        phone: phoneValue
    }
    
    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-location-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputAddress.value = '';
            inputPhone.value = '';
        }
        else if (xhttp.readyState === 4 && xhttp.status !== 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Locations table.
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("locations-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let locationIDCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    locationIDCell.innerText = newRow.locationID;
    nameCell.innerText = newRow.name;
    addressCell.innerText = newRow.address;
    phoneCell.innerText = newRow.phone;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteLocation(newRow.locationID);
    };

    // Add the cells to the row 
    row.appendChild(locationIDCell);
    row.appendChild(nameCell);
    row.appendChild(addressCell);
    row.appendChild(phoneCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.locationID);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.locationID;
    option.value = newRow.locationID;
    selectMenu.add(option);
    
}