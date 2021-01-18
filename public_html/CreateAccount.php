<?php
	// Get form data values

      $firstname = $_GET["firstname"];
      $lastname = $_GET["lastname"];
	  $username = $_GET["username"];
      $email = $_GET["email"];
	  $pw1 = $_GET["pw1"];
	  $reminder = $_GET["reminder"];
      $accountfund = $_GET["accountfund"];
	
	
    // Connect to MySQL
    //server,user, PW, DB
    $db = mysqli_connect("lxsrv107.oru.edu", "Team5", "Internet-database5", "Team5");
	if (mysqli_connect_errno()) {
	print "Connect failed: " . mysqli_connect_error();
	exit();
    }

    if (!$db) {
	echo "Error: Unable to connect to MySQL." . PHP_EOL;
	echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
	exit();
    }

	//DB: Uname, Fname, Lname, Email, Balance, Pw, Hint
$query = "INSERT INTO Team5.User VALUES ('$username', '$firstname', '$lastname', '$email', $accountfund, '$pw1', '$reminder');";

	
    $result = mysqli_query($db, $query);
    $db->close();

	if (!$result) {
		echo("INSERTFAIL");
		mysqli_error();
		exit;
	}
?>
