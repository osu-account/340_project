// code for deleteOrder function using jQuery
// function deleteOrder(orderID) {
//     let link = "/delete-order-ajax/";
//     let data = {
//         orderID: orderID,
//     };

//     $.ajax({
//         url: link,
//         type: "DELETE",
//         data: JSON.stringify(data),
//         contentType: "application/json; charset=utf-8",
//         success: function (result) {
//             deleteRow(orderID);
//         },
//     });
// }

// code for deleteOrder using regular javascript/xhttp
function deleteOrder(orderID) {
    let data = {
        orderID: orderID
    };
    
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(orderID);
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    };

    xhttp.send(JSON.stringify(data));
}

function deleteRow(orderID){
    let table = document.getElementById("orders-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == orderID) {
            table.deleteRow(i);
            deleteDropDownMenu(orderID);
            break;
        }
    }
    window.location.reload();
}

function deleteDropDownMenu (orderID) {
    let selectMenu = document.getElementById("mySelect")
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(orderID)) {
            selectMenu[i].remove();
            break;
        }
    }
}
