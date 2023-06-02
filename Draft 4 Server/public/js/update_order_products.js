// Get the objects we need to modify
let updateOrderProductsForm = document.getElementById('update-order_products-form-ajax');

// Modify the objects we need
updateOrderProductsForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderID = document.getElementById("mySelect");
    let inputQuantity = document.getElementById("input-quantity-update");

    // Get the values from the form fields
    let orderIDValue = inputOrderID.value;
    let quantityValue = inputQuantity.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        orderID: orderIDValue,
        quantity: quantityValue,
    }

    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-order_products-ajax", true);
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

    let table = document.getElementById("order_products-table");

    for (const element of table.rows) {
        let row = element;
        let rowDataValue = row.getAttribute("data-value");
        if (rowDataValue == orderID) {
            let quantityCell = row.getElementsByTagName("td")[3];
            quantityCell.innerText = parsedData[0].quantity;
            break;
        }
    }
    window.location.reload();
}
