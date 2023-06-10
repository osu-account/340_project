/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State Univirisity.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/
function confirmDelete(orderID) {

    const row = document.querySelector(`tr[data-value='${orderID}']`);

    const result = confirm(`Are you sure you want to delete order ${orderID}?`);

    if (result) {
        deleteOrder(orderID);
    } else {}
}


function deleteOrder(orderID) {
    let data = {
        id: orderID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-order", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            deleteRow(orderID);

            updateOrderId = document.getElementById("update-order-id");
            if (updateOrderId.value == orderID) {
                updateOrderId.value = '';
                updateOrderId.setAttribute("disabled","disabled");

                updateOrderDate = document.getElementById("update-order-date");
                updateOrderDate.value = '';
                updateOrderDate.setAttribute("disabled","disabled");

                updateShipDate = document.getElementById("update-ship-date");
                updateShipDate.value = '';
                updateShipDate.setAttribute("disabled","disabled");

                updateNote = document.getElementById("update-note");
                updateNote.value = '';
                updateNote.setAttribute("disabled","disabled");

                updateCustomerId = document.getElementById("update-customer-id");
                updateCustomerId.value = '';
                updateCustomerId.setAttribute("disabled","disabled");
            }

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}


function deleteRow(orderID){

    let table = document.getElementById("orders-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == orderID) {
            table.deleteRow(i);
            break;
       }
    }
}