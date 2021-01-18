<?php
//**************************************************	
//Login
	$buyer = $_GET["username"];
    $Sid = $_GET["sid"];
    $quantity = $_GET["quantity"];

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


    //Find the quantity of own
    $query = "SELECT Owns.Quantity as Own_Quantity, Sells.Quantity as Sell_Quantity, Sells.Seller, Owns.Inventory_Pid as Pid, Sells.Price FROM Owns INNER JOIN Sells ON Owns.Inventory_Pid=Sells.Inventory_Pid WHERE Sid=$Sid AND Owns.Owner=Sells.Seller;";
    
    $result = mysqli_query($db, $query);

    if (!$result) {
        print "Error - the main select query could not be executed"; 
        echo($query);
        mysqli_error();
        exit;
    }

    $array = array();
    //Combine each row into one array
	while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
		$array[]= $row;
    }


  //  var_dump($array);
    $Sell_Quantity = $array[0]['Sell_Quantity'];
    $Own_Quantity = $array[0]['Own_Quantity'];
    $Seller = $array[0]['Seller'];
    $Pid = $array[0]['Pid'];
    $Price = $array[0]['Price'];

   
     //check if buyer owns product
     $query = "SELECT Quantity FROM Owns WHERE Inventory_Pid=$Pid AND Owner='$buyer';";

     
     $result = mysqli_query($db, $query);
     if (!$result) {
         print "Error - the quantity select query could not be executed"; 
         echo($query);
         mysqli_error();
         exit;
     }

    $num_rows = mysqli_num_rows($result);
    
    $buyer_already_owns;
    
	if ($num_rows == 0) {
		$buyer_already_owns = 0;
	} else {
		$rowtwo = mysqli_fetch_array($result);

		$buyer_already_owns=$rowtwo[0];
	}

    
    if($Sell_Quantity == $quantity){//if sells_quantity = quantity
        //Delete sells row
        $query = "DELETE FROM Sells WHERE Sid=$Sid;";
            $result = mysqli_query($db, $query);
            if (!$result) {
                print "Error - the delete sell row query could not be executed"; 
                echo($query);
                mysqli_error();
                exit;
            }
    }else{ //else (sell_quantity > quantitity)
       
        //Update sells row - quantity
        $query = "UPDATE Sells SET Quantity = ($Sell_Quantity - $quantity) WHERE Sid=$Sid;";
          $result = mysqli_query($db, $query);
          if (!$result) {
              print "Error - the update sell query could not be executed"; 
              echo($query);
              mysqli_error();
              exit;
          }
    }

    
    if($Seller != $buyer){//if seller != buyer
        if($Own_Quantity == $quantity){//if own_quantity = quantity{
            //delete own row
            $query = "DELETE FROM Owns WHERE Inventory_Pid=$Pid AND Owner='$Seller';";
            $result = mysqli_query($db, $query);
            if (!$result) {
                print "Error - the delete own query could not be executed"; 
                echo($query);
                mysqli_error();
                exit;
            }
            
            
        }else{//else (if own_quantity > quantity)
            //update own seller row - quantity
            $query = "UPDATE Owns SET Quantity = ($Own_Quantity - $quantity) WHERE Inventory_Pid=$Pid AND Owner='$Seller';";
            $result = mysqli_query($db, $query);
            if (!$result) {
                print "Error - the update seller own query could not be executed"; 
                echo($query);
                mysqli_error();
                exit;
            }
        }
        
        if($buyer_already_owns == 0){//if buyer does not own any
            //insert owns quantity
            $query = "INSERT INTO Owns VALUES (NULL, $Pid, '$buyer', $quantity);";
            $result = mysqli_query($db, $query);
            if (!$result) {
                print "Error - the insert buyer own query could not be executed"; 
                echo($query);
                mysqli_error();
                exit;
            }
        }else{
            //update own buyer row + quantity
            $query = "UPDATE Owns SET Quantity = ($buyer_already_owns + $quantity) WHERE Inventory_Pid=$Pid AND Owner='$buyer';";
            $result = mysqli_query($db, $query);
            if (!$result) {
                print "Error - the update buyer own query could not be executed"; 
                echo($query);
                mysqli_error();
                exit;
            }
        }



        //insert trransaction quantity, cost, seller, Pid
        $query = "INSERT INTO Transaction VALUES (NULL, $quantity, ($Price * $quantity), DEFAULT, '$Seller', '$buyer', $Pid);";
        $result = mysqli_query($db, $query);
        if (!$result) {
            print "Error - the insert transaction query could not be executed"; 
            echo($query);
            mysqli_error();
            exit;
        }

        //adjust account balances
        $query = "SELECT Balance FROM User WHERE Username='$Seller';";
        $result = mysqli_query($db, $query);
        if (!$result) {
            print "Error - the select balance seller query could not be executed"; 
            echo($query);
            mysqli_error();
            exit;
        }
   
        $row = mysqli_fetch_array($result);
   
        $seller_balance=$row[0];

        $query = "SELECT Balance FROM User WHERE Username='$buyer';";
        $result = mysqli_query($db, $query);
        if (!$result) {
            print "Error - the select balance buyer query could not be executed"; 
            echo($query);
            mysqli_error();
            exit;
        }
   
        $row = mysqli_fetch_array($result);
   
        $buyer_balance=$row[0];

        $query = "UPDATE User SET Balance = ($buyer_balance - $Price * $quantity) WHERE Username='$buyer';";
        $result = mysqli_query($db, $query);
        if (!$result) {
            print "Error - the update balance buyer query could not be executed"; 
            echo($query);
            mysqli_error();
            exit;
        }

        $query = "UPDATE User SET Balance = ($seller_balance + ($Price * $quantity)) WHERE Username='$Seller';";
        $result = mysqli_query($db, $query);
        if (!$result) {
            print "Error - the update balance seller query could not be executed"; 
            echo($query);
            mysqli_error();
            exit;
        }
     }   
    //else (seller = buyer)
        //do nothing
     echo("Success");
	$db->close();
?>