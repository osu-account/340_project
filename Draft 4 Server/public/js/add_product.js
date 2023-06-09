// Get the objects we need to modify
let addProductForm = document.getElementById('add-product-form-ajax');

// Modify the objects we need
addProductForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputDescription = document.getElementById("input-description");
    let inputPrice = document.getElementById("input-price");
    let inputSupplierID = document.getElementById("input-supplierID");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let descriptionValue = inputDescription.value; 
    let priceValue = inputPrice.value;
    let supplierIDValue = inputSupplierID.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        description: descriptionValue,
        price: priceValue,
        supplierID: supplierIDValue
    }
    
    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputDescription.value = '';
            inputPrice.value = '';
            inputSupplierID.value = '';
        }
        else if (xhttp.readyState === 4 && xhttp.status !== 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Products table.
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("products-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let productIDCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let supplierIDCell = document.createElement("TD");

    // Fill the cells with correct data
    productIDCell.innerText = newRow.productID;
    nameCell.innerText = newRow.name;
    descriptionCell.innerText = newRow.description;
    priceCell.innerText = newRow.price;
    supplierIDCell.innerText = newRow.supplierID;

    // Add the cells to the row 
    row.appendChild(productIDCell);
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(priceCell);
    row.appendChild(supplierIDCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
