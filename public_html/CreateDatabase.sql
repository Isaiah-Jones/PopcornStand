-- CREATE STATEMENT Query
CREATE SCHEMA IF NOT EXISTS `Team5` DEFAULT CHARACTER SET utf8 ;
USE `Team5` ;

-- -----------------------------------------------------
-- Table `User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `User` (
  `Username` VARCHAR(50) NOT NULL,
  `Fname` VARCHAR(25) NOT NULL,
  `Lname` VARCHAR(25) NOT NULL,
  `Email` VARCHAR(80) NOT NULL,
  `Balance` INT UNSIGNED NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Hint` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Username`),
  UNIQUE INDEX `Username_UNIQUE` (`Username` ASC));

-- -----------------------------------------------------
-- Table `Inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inventory` (
  `Pid` INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  `Productname` VARCHAR(200) NOT NULL,
  `Description` VARCHAR(1000) NULL,
  -- Do we need Quantity?
  PRIMARY KEY (`Pid`));

-- -----------------------------------------------------
-- Table `Transaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Transaction` (
  `Tid` INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  `Quantity_bought` INT UNSIGNED NOT NULL,
  `Cost` DECIMAL(20) UNSIGNED NOT NULL,
  `Tax` DECIMAL(20,2) UNSIGNED GENERATED ALWAYS AS (Cost*0.08),
  `Seller` VARCHAR(50) NOT NULL,
  `Pid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`Tid`),
  FOREIGN KEY (Seller) REFERENCES `User`(Username),
  FOREIGN KEY (Pid) REFERENCES `Inventory`(Pid));
  
-- -----------------------------------------------------
-- Table `sells`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sells` (
  `Sid` INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  `Inventory_Pid` INT UNSIGNED NOT NULL,
  `Seller` VARCHAR(50) NOT NULL,
  `Quantity` INT UNSIGNED NOT NULL,
  `Price` DECIMAL(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`Sid`),
  FOREIGN KEY (Seller) REFERENCES `User`(Username),
  FOREIGN KEY (Inventory_Pid) REFERENCES `Inventory`(Pid));

-- -----------------------------------------------------
-- Table `owns`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Owns` (
  `Oid` INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  `Inventory_Pid` INT UNSIGNED NOT NULL,
  `Owner` VARCHAR(50) NOT NULL,
  `Quantity` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`Oid`),
  FOREIGN KEY (`Owner`) REFERENCES `User`(Username),
  FOREIGN KEY (Inventory_Pid) REFERENCES `Inventory`(Pid));


