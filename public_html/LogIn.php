 <?php
//**************************************************	
//Login
	$username = $_GET["username"];
	$password = $_GET["pw"];

	// Connect to MySQL
	$db = mysqli_connect("lxsrv107.oru.edu", "Team5", "Internet-database5", "Team5");
	if (mysqli_connect_errno()) {
		print "Connect failed: " . mysqli_connect_error();
		exit();
	}

	// Submit the query to insert the new user
	$query = "select Username FROM `Team5`.`User` WHERE Username = \"$username\" AND Password = \"$password\";";

	$result = mysqli_query($db, $query);
	if (!$result) {
		print "Error - the query could not be executed"; 
		mysqli_error();
		exit;
	}
	
	
	$db->close();
	
	// Get the number of rows in the result
	$num_rows = mysqli_num_rows($result);
	
	if ($num_rows == 0) {
		$rcode = "no";
	} else {
		$row = mysqli_fetch_array($result);

		$rcode=$row[0];
	}
	

	echo $rcode;

?>