/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State University.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// code for deleteSupplier using regular javascript/xhttp
function deleteSupplier(supplierID) {
    let data = {
        supplierID: supplierID
    };
    
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-supplier-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(supplierID);
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    };

    xhttp.send(JSON.stringify(data));
}

function deleteRow(supplierID){
    let table = document.getElementById("suppliers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == supplierID) {
            table.deleteRow(i);
            deleteDropDownMenu(supplierID);
            break;
        }
    }
    window.location.reload();
}

function deleteDropDownMenu (supplierID) {
    let selectMenu = document.getElementById("mySelect")
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(supplierID)) {
            selectMenu[i].remove();
            break;
        }
    }
}
