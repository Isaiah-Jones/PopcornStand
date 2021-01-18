//******************************************************

function _(x) {
return document.getElementById(x);
}

//******************************************************

function PopulatePrimary() {
    UserID = // get this from somewhere
    
    var tstring;
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
	if (xhr.readyState == 4 && xhr.status == 200) {
	    var response_info = xhr.responseText;
	    
	    var the_div = _("the_spot");
	    
	    var jsonData = JSON.parse(response_info);
	    
	    rowCount = jsonData.length;
	    
	    if (rowCount > 0) {
		tstring  = "<table id=myTable class=mystuff>";
		tstring += "<tr><td class=\"mystuff\" name=\"something\" ";
		tstring +=      "onclick=callSomething()>Create Something</td></tr>";
		for (var i = 0; i < rowCount; i++) {
		    var rowdata = jsonData[i];
		    
		    somethingList[i] = new create_something(rowdata.first, folder.second);
		    tstring += "<tr><td class=\"something\" name=\""+somethingList[i].first;
		    tstring += "\" onclick=somethingSelected("+somethingList[i].second+")>";
		    tstring += somethingList[i].first+"</td></tr>";
		}
		tstring += "</table>";
		the_div.innerHTML = tstring;
	    }
	}
    }

    xhr.open("GET", "sample_sql.php?uid=" + UserID);
    xhr.send(null);
}
