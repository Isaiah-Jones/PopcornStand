var log = console.log.bind(console);
//******************************************************
function _(x) {
return document.getElementById(x);
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
function PasswordRecoveryREAL() {
	    log("inside password recovery REAL");
    //UserID = 1; // get this from somewhere
    Username = "Kev";
   
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
	var tstring;
	if (xhr.readyState == 4 && xhr.status == 200) {
	    var response_info = xhr.responseText;
	    //console.log(response_info);
	    var the_div = _("the_spot");
	    
	    var jsonData = JSON.parse(response_info);
	    
	    rowCount = jsonData.length;
	    
	    if (rowCount > 0) {
		tstring  = "<table id=myTable class=mystuff>";
		tstring += "<tr><th>Username</th><th>Password</th></tr>";
		for (var i = 0; i < rowCount; i++) {
		    var rowdata = jsonData[i];
		    
		    tstring += "<tr><td>" + rowdata.Username + "</td><td>" + rowdata.Password + "</td></tr>";
		}
		tstring += "</table>";
		the_div.innerHTML = tstring;
	    }
	}
    }

    console.log("calling the PHP");
    xhr.open("GET", "VIK1-1.php?username=" + Username);
    xhr.send(null);
}
