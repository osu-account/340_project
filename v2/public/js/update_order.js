/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State Univirisity.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function updateOrder(orderID) {

    window.scrollTo(0, document.body.scrollHeight);
    let updateOrderForm = document.getElementById('update-order-form');

    document.getElementById("update-order-date").removeAttribute("disabled");
    document.getElementById("update-ship-date").removeAttribute("disabled");
    document.getElementById("update-note").removeAttribute("disabled");
    document.getElementById("update-customer-id").removeAttribute("disabled");
    document.getElementById("update-order-button").removeAttribute("disabled");

    const rowToUpdate = document.querySelector(`[data-value="${orderID}"]`);

    document.getElementById("update-order-id").value = orderID;

    let orderDate = rowToUpdate.getElementsByClassName("order-date")[0].textContent;
    document.getElementById("update-order-date").value = orderDate;

    let shipDate = rowToUpdate.getElementsByClassName("ship-date")[0].textContent;
    document.getElementById("update-ship-date").value = shipDate;

    let note = rowToUpdate.getElementsByClassName("note")[0].textContent;
    document.getElementById("update-note").value = note;

    let customerId = rowToUpdate.getElementsByClassName("customer-id")[0].textContent;
    document.getElementById("update-customer-id").value = parseInt(customerId);

    updateOrderForm.addEventListener("submit", function (event) {
    
        event.preventDefault();
        event.stopImmediatePropagation();

        let updateOrderId = document.getElementById("update-order-id");
        let updateOrderDate = document.getElementById("update-order-date");
        let updateShipDate = document.getElementById("update-ship-date");
        let updateNote = document.getElementById("update-note");
        let updateCustomerId = document.getElementById("update-customer-id");

        let orderIdValue = updateOrderId.value;
        let orderDateValue = updateOrderDate.value;
        let shipDateValue = updateShipDate.value;
        let noteValue = updateNote.value;
        let customerIdValue = updateCustomerId.value;
        


        if (shipDateValue && new Date(orderDateValue) > new Date(shipDateValue)) {
            alert("Ship date must be later than or equal to order date.");
            return;
        }

        let data = {
            orderId: orderIdValue,
            orderDate: orderDateValue,
            shipDate: shipDateValue,
            note: noteValue,
            customerId: customerIdValue
        }

        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/update-order", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                updateRow(xhttp.response, orderIdValue);
                alert(`Updated order ${orderIdValue}`);
                window.scrollTo(document.body.scrollHeight, 0);


            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }
        
        xhttp.send(JSON.stringify(data));

    });
}

function updateRow(data, orderID){
    let parsedData = JSON.parse(data);

    let updateRow = document.querySelector(`[data-value='${orderID}'`);

    let orderDate = updateRow.getElementsByClassName("order-date")
    orderDate[0].innerText = parsedData[0].order_date.substring(0,10);

    let shipDate = updateRow.getElementsByClassName("ship-date")
    shipDate[0].innerText = parsedData[0].ship_date.substring(0,10);

    let note = updateRow.getElementsByClassName("note")
    note[0].innerText = parsedData[0].note;
    
    let customerId = updateRow.getElementsByClassName("customer-id")
    customerId[0].innerText = parsedData[0].customer_id;
}