/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State Univirisity.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function updateItem(itemID) {

    window.scrollTo(0, document.body.scrollHeight);

    // Get the objects we need to modify
    let updateItemForm = document.getElementById('update-item-form');

    // Populate the update fields with the data from the table.
    document.getElementById("update-description").removeAttribute("disabled");
    document.getElementById("update-type").removeAttribute("disabled");
    document.getElementById("update-condition").removeAttribute("disabled");
    document.getElementById("update-price").removeAttribute("disabled");
    document.getElementById("update-order-id").removeAttribute("disabled");
    document.getElementById("update-item-button").removeAttribute("disabled");

    const rowToUpdate = document.querySelector(`[data-value="${itemID}"]`);

    document.getElementById("update-item-id").value = itemID;

    let description = rowToUpdate.getElementsByClassName("description")[0].textContent;
    document.getElementById("update-description").value = description;

    let type = rowToUpdate.getElementsByClassName("type")[0].textContent;
    document.getElementById("update-type").value = type;

    let condition = rowToUpdate.getElementsByClassName("condition")[0].textContent;
    document.getElementById("update-condition").value = condition;

    let price = rowToUpdate.getElementsByClassName("price")[0].textContent;
    document.getElementById("update-price").value = price;

    let orderId = rowToUpdate.getElementsByClassName("order-id")[0].textContent;
    document.getElementById("update-order-id").value = isNaN(orderId) ? parseInt(orderId) : '';

    updateItemForm.addEventListener("submit", function (event) {
    
        event.preventDefault();
        event.stopImmediatePropagation();

        let updateItemId = document.getElementById("update-item-id");
        let updateDescription = document.getElementById("update-description");
        let updateType = document.getElementById("update-type");
        let updateCondition = document.getElementById("update-condition");
        let updatePrice = document.getElementById("update-price");
        let updateOrderId = document.getElementById("update-order-id");

        let itemIdValue = updateItemId.value;
        let descriptionValue = updateDescription.value;
        let typeValue = updateType.value;
        let conditionValue = updateCondition.value;
        let priceValue = updatePrice.value;
        let orderIdValue = updateOrderId.value;

        // Put our data we want to send in a Javascript object
        let data = {
            itemId: itemIdValue,
            description: descriptionValue,
            type: typeValue,
            condition: conditionValue,
            price: priceValue,
            orderId: orderIdValue
        }
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/update-products", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Add the new data to the table
                updateRow(xhttp.response, itemIdValue);
                alert(`Updated product ${itemIdValue}`);
                window.scrollTo(document.body.scrollHeight, 0);
            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    });
}

function updateRow(data, itemID){
    let parsedData = JSON.parse(data);

    // Get the location of the row where we found the matching ID
    let updateRow = document.querySelector(`[data-value='${itemID}'`);

    // Reassign values in the table.
    let description = updateRow.getElementsByClassName("description")
    description[0].innerText = parsedData[0].description;

    let type = updateRow.getElementsByClassName("type")
    type[0].innerText = parsedData[0].type;

    let condition = updateRow.getElementsByClassName("condition")
    condition[0].innerText = parsedData[0].condition;

    let price = updateRow.getElementsByClassName("price")
    price[0].innerText = parsedData[0].price;
    
    let orderId = updateRow.getElementsByClassName("order-id")
    orderId[0].innerText = parsedData[0].order_id;
}