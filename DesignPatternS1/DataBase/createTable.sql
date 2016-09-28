SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;

SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;

SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';


DROP DATABASE `cardekho`;

CREATE SCHEMA IF NOT EXISTS `cardekho` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;

USE `cardekho` ;



-- -----------------------------------------------------

-- Table `cardekho`.`cars`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `cardekho`.`cars` ;



CREATE  TABLE IF NOT EXISTS `cardekho`.`cars` (

  `id` INT NOT NULL AUTO_INCREMENT ,

  `updateTime`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  `updatedBy`  VARCHAR(20) DEFAULT "Admin" ,

  `make` VARCHAR(45) NULL ,

  `model` VARCHAR(45) NULL ,

  `engineInCC` INT NULL ,

  `fuelCapacity` INT NULL ,

  `milage` FLOAT NULL ,

  `price` FLOAT NULL ,

  `roadTax` FLOAT NULL ,

  `ac` FLOAT NULL ,

  `powerSteering` FLOAT NULL ,

  `accessoryKit` FLOAT NULL ,

  PRIMARY KEY (`id`) )

ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;

SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

