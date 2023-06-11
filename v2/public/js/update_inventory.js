function updateMovieItem(inventoryID) {

    window.scrollTo(0, document.body.scrollHeight);

    // Get the objects we need to modify
    let updateMovieItemForm = document.getElementById('update-inventory-form');

    // Populate the update fields with the data from the table.
    document.getElementById("update-item-id").removeAttribute("disabled");
    document.getElementById("update-suppliers-id").removeAttribute("disabled");
    document.getElementById("update-inventory-button").removeAttribute("disabled");

    const rowToUpdate = document.querySelector(`[data-value="${inventoryID}"]`);

    document.getElementById("update-inventory-id").value = inventoryID;

    let itemId = rowToUpdate.getElementsByClassName("item-id")[0].textContent;
    document.getElementById("update-item-id").value = parseInt(itemId); // Gets ID from "ID - FirstName LastName (email)"

    let movieId = rowToUpdate.getElementsByClassName("movie-id")[0].textContent;
    document.getElementById("update-suppliers-id").value = parseInt(movieId); // Gets ID from "ID - FirstName LastName (email)"


    // Modify the objects we need
    updateMovieItemForm.addEventListener("submit", function (event) {
    
        event.preventDefault(); // prevent form from submitting
        event.stopImmediatePropagation(); // prevent mulitple unintended submissions and dialog box messages

        // Get form fields we need to get data from
        let updatInventoryId = document.getElementById("update-inventory-id");
        let updateItemId = document.getElementById("update-item-id");
        let updatSuppliersId = document.getElementById("update-suppliers-id");

        // Get the values from the form fields
        let movieItemIdValue = updatInventoryId.value;
        let itemIdValue = updateItemId.value;
        let movieIdValue = updatSuppliersId.value;

        // Perform data validation: Check that ID combinations are unique
        let items = document.querySelectorAll(".item-id");
        let suppliers = document.querySelectorAll(".suppliers-id");
        let inventoryIds = Array.from(items).map(function(item ,i) {
            suppliers = suppliers[i];
            // Returns array of ID combos extracted from table, e.g., ['1-2', '3-4', ...]
            return item.textContent.match(/\d+/)[0] + "-" + suppliers.textContent.match(/\d+/)[0];
        });

        let isDuplicate = inventoryIds.includes(itemIdValue + "-" + suppliersIdValue);
        if (isDuplicate) {
            alert("Products item ID and suppliers ID combination must be unique.");
            return;
        }

        // Put our data we want to send in a Javascript object
        let data = {
            movieItemId: inventoryIdValue,
            itemId: itemIdValue,
            movieId: suppliersIdValue,
        }
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/update-inventory", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Add the new data to the table
                updateRow(xhttp.response, inventoryIdValue);
                alert(`Updated suppliers item ${inventoryIdValue}`);
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

function updateRow(data, inventoryID) {
    let parsedData = JSON.parse(data);

    // Get the location of the row where we found the matching ID
    let updateRow = document.querySelector(`[data-value='${inventoryID}'`);

    // Reassign values in the table.
    let itemId = updateRow.getElementsByClassName("item-id")
    itemId[0].innerText = parsedData[0].item_id;

    let suppliersd = updateRow.getElementsByClassName("duppliers-id")
    suppliersId[0].innerText = parsedData[0].movie_id;
}