<?php
//**************************************************	
//Password Recovery
	$username = $_GET["username"];
	$reminder = $_GET["reminder"];

	// Connect to MySQL
	$db = mysqli_connect("lxsrv107.oru.edu", "Team5", "Internet-database5", "Team5");
	if (mysqli_connect_errno()) {
		print "Connect failed: " . mysqli_connect_error();
		exit();
	}

	// Submit the query to insert the new user
	$query = "select * FROM `Team5`.`Inventory`;";

	$result = mysqli_query($db, $query);
	if (!$result) {
		print "Error - the query could not be executed" . 
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
	

	echo "$rcode rows in Inventory = $num_rows - <br/> ";

?>

<?php
//**************************************************	
//Password Recovery
	$username = $_GET["username"];
	$reminder = $_GET["reminder"];

	// Connect to MySQL
	$db = mysqli_connect("lxsrv107.oru.edu", "Team5", "Internet-database5", "Team5");
	if (mysqli_connect_errno()) {
		print "Connect failed: " . mysqli_connect_error();
		exit();
	}

	// Submit the query to insert the new user
	$query = "select * FROM `Team5`.`sells`;";

	$result = mysqli_query($db, $query);
	if (!$result) {
		print "Error - the query could not be executed" . 
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
	
	echo "$rcode rows in Sells = $num_rows - <br/> ";
	
?>

<?php
//**************************************************	
//Password Recovery
	$username = $_GET["username"];
	$reminder = $_GET["reminder"];

	// Connect to MySQL
	$db = mysqli_connect("lxsrv107.oru.edu", "Team5", "Internet-database5", "Team5");
	if (mysqli_connect_errno()) {
		print "Connect failed: " . mysqli_connect_error();
		exit();
	}

	// Submit the query to insert the new user
	$query = "select * FROM `Team5`.`owns`;";

	$result = mysqli_query($db, $query);
	if (!$result) {
		print "Error - the query could not be executed" . 
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
	
	echo "$rcode rows in Owns = $num_rows - <br/> ";
?>

<?php
//**************************************************	
//Password Recovery
	$username = $_GET["username"];
	$reminder = $_GET["reminder"];

	// Connect to MySQL
	$db = mysqli_connect("lxsrv107.oru.edu", "Team5", "Internet-database5", "Team5");
	if (mysqli_connect_errno()) {
		print "Connect failed: " . mysqli_connect_error();
		exit();
	}

	// Submit the query to insert the new user
	$query = "select * FROM `Team5`.`Transaction`;";

	$result = mysqli_query($db, $query);
	if (!$result) {
		print "Error - the query could not be executed" . 
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
	
	echo "$rcode rows in Transaction = $num_rows - <br/> ";
?>


<?php
//**************************************************	
//Password Recovery
	$username = $_GET["username"];
	$reminder = $_GET["reminder"];

	// Connect to MySQL
	$db = mysqli_connect("lxsrv107.oru.edu", "Team5", "Internet-database5", "Team5");
	if (mysqli_connect_errno()) {
		print "Connect failed: " . mysqli_connect_error();
		exit();
	}

	// Submit the query to insert the new user
	$query = "select * FROM `Team5`.`User`;";

	$result = mysqli_query($db, $query);
	if (!$result) {
		print "Error - the query could not be executed" . 
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
	
	echo "$rcode rows in USer = $num_rows - <br/> ";
?>