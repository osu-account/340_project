// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("mySelect");

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;

    // Put our data we want to send in a javascript object
    let data = {
        fullName: fullNameValue,
        email: emailValue,
        address: addressValue,
        phoneNum: phoneNumValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, customerID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("customers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == customerID) {
                let updateRowIndex = table.getElementsByTagName("tr")[i];
                let td = updateRowIndex.getElementsByTagName("td")[3];
                td.innerHTML = parsedData[0].fullName;
        }
    }
}


