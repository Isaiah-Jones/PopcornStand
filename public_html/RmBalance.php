<?php
//**************************************************	
    $username = $_GET["username"];

	// Connect to MySQL
	$db = mysqli_connect("lxsrv107.oru.edu", "Team5", "Internet-database5", "Team5");
	if (mysqli_connect_errno()) {
		print "Connect failed: " . mysqli_connect_error();
		exit();
	}

	// Submit the query to find balance
	$query = "SELECT Balance FROM Team5.User WHERE Username='$username';";

	$result = mysqli_query($db, $query);
	if (!$result) {
		print "Error - the query could not be executed"; 
		mysqli_error();
		exit;
	}
	
	
	$db->close();
	

	$row = mysqli_fetch_array($result);

	$rcode=$row[0];
	
	

	echo $rcode;
?>