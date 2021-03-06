-- MySQL Script generated by MySQL Workbench
-- Thu Mar 28 23:52:02 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Team5
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Team5
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Team5` DEFAULT CHARACTER SET utf8 ;
USE `Team5` ;

-- -----------------------------------------------------
-- Table `Team5`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Team5`.`User` (
  `Username` VARCHAR(50) NOT NULL,
  `Fname` VARCHAR(25) NOT NULL,
  `Lname` VARCHAR(25) NOT NULL,
  `Email` VARCHAR(80) NOT NULL,
  `Balance` INT UNSIGNED NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Hint` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Username`),
  UNIQUE INDEX `Username_UNIQUE` (`Username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Team5`.`Inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Team5`.`Inventory` (
  `Pid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Productname` VARCHAR(200) NOT NULL,
  `Description` VARCHAR(1000) NULL,
  PRIMARY KEY (`Pid`),
  UNIQUE INDEX `Pid_UNIQUE` (`Pid` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Team5`.`Transaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Team5`.`Transaction` (
  `Tid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Quantity_bought` INT UNSIGNED NOT NULL,
  `Time_bought` DATETIME NOT NULL,
  `Cost` DECIMAL(20) UNSIGNED NOT NULL,
  `Buyer` VARCHAR(50) NOT NULL,
  `Seller` VARCHAR(50) NOT NULL,
  `Pid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`Tid`, `Buyer`, `Seller`, `Pid`),
  UNIQUE INDEX `Tid_UNIQUE` (`Tid` ASC),
  INDEX `fk_Transaction_User1_idx` (`Buyer` ASC),
  INDEX `fk_Transaction_User2_idx` (`Seller` ASC),
  INDEX `fk_Transaction_Inventory1_idx` (`Pid` ASC),
  CONSTRAINT `fk_Transaction_User1`
    FOREIGN KEY (`Buyer`)
    REFERENCES `Team5`.`User` (`Username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transaction_User2`
    FOREIGN KEY (`Seller`)
    REFERENCES `Team5`.`User` (`Username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transaction_Inventory1`
    FOREIGN KEY (`Pid`)
    REFERENCES `Team5`.`Inventory` (`Pid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Team5`.`sells`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Team5`.`sells` (
  `Inventory_Pid` INT UNSIGNED NOT NULL,
  `Seller` VARCHAR(50) NOT NULL,
  `Quantity` INT UNSIGNED NOT NULL,
  `Price` DECIMAL(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`Inventory_Pid`, `Seller`),
  INDEX `fk_Inventory_has_User_User1_idx` (`Seller` ASC),
  INDEX `fk_Inventory_has_User_Inventory1_idx` (`Inventory_Pid` ASC),
  CONSTRAINT `fk_Inventory_has_User_Inventory1`
    FOREIGN KEY (`Inventory_Pid`)
    REFERENCES `Team5`.`Inventory` (`Pid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Inventory_has_User_User1`
    FOREIGN KEY (`Seller`)
    REFERENCES `Team5`.`User` (`Username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Team5`.`owns`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Team5`.`owns` (
  `Inventory_Pid` INT UNSIGNED NOT NULL,
  `Owner` VARCHAR(50) NOT NULL,
  `Quantity` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`Inventory_Pid`, `Owner`),
  INDEX `fk_Inventory_has_User1_User1_idx` (`Owner` ASC),
  INDEX `fk_Inventory_has_User1_Inventory1_idx` (`Inventory_Pid` ASC),
  CONSTRAINT `fk_Inventory_has_User1_Inventory1`
    FOREIGN KEY (`Inventory_Pid`)
    REFERENCES `Team5`.`Inventory` (`Pid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Inventory_has_User1_User1`
    FOREIGN KEY (`Owner`)
    REFERENCES `Team5`.`User` (`Username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
