<?php
//**************************************************	
    //Get values
    $username = $_GET["username"];
    $productname = $_GET["productname"];
	$quantity = $_GET["quantity"];
	$price = $_GET["price"];

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

 	//check if item already exists
	$query_select = "SELECT Sells.Price, Sells.Sid, Sells.Quantity FROM Inventory INNER JOIN Sells ON Inventory.Pid=Sells.Inventory_Pid WHERE Sells.Seller='$username' AND Inventory.Productname='$productname';";


	$result = mysqli_query($db, $query_select);
	
	if (!$result) {
		print "Error - the SELECT query could not be executed" . 
		mysqli_error();
		exit;
	}

	$product_exists = 0;//If 0 product does not exist

	$num_rows = mysqli_num_rows($result);
	$array = array();

	while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
		if ($num_rows == 0) {
			$product_exists = 0;
		} else {
			$product_exists++;
		}
		$array[]= $row;
	}

	$query_select_pid = "SELECT Owns.Inventory_Pid FROM Owns INNER JOIN Inventory ON Owns.Inventory_Pid=Inventory.Pid WHERE Owns.Owner='$username' AND Inventory.Productname='$productname';";

	$result = mysqli_query($db, $query_select_pid);
	if (!$result) {
		print "Error - the Select_Pid query could not be executed"; 
		echo($query_select_pid);
		mysqli_error();
		exit;
	}
	$result = mysqli_query($db, $query_select_pid);

	$row_select = mysqli_fetch_array($result);

	$Pid=$row_select[0];
	
	if (!$result) {
		print "Error - the SELECT query could not be executed" . 
		mysqli_error();
		exit;
	}

	$match_found = false;


	if($product_exists == 0){
		$query_insert = "INSERT INTO Sells VALUES(NULL, $Pid, '$username', $quantity, $price);";
		$result = mysqli_query($db, $query_insert);
		if (!$result) {
			print "Error - the query_insert query could not be executed"; 
			echo($query_insert);
			mysqli_error();
			exit;
		}

		echo("ok");
	}else{
		for($i = 0; $i < $product_exists; $i++){
			$PriceValue = $array[$i]['Price'];
			if($price == $PriceValue){
				$Sell_Quantity = $array[$i]['Quantity'];
				$Sid = $array[$i]['Sid'];
				$query_update = "UPDATE Sells SET Quantity = ($Sell_Quantity + $quantity) WHERE Sid=$Sid";
	
				$result = mysqli_query($db, $query_update);
				if (!$result) {
					print "Error - the update sells query could not be executed"; 
					echo($query_update);
					mysqli_error();
					exit;
				}
				echo("ok");
				$match_found = true;
			}
		}
		if($match_found == false){
			$query_insert = "INSERT INTO Sells VALUES(NULL, $Pid, '$username', $quantity, $price);";
			$result = mysqli_query($db, $query_insert);
			if (!$result) {
				print "Error - the query_insert query could not be executed"; 
				echo($query_insert);
				mysqli_error();
				exit;
			}
	
			echo("ok");
		}
	}

	

	
    $db->close();
?>