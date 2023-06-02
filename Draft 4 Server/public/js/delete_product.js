// code for deleteProducts using regular javascript/xhttp


function deleteProduct(productID) {
    console.log(`Deleting product: ${productID}`); // test

    let data = {
        productID: productID
    };
    
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(productID);
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    };

    xhttp.send(JSON.stringify(data));
}

function deleteRow(productID){
    let table = document.getElementById("products-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == productID) {
            table.deleteRow(i);
            deleteDropDownMenu(productID);
            break;
        }
    }
    window.location.reload();
}

function deleteDropDownMenu (productID) {
    let selectMenu = document.getElementById("pId2")
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(productID)) {
            selectMenu[i].remove();
            break;
        }
    }
}
