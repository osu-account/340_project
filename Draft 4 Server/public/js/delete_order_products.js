// code for deleteOrderProducts function using jQuery
// function deleteOrderProducts(orderID) {
//     let link = "/delete-orderProducts-ajax/";
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

// code for deleteOrderProducts using regular javascript/xhttp
function deleteOrderProducts(orderID) {
    let data = {
        orderID: orderID
    };
    
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-order_products-ajax", true);
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
    let table = document.getElementById("order_products-table");
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
