/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State University.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let updateOrderForm = document.getElementById('update-order-form-ajax');

// Modify the objects we need
updateOrderForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderID = document.getElementById("mySelect");
    let inputOrderDate = document.getElementById("input-orderDate-update");

    // Get the values from the form fields
    let orderIDValue = inputOrderID.value;
    let orderDateValue = inputOrderDate.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        orderID: orderIDValue,
        orderDate: orderDateValue,
    }

    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                // Update the row data
                updateRow(xhttp.responseText, orderIDValue);
            } else {
                console.log("There was an error with the input.");
            }
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function updateRow(data, orderID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("orders-table");

    for (const element of table.rows) {
        let row = element;
        let rowDataValue = row.getAttribute("data-value");
        if (rowDataValue == orderID) {
            let orderDateCell = row.getElementsByTagName("td")[3];
            orderDateCell.innerText = parsedData[0].orderDate;
            break;
        }
    }
    window.location.reload();
}
