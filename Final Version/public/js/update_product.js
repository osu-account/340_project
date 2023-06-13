/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State University.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let updateProductForm = document.getElementById('update-product-form-ajax');

// Modify the objects we need
updateProductForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProductrID = document.getElementById("mySelect");
    let inputEmail = document.getElementById("input-email-update");

    // Get the values from the form fields
    let customerIDValue = inputProductrID.value;
    let emailValue = inputEmail.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        customerID: customerIDValue,
        email: emailValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                // Update the row data
                updateRow(xhttp.responseText, customerIDValue);
            } else {
                console.log("There was an error with the input.");
            }
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function updateRow(data, customerID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("products-table");

    for (const element of table.rows) {
        let row = element;
        let rowDataValue = row.getAttribute("data-value");
        if (rowDataValue == customerID) {
            let emailCell = row.getElementsByTagName("td")[3];
            emailCell.innerText = parsedData[0].email;
            break;
        }
    }
    window.location.reload();
}
