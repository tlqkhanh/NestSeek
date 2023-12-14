-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2023 at 08:36 AM
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
CREATE TABLE `bill` (
  `billID` int(11) NOT NULL,
  `tax` decimal(5,2) DEFAULT NULL,
  `initial_amount` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `for_rentID` int(11) DEFAULT NULL,
  `status` enum('pending','paid') NOT NULL DEFAULT 'pending',
  `created_date` date NOT NULL DEFAULT current_timestamp(),
  `paid_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(4, 0.10, 7200.00, 7920.00, 2, 'pending', '2023-12-13', NULL);

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
CREATE TABLE `comment` (
  `commentID` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `comment_time` date DEFAULT current_timestamp(),
  `userID` int(11) NOT NULL,
  `propertyID` int(11) NOT NULL,
  `isChild` enum('yes','no') NOT NULL,
  `parentID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(23, 'Tui se moi them ban vao o ktx', '2023-12-14', 6, 8, 'yes', 19);

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
CREATE TABLE `property` (
  `propertyID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `area` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `imageURL` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `ownerID` int(11) DEFAULT NULL,
  `status` enum('pending','published') NOT NULL DEFAULT 'pending',
  `initial_slot` int(11) NOT NULL,
  `cur_slot` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(3, 'Property Three', 100, 'Beachfront', 'Spacious villa', 'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41477-019-0374-3/MediaObjects/41477_2019_374_Figa_HTML.jpg', 2000.00, '2023-01-10', 1, 'pending', 0, 0),
(7, 'Test', 120, 'Ktx khu A', 'KTX hien dai nhat DNA', 'https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg', 1000.00, '2023-12-13', 5, 'published', 6, 6),
(8, 'Test', 120, 'Ktx khu A', 'KTX hien dai nhat DNA', 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg', 1000.00, '2023-12-13', 5, 'published', 6, 4);

--
-- Triggers `property`
--
DROP TRIGGER IF EXISTS `before_property_update`;
DELIMITER $$
CREATE TRIGGER `before_property_update` BEFORE UPDATE ON `property` FOR EACH ROW BEGIN
    IF NEW.status = OLD.status AND NEW.cur_slot = OLD.cur_slot THEN
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
CREATE TABLE `rating` (
  `ratingID` int(11) NOT NULL,
  `rate` int(11) NOT NULL CHECK (`rate` >= 1 and `rate` <= 5),
  `userID` int(11) DEFAULT NULL,
  `propertyID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
CREATE TABLE `rent` (
  `rentID` int(11) NOT NULL,
  `rent_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `period` int(11) NOT NULL,
  `renterID` int(11) DEFAULT NULL,
  `propertyID` int(11) DEFAULT NULL,
  `status` enum('pending','waiting','renting','overdue') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(9, '2023-12-14', '2024-12-14', 12, 6, 8, 'pending');

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

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
  `reportID` int(11) NOT NULL,
  `report_type` enum('review','property') NOT NULL,
  `reportedID` int(11) NOT NULL,
  `reporterID` int(11) DEFAULT NULL,
  `report_date` date NOT NULL DEFAULT current_timestamp(),
  `reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncate table before insert `report`
--

TRUNCATE TABLE `report`;
--
-- Dumping data for table `report`
--

INSERT INTO `report` (`reportID`, `report_type`, `reportedID`, `reporterID`, `report_date`, `reason`) VALUES
(3, 'property', 8, 6, '2023-12-14', 'KTX lam an chan qua'),
(4, 'property', 8, 6, '2023-12-14', 'nha xau vl');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('owner','renter','admin') NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `bank_number` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `status` enum('normal','blocked') NOT NULL DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`billID`),
  ADD KEY `for_rentID` (`for_rentID`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`commentID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `propertyID` (`propertyID`),
  ADD KEY `parentID` (`parentID`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`propertyID`),
  ADD KEY `fk_owner` (`ownerID`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`ratingID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `propertyID` (`propertyID`);

--
-- Indexes for table `rent`
--
ALTER TABLE `rent`
  ADD PRIMARY KEY (`rentID`),
  ADD KEY `renterID` (`renterID`),
  ADD KEY `propertyID` (`propertyID`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`reportID`),
  ADD KEY `reporterID` (`reporterID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `billID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `propertyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `ratingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `rent`
--
ALTER TABLE `rent`
  MODIFY `rentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `reportID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
