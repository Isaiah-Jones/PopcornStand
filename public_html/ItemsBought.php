<?php
//**************************************************	
$username = $_GET["username"];   
// Connect to MySQL
	$db = mysqli_connect("lxsrv107.oru.edu", "Team5", "Internet-database5", "Team5");
	if (mysqli_connect_errno()) {
		print "Connect failed: " . mysqli_connect_error();
		exit();
	}
    //Select default database
    $default = mysqli_select_db($db, "Team5");
    if(!$default){
        print "Error - the default query could not be executed"; 
		mysqli_error();
		exit;
    }

 	//select all items being sold
	$query_select = "SELECT Inventory.Productname, Transaction.Quantity_bought as Quantity, Transaction.Cost, Transaction.Tax FROM Transaction INNER JOIN Inventory ON Transaction.Pid=Inventory.Pid WHERE Transaction.Buyer='$username';";

	$result = mysqli_query($db, $query_select);
	
	if (!$result) {
		print "Error - the SELECT query could not be executed" . 
		mysqli_error();
		exit;
    }
    
    $array = array();
    //Combine each row into one array
	while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
		$array[]= $row;
    }
			
		$db->close();

    $JSON =  json_encode($array);
    echo($JSON);
?>