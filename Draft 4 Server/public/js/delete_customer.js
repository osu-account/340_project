// code for deleteCustomer function using jQuery
// function deleteCustomer(customerID) {
//     let link = "/delete-customer-ajax/";
//     let data = {
//         customerID: customerID,
//     };

//     $.ajax({
//         url: link,
//         type: "DELETE",
//         data: JSON.stringify(data),
//         contentType: "application/json; charset=utf-8",
//         success: function (result) {
//             deleteRow(customerID);
//         },
//     });
// }

// code for deleteCustomer using regular javascript/xhttp
function deleteCustomer(customerID) {
    let data = {
        customerID: customerID
    };
    
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(customerID);
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    };

    xhttp.send(JSON.stringify(data));
}

function deleteRow(customerID){
    let table = document.getElementById("customers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == customerID) {
            table.deleteRow(i);
            deleteDropDownMenu(customerID);
            break;
        }
    }
}

function deleteDropDownMenu (customerID) {
    let selectMenu = document.getElementById("mySelect")
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(customerID)) {
            selectMenu[i].remove();
            break;
        }
    }
}
