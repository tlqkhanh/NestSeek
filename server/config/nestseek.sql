-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2023 at 08:00 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nestseek`
--
CREATE DATABASE IF NOT EXISTS `nestseek` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `nestseek`;

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
CREATE TABLE IF NOT EXISTS `bill` (
  `billID` int(11) NOT NULL AUTO_INCREMENT,
  `tax` decimal(5,2) DEFAULT NULL,
  `initial_amount` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `for_rentID` int(11) DEFAULT NULL,
  `status` enum('pending','paid') NOT NULL DEFAULT 'pending',
  `created_date` date NOT NULL DEFAULT current_timestamp(),
  `paid_date` date DEFAULT NULL,
  PRIMARY KEY (`billID`),
  KEY `for_rentID` (`for_rentID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncate table before insert `bill`
--

TRUNCATE TABLE `bill`;
--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`billID`, `tax`, `initial_amount`, `total_amount`, `for_rentID`, `status`, `created_date`, `paid_date`) VALUES
(1, 0.10, 1500.00, 1650.00, 1, 'pending', '2023-12-12', NULL),
(2, 0.10, 1500.00, 1650.00, 6, 'paid', '2023-12-12', NULL),
(3, 0.10, 12000.00, 13200.00, 8, 'paid', '2023-12-13', '2023-12-13'),
(4, 0.10, 7200.00, 7920.00, 2, 'pending', '2023-12-13', NULL),
(5, 0.10, 12000.00, 13200.00, 11, 'paid', '2023-12-15', '2023-12-15');

--
-- Triggers `bill`
--
DROP TRIGGER IF EXISTS `before_bill_update`;
DELIMITER $$
CREATE TRIGGER `before_bill_update` BEFORE UPDATE ON `bill` FOR EACH ROW BEGIN
    IF OLD.status = 'pending' AND NEW.status = 'paid' AND OLD.paid_date IS NULL
    THEN
        -- Update rent status to 'renting'
        UPDATE rent
        SET status = 'renting'
        WHERE rentID = NEW.for_rentID;
        
        SET NEW.paid_date = CURRENT_TIMESTAMP;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `commentID` int(11) NOT NULL AUTO_INCREMENT,
  `comment` text DEFAULT NULL,
  `comment_time` date DEFAULT current_timestamp(),
  `userID` int(11) NOT NULL,
  `propertyID` int(11) NOT NULL,
  `isChild` enum('yes','no') NOT NULL,
  `parentID` int(11) DEFAULT NULL,
  PRIMARY KEY (`commentID`),
  KEY `userID` (`userID`),
  KEY `propertyID` (`propertyID`),
  KEY `parentID` (`parentID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncate table before insert `comment`
--

TRUNCATE TABLE `comment`;
--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`commentID`, `comment`, `comment_time`, `userID`, `propertyID`, `isChild`, `parentID`) VALUES
(19, 'KTX hien dai nhat dong nam a', '2023-12-14', 6, 8, 'no', NULL),
(20, 'Moi them ban be vao o KTX em nhe', '2023-12-14', 5, 8, 'yes', 19),
(21, 'Oke lun ban oi', '2023-12-14', 6, 8, 'yes', 19),
(22, 'ktx qua tuyt voi', '2023-12-14', 6, 8, 'no', NULL),
(23, 'Tui se moi them ban vao o ktx', '2023-12-14', 6, 8, 'yes', 19),
(24, 'Awesome doom!!!', '2023-12-14', 6, 8, 'no', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
CREATE TABLE IF NOT EXISTS `property` (
  `propertyID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `area` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `imageURL` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `ownerID` int(11) DEFAULT NULL,
  `status` enum('pending','published','rejected') NOT NULL DEFAULT 'pending',
  `initial_slot` int(11) NOT NULL,
  `cur_slot` int(11) NOT NULL,
  PRIMARY KEY (`propertyID`),
  KEY `fk_owner` (`ownerID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncate table before insert `property`
--

TRUNCATE TABLE `property`;
--
-- Dumping data for table `property`
--

INSERT INTO `property` (`propertyID`, `name`, `area`, `location`, `description`, `imageURL`, `price`, `created_at`, `ownerID`, `status`, `initial_slot`, `cur_slot`) VALUES
(1, 'Property One', 1000, 'District A', 'Beautiful apartment', 'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41477-019-0374-3/MediaObjects/41477_2019_374_Figa_HTML.jpg', 1500.00, '2023-01-01', 1, 'published', 0, 0),
(2, 'Property xyz', 200, 'City Corner', 'Cozy house', 'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41477-019-0374-3/MediaObjects/41477_2019_374_Figa_HTML.jpg', 1200.00, '2023-01-05', 1, 'published', 0, 0),
(3, 'Property Three', 100, 'Beachfront', 'Spacious villa', 'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41477-019-0374-3/MediaObjects/41477_2019_374_Figa_HTML.jpg', 2000.00, '2023-01-10', 1, 'published', 0, 0),
(7, 'Test', 120, 'Ktx khu A', 'KTX hien dai nhat DNA', 'https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg', 1000.00, '2023-12-13', 5, 'published', 6, 5),
(8, 'Test', 120, 'Ktx khu A', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg', 1000.00, '2023-12-13', 5, 'published', 2, 0),
(9, 'sèdsfa', 1, 'àdas', 'sầdfdsgagdgdfasfd', 'fdasfasf', 1.00, '2023-12-14', 5, 'published', 1, 1);

--
-- Triggers `property`
--
DROP TRIGGER IF EXISTS `before_property_update`;
DELIMITER $$
CREATE TRIGGER `before_property_update` BEFORE UPDATE ON `property` FOR EACH ROW BEGIN
    IF NEW.status = OLD.status AND NEW.status!='rejected' AND NEW.cur_slot = OLD.cur_slot THEN
        -- Update status to 'pending'
        SET NEW.status = 'pending';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
CREATE TABLE IF NOT EXISTS `rating` (
  `ratingID` int(11) NOT NULL AUTO_INCREMENT,
  `rate` int(11) NOT NULL CHECK (`rate` >= 1 and `rate` <= 5),
  `userID` int(11) DEFAULT NULL,
  `propertyID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ratingID`),
  KEY `userID` (`userID`),
  KEY `propertyID` (`propertyID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncate table before insert `rating`
--

TRUNCATE TABLE `rating`;
--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`ratingID`, `rate`, `userID`, `propertyID`) VALUES
(1, 4, 2, 1),
(2, 5, 2, 2),
(11, 4, 6, 8);

-- --------------------------------------------------------

--
-- Table structure for table `rent`
--

DROP TABLE IF EXISTS `rent`;
CREATE TABLE IF NOT EXISTS `rent` (
  `rentID` int(11) NOT NULL AUTO_INCREMENT,
  `rent_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `period` int(11) NOT NULL,
  `renterID` int(11) DEFAULT NULL,
  `propertyID` int(11) DEFAULT NULL,
  `status` enum('pending','waiting','renting','overdue') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`rentID`),
  KEY `renterID` (`renterID`),
  KEY `propertyID` (`propertyID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncate table before insert `rent`
--

TRUNCATE TABLE `rent`;
--
-- Dumping data for table `rent`
--

INSERT INTO `rent` (`rentID`, `rent_date`, `return_date`, `period`, `renterID`, `propertyID`, `status`) VALUES
(1, '2023-02-01', NULL, 12, 2, 1, 'pending'),
(2, '2023-03-01', NULL, 6, 2, 2, 'waiting'),
(6, '2023-01-30', '2023-02-28', 1, 1, 1, 'renting'),
(8, '2023-12-13', '2024-12-13', 12, 6, 8, 'renting'),
(11, '2023-12-14', '2024-12-14', 12, 6, 7, 'renting');

--
-- Triggers `rent`
--
DROP TRIGGER IF EXISTS `after_rent_update`;
DELIMITER $$
CREATE TRIGGER `after_rent_update` AFTER UPDATE ON `rent` FOR EACH ROW BEGIN
    IF OLD.status = 'pending' AND NEW.status = 'waiting' THEN
        -- Get property price
        SET @property_price := (SELECT price FROM property WHERE propertyID = NEW.propertyID);

        -- Calculate tax and initial amount
        SET @tax := 0.1;
        SET @initial_amount := @property_price * NEW.period;
        SET @total_amount := @initial_amount * (1 + @tax);

        -- Insert into the bill table
        INSERT INTO bill (tax, initial_amount, total_amount, for_rentID, status, created_date)
        VALUES (@tax, @initial_amount, @total_amount, NEW.rentID, 'pending', CURDATE());
    END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `calculate_return_date`;
DELIMITER $$
CREATE TRIGGER `calculate_return_date` BEFORE INSERT ON `rent` FOR EACH ROW BEGIN
    SET NEW.return_date = DATE_ADD(NEW.rent_date, INTERVAL NEW.period MONTH);
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `increment_cur_slot`;
DELIMITER $$
CREATE TRIGGER `increment_cur_slot` AFTER UPDATE ON `rent` FOR EACH ROW BEGIN
    -- Check if status changes to 'overdue'
    IF NEW.status = 'overdue' AND OLD.status != 'overdue' THEN
        -- Increment cur_slot for the associated property
        UPDATE property
        SET cur_slot = cur_slot + 1
        WHERE propertyID = NEW.propertyID
          AND cur_slot < initial_slot;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
CREATE TABLE IF NOT EXISTS `report` (
  `reportID` int(11) NOT NULL AUTO_INCREMENT,
  `report_type` enum('review','property') NOT NULL,
  `reportedID` int(11) NOT NULL,
  `reporterID` int(11) DEFAULT NULL,
  `report_date` date NOT NULL DEFAULT current_timestamp(),
  `reason` varchar(255) NOT NULL,
  PRIMARY KEY (`reportID`),
  KEY `reporterID` (`reporterID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncate table before insert `report`
--

TRUNCATE TABLE `report`;
-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('owner','renter','admin') NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `bank_number` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `status` enum('normal','blocked') NOT NULL DEFAULT 'normal',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncate table before insert `user`
--

TRUNCATE TABLE `user`;
--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `user_name`, `email`, `password`, `user_type`, `full_name`, `phone_number`, `bank_number`, `bank_name`, `status`) VALUES
(1, 'owner1', 'owner1@example.com', '$2y$10$ZlYnvgaMT9ip6WGbz9bFSeFNW4MDGtISEMXqhkUVw2DRLXeje./4W', 'owner', 'Owner One', '1234567890', '1234567890123456', 'BankA', 'normal'),
(2, 'renter1', 'renter1@example.com', 'password2', 'renter', 'Renter One', '9876543210', '6543210987654321', 'BankB', 'normal'),
(3, 'admin1', 'admin1@example.com', '$2y$10$3Ea2YrbS0b/0kgfeLbPv6O2y3FGOoRD5JdRxL8dFqVqenkt60Ou2C', 'admin', 'Admin One', '1112223333', NULL, NULL, 'normal'),
(4, 'user4', 'user4@example.com', 'password4', 'renter', 'Owner Two', '4445556666', NULL, NULL, 'normal'),
(5, 'tlqkhanh', 'tlqkhanh@gmail.com', '$2y$10$3Ea2YrbS0b/0kgfeLbPv6O2y3FGOoRD5JdRxL8dFqVqenkt60Ou2C', 'owner', 'TLQKhanh', '0398680678', '', '', 'normal'),
(6, 'kiwi', 'kiwi@gmail.com', '$2y$10$qEXhNpTpuX9IRtCuHXmYse5tV8ZO2cR9aosmYhQSPF0FEuuOCqSbC', 'renter', 'Kiwikiwi', '9988776655', '', '', 'normal');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`for_rentID`) REFERENCES `rent` (`rentID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`propertyID`) REFERENCES `property` (`propertyID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`parentID`) REFERENCES `comment` (`commentID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `fk_owner` FOREIGN KEY (`ownerID`) REFERENCES `user` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`propertyID`) REFERENCES `property` (`propertyID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `rent`
--
ALTER TABLE `rent`
  ADD CONSTRAINT `rent_ibfk_1` FOREIGN KEY (`renterID`) REFERENCES `user` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `rent_ibfk_2` FOREIGN KEY (`propertyID`) REFERENCES `property` (`propertyID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`reporterID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

DELIMITER $$
--
-- Events
--
DROP EVENT IF EXISTS `check_and_delete_rejected_properties`$$
CREATE DEFINER=`root`@`localhost` EVENT `check_and_delete_rejected_properties` ON SCHEDULE EVERY 1 DAY STARTS '2023-12-14 21:58:53' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    DECLARE propertyID_var INT;

    -- Select properties meeting the conditions
    SELECT propertyID INTO propertyID_var
    FROM Property
    WHERE status = 'rejected' AND cur_slot = initial_slot;

    -- If a property is found, delete it
    IF propertyID_var IS NOT NULL THEN
        DELETE FROM Property WHERE propertyID = propertyID_var;
    END IF;
END$$

DROP EVENT IF EXISTS `update_overdue_status`$$
CREATE DEFINER=`root`@`localhost` EVENT `update_overdue_status` ON SCHEDULE EVERY 1 DAY STARTS '2023-12-15 01:58:49' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    -- Update rent status to 'overdue'
    UPDATE rent
    SET status = 'overdue'
    WHERE return_date < CURDATE() AND status != 'overdue';
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
