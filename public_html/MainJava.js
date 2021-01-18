var log = console.log.bind(console);

function _(x) {
    return document.getElementById(x);
}

function ConsoleLogData(name, value) {
    console.log(name + ": " + value);
}

//******************************************************
//START Create Account JS

function CheckPw() {
    //	log("inside CheckPw");
    var pw1 = document.getElementById("pw1");
    var pw2 = document.getElementById("pw2");
    log("pw2: " + pw2.value);
    if (pw1.value != pw2.value) {
        alert("pw1 is not the same as pw2.");
        pw2.value = "";
    } else if (pw1 == pw2) {
        log("Pw1 & Pw2 are correct.");
    }

}


function ValidateData() {
    // UserID = 1; // get this from somewhere
    //Declare variables
    var firstname = document.getElementsByName("firstname")[0].value;
    var lastname = document.getElementsByName("lastname")[0].value;
    var username = document.getElementsByName("username")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var pw1 = document.getElementsByName("pw1")[0].value;
    var pw2 = document.getElementsByName("pw2")[0].value;
    var reminder = document.getElementsByName("reminder")[0].value;
    var accountfund = document.getElementsByName("accountfund")[0].value;


    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // will get a response as to whether the user id is available; if so, do nothing
            // if not, then print error message and send focus back to user name field

            var result = xhr.responseText;

            if (result == "INSERTFAIL") {
                alert("That Username is taken, please try another.");

            } else {

                alert("Success - You will be redirected to login.");
                window.location.href = "http://lxsrv107.oru.edu/~Team5/StartHere-LoginScreen.html";
            }
        }
    }

    console.log("calling the PHP");
    xhr.open("GET", "CreateAccount.php?firstname=" + firstname + "&lastname=" + lastname + "&username=" + username + "&email=" + email + "&pw1=" + pw1 + "&reminder=" + reminder + "&accountfund=" + accountfund);
    xhr.send(null);
}
//END Create Account JS
//******************************************************



function PasswordRecovery() {
    log("inside password recovery");

    var username = document.getElementsByName("username")[0].value;
    var reminder = document.getElementsByName("reminder")[0].value;

    // get the headers; the load up the text of the most recent email
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // will get a response as to whether the user id is available; if so, do nothing
            // if not, then print error message and send focus back to user name field

            var result = xhr.responseText;

            if (result == " no") {
                alert("Unrecognized user or wrong password");

            } else {
                // Success; go to primary page with the userid
                //console.log("userid returned is: "+result);
                alert(result);
            }
        }
    }

    xhr.open("GET", "PasswordRecovery.php? username=" + username + "&reminder=" + reminder);
    xhr.send(null);

}

function PlaceholderAddInventory() {
    alert("Item added!");
    document.getElementById('AddInventory').reset();
}

function CheckLogin() {
    log("Inside checklogin");

    // get uname from the field
    var username = document.getElementsByName("username")[0].value;
    var pw = document.getElementsByName("password")[0].value;





    // get the headers; the load up the text of the most recent email
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // will get a response as to whether the user id is available; if so, do nothing
            // if not, then print error message and send focus back to user name field

            var result = xhr.responseText;

            if (result == " no") {
                alert("Unrecognized user or wrong password");

            } else {
                // Success; go to primary page with the userid
                //console.log("userid returned is: "+result);
                window.location.href = "http://lxsrv107.oru.edu/~Team5/ExchangeScreen.html?Username=" + result;
                document.cookie = "username=" + result;
            }
        }
    }

    xhr.open("GET", "LogIn.php? username=" + username + "&pw=" + pw);
    xhr.send(null);

    log(username);
    //successful
    /*if (username == "1" && password == "1") {
        window.location.href = "ExchangeScreen.html";
    }
    //unsuccessful
    else if (username == "2" && password == "2") {
        alert("The username or password you entered is incorrect. Please try again.");
        return false;
    } */
}


function LogAllInfo() {
    log("inside LogAllInfo");
    // CONSOLE LOGS
    var firstname = document.getElementsByName("firstname")[0].value;
    var lastname = document.getElementsByName("lastname")[0].value;
    var username = document.getElementsByName("username")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var pw1 = document.getElementsByName("pw1")[0].value;
    var reminder = document.getElementsByName("reminder")[0].value;
    var accountfund = document.getElementsByName("accountfund")[0].value;
    log(firstname, "\n" + lastname, "\n" + username, "\n" + email, "\n" + pw1, "\n" + reminder, "\n", + accountfund);
}

function getCookie(cname) {//Credit to https://www.w3schools.com/js/js_cookies.asp
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/* ******************** START Exchange Page******************** */
var INVENTORY;

function UserInfo() {
    var username = getCookie("username");
    var Uname = document.getElementById("Uname");
    var RmBalance = document.getElementById("RmBalance");

    Uname.value = username;//set the username

    var xhr = new XMLHttpRequest();//find the remaining balance
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            var result = xhr.responseText;
            RmBalance.value = result; //Set the remaining balance
        }
    }

    xhr.open("GET", "RmBalance.php? username=" + username);
    xhr.send(null);
}

var selected_object_row;
var selected_object_quantity;

function DoTransaction() {
    var username = getCookie("username");
    var RmBalance = document.getElementById("RmBalance").value;

    try {
        var sid = INVENTORY[selected_object_row].Sid;
        var quantity = selected_object_quantity;
        log(sid + " " + quantity);
        if (!(sid >= 0) || !(quantity > 0)) {
            alert("Please select something to buy");
            return;
        }
    } catch (err) {
        log(sid + " " + quantity);
        alert("-Please select something to buy-");
        return;
    }

    if (!(RmBalance > CartTotal)) {
        log(RmBalance + " " + CartTotal);
        alert("You do not have enough funds.");
        return;
    }


    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // will get a response as to whether the user id is available; if so, do nothing
            // if not, then print error message and send focus back to user name field

            var result = xhr.responseText;

            if (result == "Success") {
                alert("Success!");
                window.location.href = "ExchangeScreen.html";

            } else {
                // Success; go to primary page with the userid
                //console.log("userid returned is: "+result);
                alert("Failure: " + result);
            }
        }
    }

    xhr.open("GET", "Transaction.php?username=" + username + "&sid=" + sid + "&quantity=" + quantity);
    xhr.send(null);
}

function LoadInventory() {
    log("Inside LoadInventory");
    UserInfo();

    var table = "";
    // find the items for sale and display them
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            var result = xhr.responseText;
            INVENTORY = JSON.parse(result);
            table += "<table> <tbody> <tr id=\"TableHeader\"> <th> ProductName </th>";
            table += "<th> Price </th> <th> Quantity </th> <th> Description </th> <th>Add to cart</th></tr>";

            for (var i = 0; i < INVENTORY.length; i++) {
                table += "<tr> <td> <div class=\"Product\" name=\"PName\">" + INVENTORY[i].Productname + "</div></td>";
                table += "<td> <div class=\"Product\" name=\"PPrice\">" + INVENTORY[i].Price + "</div> </td>";
                table += "<td><div class=\"Product\" name=\"PQuantity\">" + INVENTORY[i].Quantity + "</div></td>";
                table += "<td> <textarea id=\"PDescription\" readonly>" + INVENTORY[i].Description + "</textarea> </td>";
                table += "<td><div class=\"PQuantitySelect\"><select name =\"dropdown\" id=\"" + i + "\" onfocus=\"RememberQuantity(this.value)\" onblur=\"UpdateTotal(this.id, this.value)\">";
                table += "<option value = " + "0" + ">" + "0" + "</option>";
                for (var j = 1; j <= INVENTORY[i].Quantity; j++) {
                    table += "<option value = " + j + ">" + j + "</option>";
                }
                table += "</select>";
                table += "</div><br></td></tr>";
            }
            table += "</tbody></table>";
            log(INVENTORY);
            document.getElementById("TableFill").innerHTML = table;
        }
    }

    xhr.open("GET", "ExchangeScreen.php");
    xhr.send(null);
}

var previousValue;
var CartTotal = 0;

function UpdateTotal(id, quantity) {

    var total = document.getElementById("OrderTotal");
    var dropdown = document.getElementsByName("dropdown");

    if (previousValue == 0 && quantity != 0) {

        if (document.getElementById("Uname").value != INVENTORY[id].Seller) {
            CartTotal = CartTotal + (quantity * INVENTORY[id].Price);
            document.getElementById("YouOwn").innerHTML = "";
        } else {
            document.getElementById("YouOwn").innerHTML = "You own this!";
        }
        total.value = CartTotal;


    }
    else {

        if (document.getElementById("Uname").value != INVENTORY[id].Seller) {
            document.getElementById("YouOwn").innerHTML = "";
            CartTotal = CartTotal - (previousValue * INVENTORY[id].Price);
            CartTotal = CartTotal + (quantity * INVENTORY[id].Price);

        } else {
            document.getElementById("YouOwn").innerHTML = "You own this!";
        }
        total.value = CartTotal;

    }//Theres some weird issues with subracting everything being a dollar or two off, it might have to do with base 2 numbers or not
    selected_object_row = id;
    selected_object_quantity = quantity;
    for (var p = 0; p < dropdown.length; p++) {
        dropdown[p].disabled = true;
    }
    document.getElementById(id).disabled = false;

    if (document.getElementById(id).value == 0) {
        for (var p = 0; p < dropdown.length; p++) {
            dropdown[p].disabled = false;
        }
    }
}

function RememberQuantity(value) {
    previousValue = value;
}

/* ************END Exchange Page************ */

function LoadSold() {
    UserInfo();

    var ItemsSold;
    var table = "";
    var username = getCookie("username");
    // find the items for sale and display them
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            var result = xhr.responseText;
            ItemsSold = JSON.parse(result);
            table += "<h2> Items Sold </h2> <table> <tbody> <tr id=\"TableHeader\"> <th> ProductName </th>";
            table += "<th> Quantity </th> <th> Cost Per Unit</th> <th>Total</th></tr>";

            for (var i = 0; i < ItemsSold.length; i++) {
                table += "<tr> <td> <div class=\"Product\" name=\"PName\">" + ItemsSold[i].Productname + "</div></td>";
                table += "<td> <div class=\"Product\" name=\"PQuantity\">" + ItemsSold[i].Quantity + "</div> </td>";
                table += "<td><div class=\"Product\" name=\"PCostPer\">$" + (ItemsSold[i].Cost / ItemsSold[i].Quantity) + "</div></td>";
                table += "<td><div class=\"Product\" name=\"PTotal\">$" + ItemsSold[i].Cost + "</div></td>";
                table += "</tr>";
            }
            table += "</tbody></table><hr>";
            log(ItemsSold);
            document.getElementById("TableSold").innerHTML = table;
        }
    }

    xhr.open("GET", "ItemsSold.php?username=" + username);
    xhr.send(null);

    LoadAccountInventory();
    LoadBought();
}

function LoadAccountInventory() {

    var AccountInventory;
    var table = "";
    var username = getCookie("username");
    // find the items for sale and display them
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            var result = xhr.responseText;
            AccountInventory = JSON.parse(result);
            table += "<h2> Inventory </h2> <table> <tbody> <tr id=\"TableHeader\"> <th> ProductName </th>";
            table += "<th> Quantity </th> <th> Description </th></tr>";

            for (var i = 0; i < AccountInventory.length; i++) {
                table += "<tr> <td> <div class=\"Product\" name=\"PName\">" + AccountInventory[i].Productname + "</div></td>";
                table += "<td> <div class=\"Product\" name=\"PQuantity\">" + AccountInventory[i].Quantity + "</div> </td>";
                table += "<td><div class=\"Product\" name=\"PDescription\">" + AccountInventory[i].Description + "</div></td>";
                table += "</tr>";
            }
            table += "</tbody></table><hr>";
            log(AccountInventory);
            document.getElementById("TableInventory").innerHTML = table;
        }
    }

    xhr.open("GET", "AccountInventory.php?username=" + username);
    xhr.send(null);
}

function LoadBought() {
    var ItemsBought;
    var table = "";
    var username = getCookie("username");
    // find the items for sale and display them
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            var result = xhr.responseText;
            ItemsBought = JSON.parse(result);
            table += "<h2> Items Bought </h2> <table> <tbody> <tr id=\"TableHeader\"> <th> ProductName </th>";
            table += "<th> Quantity </th> <th> Cost Per Unit</th> <th>Tax</th> <th>Total</th></tr>";

            for (var i = 0; i < ItemsBought.length; i++) {
                table += "<tr> <td> <div class=\"Product\" name=\"PName\">" + ItemsBought[i].Productname + "</div></td>";
                table += "<td> <div class=\"Product\" name=\"PQuantity\">" + ItemsBought[i].Quantity + "</div> </td>";
                table += "<td><div class=\"Product\" name=\"PCostPer\">$" + (ItemsBought[i].Cost / ItemsBought[i].Quantity) + "</div></td>";
                table += "<td><div class=\"Product\" name=\"PTax\">$" + ItemsBought[i].Tax + "</div></td>";
                table += "<td><div class=\"Product\" name=\"PTotal\">$" + (Number(ItemsBought[i].Cost) + Number(ItemsBought[i].Tax)) + "</div></td>";
                table += "</tr>";
            }
            table += "</tbody></table><hr>";
            log(ItemsBought);
            document.getElementById("TableBought").innerHTML = table;
        }
    }

    xhr.open("GET", "ItemsBought.php?username=" + username);
    xhr.send(null);
}
var CurrentlySelling;

function LoadCurrentlySelling() {
    var table = "";
    var username = getCookie("username");
    // find the items for sale and display them
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            var result = xhr.responseText;
            CurrentlySelling = JSON.parse(result);
            table += "<h2> Currently Selling </h2> <table> <tbody> <tr id=\"TableHeader\"> <th> ProductName </th>";
            table += "<th> Quantity </th> <th> Cost Per Unit</th> </tr>";

            for (var i = 0; i < CurrentlySelling.length; i++) {
                table += "<tr> <td> <div class=\"Product\" name=\"PName\">" + CurrentlySelling[i].Productname + "</div></td>";
                table += "<td> <div class=\"Product\" name=\"PQuantity\">" + CurrentlySelling[i].Quantity + "</div> </td>";
                table += "<td><div class=\"Product\" name=\"PCostPer\">$" + CurrentlySelling[i].Cost + "</div></td>";
                table += "</tr>";
            }
            table += "</tbody></table><hr>";
            log(CurrentlySelling);
            document.getElementById("CurrentlySelling").innerHTML = table;
            LoadSell();
        }
        
    }

    xhr.open("GET", "CurrentlySelling.php?username=" + username);
    xhr.send(null);
}

function LoadSell() {
    var AccountInventory;
    var table = "";
    var username = getCookie("username");
    // find the items for sale and display them
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            var result = xhr.responseText;
            AccountInventory = JSON.parse(result);
            table += "<table> <tbody> <tr id=\"TableHeader\"> <th> ProductName </th>";
            table += "<th> Description </th><th> Quantity Available to Sell</th> <th>Quantity to Sell</th><th>Price per unit</th></tr>";
            
            for (var i = 0; i < AccountInventory.length; i++) {
                for(var a = 0; a < CurrentlySelling.length; a++){
                    if(AccountInventory[i].Productname==CurrentlySelling[a].Productname){
                        AccountInventory[i].Quantity-=CurrentlySelling[a].Quantity;
                    }
                }
                table += "<tr> <td> <div class=\"Product\" name=\"PName\">" + AccountInventory[i].Productname + "</div></td>";
                table += "<td><div class=\"Product\" name=\"PDescription\">" + AccountInventory[i].Description + "</div></td>";
                table += "<td> <div class=\"Product\" name=\"PQuantity\">" + AccountInventory[i].Quantity + "</div> </td>";     
                table += "<td><div class=\"PQuantitySelect\"><select name =\"dropdown\" id=\"" + i + "\" onblur=\"QuantitySell(this.id)\">";
                table += "<option value = " + "0" + ">" + "0" + "</option>";
                for (var j = 1; j <= AccountInventory[i].Quantity; j++) {
                    table += "<option value = " + j + ">" + j + "</option>";
                }
                table += "</select>";
                table += "<td> <div class=\"Product\" name=\"PSetPrice\"><input type=\"number\" placeholder=\"$0.00\" name=\"price\" required min=\"0\" step=\.01\" onblur=\"ConsoleLogData(this.name, this.value)\"></div></td>";
                table += "</div></td></tr>";
            }
            table += "</tbody></table><hr>";
            log(AccountInventory);
            document.getElementById("TableInventory").innerHTML = table;
        }
    }

    xhr.open("GET", "AccountInventory.php?username=" + username);
    xhr.send(null);
}

function QuantitySell(id) {

    var dropdown = document.getElementsByName("dropdown");

    for (var p = 0; p < dropdown.length; p++) {
        dropdown[p].disabled = true;
    }
    document.getElementById(id).disabled = false;

    if (document.getElementById(id).value == 0) {
        for (var p = 0; p < dropdown.length; p++) {
            dropdown[p].disabled = false;
        }
    }
}

function SellSomething() {

    var username = getCookie("username");
    var id;

    var dropdown = document.getElementsByName("dropdown");
    for(var q = 0; q < dropdown.length; q++){
        if(dropdown[q].value != 0){
            id = q;
        }
    }

    if(id == null){
        alert("Please choose the quantity to sell of one product.");
        return;
    }

    var productname = document.getElementsByName("PName")[id].innerHTML;
    var price = document.getElementsByName("price")[id].value;
    var quantity = document.getElementsByName("dropdown")[id].value;

    if(price == ""){
        alert("Please choose a price for the chosen product");
        return;
    }

    log(productname + " " + price + " " +quantity + " Username: " + username);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;

            if (result == "ok") {
                
                alert("Item Successfully Registered");
                window.location.href = "SomethingToSell.html";

            } else {
                alert("FAILURE: " + result);
                window.location.href = "SomethingToSell.html";
            }
        }
    }

    xhr.open("GET", "SomethingToSell.php?username=" + username + "&productname=" + productname + "&price=" + price + "&quantity=" + quantity);
    xhr.send(null);

}