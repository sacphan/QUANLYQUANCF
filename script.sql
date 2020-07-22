-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2020 at 06:08 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlycoffe`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `Id` int(11) NOT NULL,
  `Id_Staff` int(11) NOT NULL,
  `Id_CustomerType` int(11) NOT NULL,
  `CreateDate` date NOT NULL,
  `Total` float NOT NULL,
  `AmountGiven` float NOT NULL,
  `AmountReturned` float NOT NULL,
  `Note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `Id` int(8) NOT NULL,
  `Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`Id`, `Name`) VALUES
(1, 'Nước uống'),
(2, 'Đồ ăn');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `Id` int(11) UNSIGNED NOT NULL,
  `Id_CustomerType` int(11) NOT NULL DEFAULT 1,
  `Name` text NOT NULL,
  `Phone` text NOT NULL,
  `Note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customertype`
--

CREATE TABLE `customertype` (
  `Id` int(10) UNSIGNED NOT NULL,
  `Type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customertype`
--

INSERT INTO `customertype` (`Id`, `Type`) VALUES
(1, 'Khách vãng lai'),
(2, 'Khach quen');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `Id` int(11) NOT NULL,
  `Id_Staff` int(11) DEFAULT NULL,
  `Id_Customer` int(11) DEFAULT NULL,
  `Id_Table` int(11) DEFAULT NULL,
  `CashTotal` float NOT NULL,
  `CashGiven` float NOT NULL,
  `CashReturned` float NOT NULL,
  `CreateDate` date NOT NULL,
  `Note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `Id` int(11) NOT NULL,
  `Id_Order` int(11) NOT NULL,
  `Id_Stock` int(11) NOT NULL,
  `NameStock` text NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Prince` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `Id` int(11) NOT NULL,
  `FullName` text NOT NULL,
  `Email` text NOT NULL,
  `BirthDay` date NOT NULL,
  `Address` text NOT NULL,
  `Phone` varchar(11) NOT NULL,
  `UserName` text NOT NULL,
  `Password` text NOT NULL,
  `Role` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`Id`, `FullName`, `Email`, `BirthDay`, `Address`, `Phone`, `UserName`, `Password`, `Role`) VALUES
(1, 'sac', 'sacphan242@gmail.com', '2020-06-05', '222g Trần Hưng Đạo Quận 5', '0364990480', 'sac', '$2a$10$SnnLhdT4ycqjd6.JZcAIheHv4AuN.u9as2Zg2WVQnSF6U5/nkdbWS', 1),
(3, 'sac', 'sacphan242@gmail.com', '2020-06-05', '222g Trần Hưng Đạo Quận 5', '0364990480', 'test', '$2a$10$2E9lCRrzC9GhgNlhjqmVbebmkxaq.4I0Zd5OYTCWCIauC2kn8c6Sa', 1);

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `Id` int(10) UNSIGNED NOT NULL,
  `Code` text NOT NULL,
  `Name` text NOT NULL,
  `CatID` int(8) NOT NULL,
  `CreateDate` date NOT NULL DEFAULT current_timestamp(),
  `Quantity` int(11) NOT NULL,
  `PriceIn` float NOT NULL,
  `PriceOut` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`Id`, `Code`, `Name`, `CatID`, `CreateDate`, `Quantity`, `PriceIn`, `PriceOut`) VALUES
(1, 'cf', 'Cà phê', 1, '2020-07-21', 50, 10000, 15000),
(2, 'cc', 'Coca', 1, '2020-07-21', 50, 8000, 12000),
(3, 'Bl', 'Bánh plan', 2, '2020-07-21', 50, 5000, 10000),
(4, 'xx', 'Xúc xích', 2, '2020-07-21', 50, 10000, 15000);

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `Id` int(11) UNSIGNED NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Area` text NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`Id`, `Name`, `Area`, `Status`) VALUES
(3, 'Bàn 1', 'Lầu 1', 0),
(4, 'Bàn 2', 'Lầu 1', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `customertype`
--
ALTER TABLE `customertype`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customertype`
--
ALTER TABLE `customertype`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
