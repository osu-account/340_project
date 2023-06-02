// Get the objects we need to modify
let updateSupplierForm = document.getElementById('update-supplier-form-ajax');

// Modify the objects we need
updateSupplierForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSupplierID = document.getElementById("mySelect");
    let inputEmail = document.getElementById("input-email-update");

    // Get the values from the form fields
    let supplierIDValue = inputSupplierID.value;
    let emailValue = inputEmail.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        supplierID: supplierIDValue,
        email: emailValue,
    }

    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-supplier-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                // Update the row data
                updateRow(xhttp.responseText, supplierIDValue);
            } else {
                console.log("There was an error with the input.");
            }
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function updateRow(data, supplierID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("suppliers-table");

    for (const element of table.rows) {
        let row = element;
        let rowDataValue = row.getAttribute("data-value");
        if (rowDataValue == supplierID) {
            let emailCell = row.getElementsByTagName("td")[3];
            emailCell.innerText = parsedData[0].email;
            break;
        }
    }
    window.location.reload();
}
