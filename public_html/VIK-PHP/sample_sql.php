<?php
//**************************************************	
//Password Recovery
	$Username = $_GET["Username"];

	// Connect to MySQL
	$db = mysqli_connect("lxsrv107.oru.edu", "db_username", "db_passwd", "DBname");
	if (mysqli_connect_errno()) {
		print "Connect failed: " . mysqli_connect_error();
		exit();
	}

	// Submit the query for the list of folders
	$query = "select something, somethingElse from someTable WHERE UserId=$uid";

	$result = mysqli_query($db, $query);
	$db->close();

	if (!$result) {
		print "Error - the query could not be executed" . 
		mysqli_error();
		exit;
	}

//**************************************************	

	$num_rows = mysqli_num_rows($result);

	$myarray = array();

	// If there are rows in the result, put them in an HTML table
	if ($num_rows > 0) {    // output data of each row
		$index = 0;
		while($row = $result->fetch_assoc()) {
			$x = new stdClass();
			// names are what you want to use; but the indexes are from the DB
			$x->first = $row["something"];
			$x->second = $row["somethingElse"];
			
			$myarray[$index] = $x;
			
			$index = $index + 1;
		}
		
		$responseJSON = json_encode($myarray);
	} else {
		// no folders for this user; that'd be wierd
		$responseJSON = json_encode("");
	}

	echo $responseJSON;
?>

