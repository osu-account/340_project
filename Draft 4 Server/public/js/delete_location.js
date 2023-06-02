// code for deleteLocation function using jQuery
// function deleteLocation(locationID) {
//     let link = "/delete-location-ajax/";
//     let data = {
//         locationID: locationID,
//     };

//     $.ajax({
//         url: link,
//         type: "DELETE",
//         data: JSON.stringify(data),
//         contentType: "application/json; charset=utf-8",
//         success: function (result) {
//             deleteRow(locationID);
//         },
//     });
// }

// code for deleteLocation using regular javascript/xhttp
function deleteLocation(locationID) {
    let data = {
        locationID: locationID
    };
    
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-location-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(locationID);
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    };

    xhttp.send(JSON.stringify(data));
}

function deleteRow(locationID){
    let table = document.getElementById("locations-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == locationID) {
            table.deleteRow(i);
            deleteDropDownMenu(locationID);
            break;
        }
    }
    window.location.reload();
}

function deleteDropDownMenu (locationID) {
    let selectMenu = document.getElementById("mySelect")
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(locationID)) {
            selectMenu[i].remove();
            break;
        }
    }
}
