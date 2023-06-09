/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State Univirisity.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function updateCustomer(customerID) {

    window.scrollTo(0, document.body.scrollHeight);

    // Get the objects we need to modify
    let updateCustomerForm = document.getElementById('update-customer-form');

    // Populate the update fields with the data from the table.
    document.getElementById("update-customer-fname").removeAttribute("disabled");
    document.getElementById("update-customer-lname").removeAttribute("disabled");
    document.getElementById("update-customer-email").removeAttribute("disabled");
    document.getElementById("update-customer-address").removeAttribute("disabled");
    document.getElementById("update-customer-phone").removeAttribute("disabled");

    const rowToUpdate = document.querySelector(`[data-value="${customerID}"]`);

    document.getElementById("update-customer-id").value = customerID;

    let customerFname = rowToUpdate.getElementsByClassName("customer-fname")[0].textContent;
    document.getElementById("update-customer-fname").value = customerFname;

    let customerLname = rowToUpdate.getElementsByClassName("customer-lname")[0].textContent;
    document.getElementById("update-customer-lname").value = customerLname;

    let customerEmail = rowToUpdate.getElementsByClassName("customer-email")[0].textContent;
    document.getElementById("update-customer-email").value = customerEmail;

    let customerAddress = rowToUpdate.getElementsByClassName("customer-address")[0].textContent;
    document.getElementById("update-customer-address").value = customerAddress;

    let customerPhone = rowToUpdate.getElementsByClassName("customer-phone")[0].textContent;
    document.getElementById("update-customer-phone").value = customerPhone;


    // Modify the objects we need
    updateCustomerForm.addEventListener("submit", function (event) {

        event.preventDefault();
        event.stopImmediatePropagation();

        // Get form fields we need to get data from
        let updateCustomerId = document.getElementById("update-customer-id");
        let updateCustomerFname = document.getElementById("update-customer-fname");
        let updateCustomerLname = document.getElementById("update-customer-lname");
        let updateCustomerEmail = document.getElementById("update-customer-email");
        let updateCustomerAddress = document.getElementById("update-customer-address");
        let updateCustomerPhone = document.getElementById("update-customer-phone");


        // Get the values from the form fields
        let updateCustomerIdValue = updateCustomerId.value;
        let updateCustomerFnameValue = updateCustomerFname.value;
        let updateCustomerLnameValue = updateCustomerLname.value;
        let updateCustomerEmailValue = updateCustomerEmail.value;
        let updateCustomerAddressValue = updateCustomerAddress.value;
        let updateCustomerPhoneValue = updateCustomerPhone.value;


        // Put our data we want to send in a Javascript object
        let data = {
            customer_id: updateCustomerIdValue,
            first_name: updateCustomerFnameValue,
            last_name: updateCustomerLnameValue,
            email: updateCustomerEmailValue,
            address: updateCustomerAddressValue,
            phone: updateCustomerPhoneValue
        }

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/update-customer", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // Add the new data to the table
                updateRow(xhttp.response, updateCustomerIdValue);
                alert(`Updated customer ${updateCustomerIdValue}`);
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

function updateRow(data, customerID) {
    let parsedData = JSON.parse(data);

    // Get the location of the row where we found the matching ID
    let updateRow = document.querySelector(`[data-value='${customerID}'`);

    // Reassign values in the table.
    let customerFname = updateRow.getElementsByClassName("customer-fname")
    customerFname[0].innerText = parsedData[0].first_name;

    let customerLname = updateRow.getElementsByClassName("customer-lname")
    customerLname[0].innerText = parsedData[0].last_name;

    let customerEmail = updateRow.getElementsByClassName("customer-email")
    customerEmail[0].innerText = parsedData[0].email;

    let customerAddress = updateRow.getElementsByClassName("customer-address")
    customerAddress[0].innerText = parsedData[0].address;

    let customerPhone = updateRow.getElementsByClassName("customer-phone")
    customerPhone[0].innerText = parsedData[0].phone;
}