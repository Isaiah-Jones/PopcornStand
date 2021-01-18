var log = console.log.bind(console);

function _(x) {
return document.getElementById(x);
}

function ConsoleLogData(name, value) {
    console.log(name + ": " + value);
}

//******************************************************
function ValidateData() {
   // UserID = 1; // get this from somewhere
    //Declare variables
	var firstname = document.getElementsByName("firstname")[0].value;
    var lastname = document.getElementsByName("lastname")[0].value;
	var username = document.getElementsByName("username")[0].value;
	var email = document.getElementsByName("email")[0].value;
	var pw1 = document.getElementsByName("pw1")[0].value;
    var reminder = document.getElementsByName("reminder")[0].value;
	var accountfund = document.getElementsByName("accountfund")[0].value;

    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
	var tstring;
	if (xhr.readyState == 4 && xhr.status == 200) {
	    var rc = xhr.responseText;
	    console.log("rc" + rc);
	    var the_div = _("the_spot");
	    
		if (rc == "ok" ){
			console.log("Success");
		}else {
			console.log("Failure");
			
		}
	      
	}
    }

    console.log("calling the PHP");
    xhr.open("GET", "VIK-PHP/VIK1-1.php?firstname=" + firstname + "&lastname=" + lastname+ "&username=" +username +  "&email=" + email + "&pw1=" + pw1 + "&reminder=" + reminder + "&accountfund=" + accountfund );
    xhr.send(null);
}
//ValidateData();
//******************************************************



function PasswordRecovery() {
    log("inside password recovery");

    var username = document.getElementsByName("username")[0].value;
    var reminder = document.getElementsByName("reminder")[0].value;

    if (username == "1") {

        alert("Wrong username. Enter username again.");
        document.getElementById('PasswordRecovery').reset();
        return false;
    }

    /* Successful */
    if (username.length >= 3 && reminder.length >= 3) {
        alert("Your password is \"Password\"");
        window.location.replace("StartHere-LoginScreen.html");
        return false;
    }

}

function PlaceholderAddInventory() {
    alert("Item added!");
    document.getElementById('AddInventory').reset();
}

function CheckLogin() {
    log("Inside checklogin");

    var username = document.getElementsByName("username")[0].value;
    var password = document.getElementsByName("password")[0].value;

    log(username);
    //successful
    if (username == "1" && password == "1") {
        window.location.href = "ExchangeScreen.html";
    }
    //unsuccessful
    else if (username == "2" && password == "2") {
        alert("The username or password you entered is incorrect. Please try again.");
        return false;
    }
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

function QuantityDropdown() {
    //Get quantity from database
    //testing
    var quantity = [3, 2, 5, 1];
    var txtString;
    var dropdown = document.getElementsByName("PQuantitySelect");
    for (var i = 0; i < dropdown.length; i++) {
        //remove name - its for testing only
        //rework dropbox identifcation system for database
        txtString = "<select name = " + i + " onfocus=\"RememberQuantity(this.value)\" onblur=\"UpdateTotal(this.name, this.value)\"> ";
        txtString += "<option value = " + "0" + ">" + "0" + "</option>";
        for (var j = 1; j <= quantity[i]; j++) {
            txtString += "<option value = " + j + ">" + j + "</option>";
        }
        txtString += "</select>";
        dropdown[i].innerHTML = txtString;
    }
}
var previousValue;
var CartTotal = 0;
function UpdateTotal(test_name, quantity) {
    //get price from database
    //rework dropbox identifcation system for database
    var price = [12.99, 10.99, 25.99, 20.99];
    var total = document.getElementById("TotalCart");

    if(previousValue == 0){
        CartTotal = CartTotal + (quantity * price[test_name]);
        total.innerHTML = "$" + CartTotal;
    }
    else{
        CartTotal = CartTotal - (previousValue * price[test_name]);
        CartTotal = CartTotal + (quantity * price[test_name]);
        total.innerHTML = "$" + CartTotal;
    }//Theres some weird issues with subracting everything being a dollar or two off, it might have to do with base 2 numbers or not
}

function RememberQuantity(value){
    previousValue = value;
}