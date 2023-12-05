-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 30, 2023 lúc 06:00 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nestseek`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bill`
--

CREATE TABLE `bill` (
  `billID` int(11) NOT NULL,
  `tax` decimal(5,2) DEFAULT NULL,
  `initial_amount` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `for_rentID` int(11) DEFAULT NULL,
  `status` enum('pending','paid') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bill`
--

INSERT INTO `bill` (`billID`, `tax`, `initial_amount`, `total_amount`, `for_rentID`, `status`) VALUES
(1, 0.10, 1500.00, 1650.00, 1, 'pending');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `commentID` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `comment_time` date DEFAULT NULL,
  `userID` int(11) NOT NULL,
  `propertyID` int(11) NOT NULL,
  `isChild` enum('yes','no') NOT NULL,
  `parentID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`commentID`, `comment`, `comment_time`, `userID`, `propertyID`, `isChild`, `parentID`) VALUES
(1, 'Great property!', '2023-02-15', 2, 1, 'no', NULL),
(2, 'Thanks!', '2023-02-16', 1, 1, 'yes', 1),
(3, 'You\'re welcome!', '2023-02-17', 2, 1, 'yes', 1),
(4, 'Beautiful view!', '2023-03-01', 2, 2, 'no', NULL),
(5, 'Yes, it is!', '2023-03-02', 1, 2, 'yes', 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `property`
--

CREATE TABLE `property` (
  `propertyID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `area` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `imageURL` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` date NOT NULL,
  `ownerID` int(11) DEFAULT NULL,
  `status` enum('pending','published') NOT NULL,
  `initial_slot` int(11) NOT NULL,
  `cur_slot` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `property`
--

INSERT INTO `property` (`propertyID`, `name`, `area`, `location`, `description`, `imageURL`, `price`, `created_at`, `ownerID`, `status`, `initial_slot`, `cur_slot`) VALUES
(1, 'Property One', 1000, 'District A', 'Beautiful apartment', 'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41477-019-0374-3/MediaObjects/41477_2019_374_Figa_HTML.jpg', 1500.00, '2023-01-01', 1, 'pending', 0, 0),
(2, 'Property abcbkf', 200, 'City Center', 'Cozy house', 'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41477-019-0374-3/MediaObjects/41477_2019_374_Figa_HTML.jpg', 1200.00, '2023-01-05', 1, 'published', 0, 0),
(3, 'Property Three', 100, 'Beachfront', 'Spacious villa', 'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41477-019-0374-3/MediaObjects/41477_2019_374_Figa_HTML.jpg', 2000.00, '2023-01-10', 1, 'pending', 0, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rating`
--

CREATE TABLE `rating` (
  `ratingID` int(11) NOT NULL,
  `rate` int(11) NOT NULL CHECK (`rate` >= 1 and `rate` <= 5),
  `userID` int(11) DEFAULT NULL,
  `propertyID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `rating`
--

INSERT INTO `rating` (`ratingID`, `rate`, `userID`, `propertyID`) VALUES
(1, 4, 2, 1),
(2, 5, 2, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rent`
--

CREATE TABLE `rent` (
  `rentID` int(11) NOT NULL,
  `rent_date` date NOT NULL,
  `period` int(11) NOT NULL,
  `renterID` int(11) DEFAULT NULL,
  `propertyID` int(11) DEFAULT NULL,
  `status` enum('pending','renting','overdue') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `rent`
--

INSERT INTO `rent` (`rentID`, `rent_date`, `period`, `renterID`, `propertyID`, `status`) VALUES
(1, '2023-02-01', 12, 2, 1, 'pending'),
(2, '2023-03-01', 6, 2, 2, 'pending');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `report`
--

CREATE TABLE `report` (
  `reportID` int(11) NOT NULL,
  `report_type` enum('review','property') NOT NULL,
  `reportedID` int(11) NOT NULL,
  `reporterID` int(11) DEFAULT NULL,
  `report_date` date NOT NULL,
  `reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

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
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`userID`, `user_name`, `email`, `password`, `user_type`, `full_name`, `phone_number`, `bank_number`, `bank_name`, `status`) VALUES
(1, 'owner1', 'owner1@example.com', 'password1', 'owner', 'Owner One', '1234567890', '1234567890123456', 'BankA', 'normal'),
(2, 'renter1', 'renter1@example.com', 'password2', 'renter', 'Renter One', '9876543210', '6543210987654321', 'BankB', 'normal'),
(3, 'admin1', 'admin1@example.com', 'password3', 'admin', 'Admin One', '1112223333', NULL, NULL, 'normal'),
(4, 'user4', 'user4@example.com', 'password4', 'renter', 'Owner Two', '4445556666', NULL, NULL, 'normal');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`billID`),
  ADD KEY `for_rentID` (`for_rentID`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`commentID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `propertyID` (`propertyID`),
  ADD KEY `parentID` (`parentID`);

--
-- Chỉ mục cho bảng `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`propertyID`),
  ADD KEY `fk_owner` (`ownerID`);

--
-- Chỉ mục cho bảng `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`ratingID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `propertyID` (`propertyID`);

--
-- Chỉ mục cho bảng `rent`
--
ALTER TABLE `rent`
  ADD PRIMARY KEY (`rentID`),
  ADD KEY `renterID` (`renterID`),
  ADD KEY `propertyID` (`propertyID`);

--
-- Chỉ mục cho bảng `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`reportID`),
  ADD KEY `reporterID` (`reporterID`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bill`
--
ALTER TABLE `bill`
  MODIFY `billID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `property`
--
ALTER TABLE `property`
  MODIFY `propertyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `rating`
--
ALTER TABLE `rating`
  MODIFY `ratingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `rent`
--
ALTER TABLE `rent`
  MODIFY `rentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `report`
--
ALTER TABLE `report`
  MODIFY `reportID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`for_rentID`) REFERENCES `rent` (`rentID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`propertyID`) REFERENCES `property` (`propertyID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`parentID`) REFERENCES `comment` (`commentID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `fk_owner` FOREIGN KEY (`ownerID`) REFERENCES `user` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`propertyID`) REFERENCES `property` (`propertyID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `rent`
--
ALTER TABLE `rent`
  ADD CONSTRAINT `rent_ibfk_1` FOREIGN KEY (`renterID`) REFERENCES `user` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `rent_ibfk_2` FOREIGN KEY (`propertyID`) REFERENCES `property` (`propertyID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`reporterID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
