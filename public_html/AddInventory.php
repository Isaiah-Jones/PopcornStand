<html>
<head>
    <title> Add Inventory </title>
    <h1>Add Inventory</h1>
    <hr>

    <meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="MainStyles.css">
</head>
<body>
<div id="grad1">

<?php
//**************************************************	
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

    //Get values
    $username = $_GET["Uname"];
    $productname = $_GET["productname"];
    $description = $_GET["description"];
    $quantity = $_GET["quantity"];

 	//check if item already exists
	$query_select = "SELECT Inventory.Productname, Owns.Inventory_Pid, Owns.Quantity FROM Inventory INNER JOIN Owns ON Inventory.Pid=Owns.Inventory_Pid WHERE Owns.Owner='$username';";

	$result = mysqli_query($db, $query_select);
	
	if (!$result) {
		print "Error - the SELECT query could not be executed" . 
		mysqli_error();
		exit;
	}

	//loop through and check for existing product, if exists, add to quantity

	$item_exists = false;

	while($row = mysqli_fetch_array($result, MYSQLI_NUM)) {
		if($row[0]==$productname){
			//var_dump($row);
			//^^^^This line will show you exactly whats in the array
			$query_update = "UPDATE Owns SET Quantity = Quantity + $quantity WHERE Inventory_Pid=$row[1];";
			$totalquantity= $row[2]+$quantity;
			if (mysqli_query($db, $query_update)) {
				echo("<p>Added $quantity to your stock of $row[0], bringing it to a total of $totalquantity</p>");
				$item_exists = true;
			} else {
				echo "Error - the UPDATE query could not be executed" . 
				mysqli_error();
				exit;
			}
		}
	}

	if(!$item_exists){
		// query to insert the item into inventory
		$query_insert_inventory = "INSERT INTO Inventory VALUES (NULL, '$productname', '$description');";

		if (mysqli_query($db, $query_insert_inventory)) {
			//find the productID
			$pid = mysqli_insert_id($db);

			//Insert item into Owns table
			$query_insert_owns = "INSERT INTO Team5.Owns VALUES (NULL, $pid, '$username', $quantity);";
			
			if(mysqli_query($db, $query_insert_owns)){
				echo("<p>Added $quantity units of $productname to your inventory</p>");
			}else{
				echo "Error - the INSERT OWNS query could not be executed" . 
				mysqli_error();
				exit;
			}
			
		} else {
			echo "Error - the INSERT INVENTORY query could not be executed" . 
			mysqli_error();
			exit;
		}
	}
			
    $db->close();
?>
<a href="AddInventory.html" class="button">Return</a>
</div>
</body>
</html>