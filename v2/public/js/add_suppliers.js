// Get the objects we need to modify
let addSupplierForm = document.getElementById('add-suppliers-form');

// Modify the objects we need
addSupplierForm.addEventListener("submit", function (event) {
    
    // Prevent the form from submitting
    event.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputEmail = document.getElementById("input-email");
    let inputPhone = document.getElementById("input-phone");
    let inputRep = document.getElementById("input-rep");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    let repValue = inputRep.value;

    // Perform data validation: Check that name + email is unique
    let names = document.querySelectorAll(".name");
    let emails = document.querySelectorAll(".email");
    let namesAndemails = Array.from(names).map(function(name ,i) {
        email = emails[i];
        // Returns array of text combinations extracted from table
        return name.textContent + email.textContent;
    });

    let isDuplicate = namesAnds.includes(nameValue + emailValue);
    if (isDuplicate) {
        alert("Name and email combination must be unique.");
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        rep: repValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();

    // Add new row to database using Express route.
    xhttp.open("POST", "/add-suppliers", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve.
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table (see helper function below)
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputEmail.value = '';
            inputPhone.value = '';
            inputRep.value = '';
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
    let currentTable = document.getElementById("suppliers-table");
    let tbody = currentTable.getElementsByTagName("tbody")[0];

    // Get a reference to the new row from the database query (last object)
    const parsedData = JSON.parse(data);
    const newRow = parsedData[parsedData.length - 1]

    // Create a row
    const row = document.createElement("tr");
    row.setAttribute("data-value", `${newRow.suppliers_id}`);

    let supplierIdCell = document.createElement("td");
    supplierIdCell.className = "supplier-id";

    let nameCell = document.createElement("td");
    nameCell.className = "name";

    let emailCell = document.createElement("td");
    emailCell.className = "email";

    let phoneCell = document.createElement("td");
    phoneCell.className = "phone";

    let editCell = document.createElement("td");
    editCell.innerHTML = `<button onclick=updateSuppliers(${newRow.suppliers_id})>Edit</button>`;

    let deleteCell = document.createElement("td");
    deleteCell.innerHTML = `<button onclick=confirmDelete(${newRow.suppliers_id})>Delete</button>`;

    // Fill the cells with correct data
    suppliersIdCell.innerText = newRow.suppliers_id;
    nameCell.innerText = newRow.name;
    emailCell.innerText = newRow.email;
    phoneCell.innerText = newRow.phone;
    repCell.innerText = newRow.rep;

    // Add the cells to the row
    row.appendChild(suppliersIdCell);
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(repCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);
    
    // Add the row to the table
    tbody.appendChild(row);
}