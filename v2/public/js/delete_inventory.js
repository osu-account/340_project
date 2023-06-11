function confirmDelete(inventoryID) {

    const row = document.querySelector(`tr[data-value='${inventoryID}']`);

    const result = confirm(`Are you sure you want to delete movie item ${inventoryID}?`);

    if (result) {
        deleteItem(inventoryID);
    } else {
        // Do nothing
    }
}


function deleteItem(inventoryID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: inventoryID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-inventory", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(inventoryID);

            // Clear any row that contained updates 
            updateMovieItemId = document.getElementById("update-inventory-id");
            if (updateMovieItemId.value == inventoryID) {
                updateMovieItemId.value = '';
                updateMovieItemId.setAttribute("disabled","disabled");

                updateItemId = document.getElementById("update-item-id");
                updateItemId.value = '';
                updateItemId.setAttribute("disabled","disabled");

                updateMovieId = document.getElementById("update-invatory-id");
                updateMovieId.value = '';
                updateMovieId.setAttribute("disabled","disabled");
            }

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(inventoryID){

    let table = document.getElementById("inventory-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == inventoryID) {
            table.deleteRow(i);
            break;
       }
    }
}