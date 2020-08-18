-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2020 at 06:22 AM
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
(2, 'Đồ ăn'),
(3, 'nuoc loc');

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

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`Id`, `Id_CustomerType`, `Name`, `Phone`, `Note`) VALUES
(1, 1, 'Kiên óc chó', '0123456678', ''),
(2, 1, 'Trung ', '98234783246732', '123');

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
  `Code` text DEFAULT NULL,
  `CashTotal` float NOT NULL,
  `CashGiven` float NOT NULL,
  `CashReturned` float NOT NULL,
  `CreateDate` datetime NOT NULL DEFAULT current_timestamp(),
  `Note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`Id`, `Id_Staff`, `Id_Customer`, `Id_Table`, `Code`, `CashTotal`, `CashGiven`, `CashReturned`, `CreateDate`, `Note`) VALUES
(3, NULL, NULL, NULL, NULL, 2000, 2000, 2000, '0000-00-00 00:00:00', ''),
(4, NULL, NULL, NULL, NULL, 2000, 200, 2000, '0000-00-00 00:00:00', NULL),
(5, NULL, NULL, NULL, NULL, 2000, 2000, 2000, '2020-07-29 15:50:00', NULL),
(6, NULL, NULL, NULL, NULL, 2000, 0, 0, '2020-07-29 15:54:18', NULL),
(7, NULL, NULL, NULL, NULL, 2000, 2000, 2000, '2020-07-29 15:56:45', NULL),
(8, NULL, NULL, NULL, NULL, 45000, 200000, 15500, '2020-07-29 16:22:12', NULL),
(9, NULL, NULL, NULL, NULL, 45000, 200000, 15500, '2020-07-29 16:24:12', NULL),
(10, NULL, NULL, NULL, NULL, 45000, 200000, 155000, '2020-07-29 16:26:45', NULL),
(11, NULL, NULL, NULL, NULL, 57000, 200000, 143000, '2020-07-29 16:28:21', NULL),
(12, NULL, NULL, NULL, NULL, 45000, 200000, 155000, '2020-07-29 16:44:53', NULL),
(13, NULL, NULL, NULL, NULL, 57000, 200000, 143000, '2020-07-29 16:46:38', NULL),
(14, NULL, NULL, NULL, NULL, 57000, 200000, 143000, '2020-07-29 16:46:54', NULL),
(15, NULL, NULL, NULL, NULL, 45000, 200000, 155000, '2020-07-29 16:47:05', NULL),
(16, NULL, NULL, NULL, 'HD16', 42000, 200000, 158000, '2020-07-29 16:48:09', NULL),
(17, NULL, NULL, NULL, 'HD17', 54000, 200000, 146000, '2020-07-29 16:52:59', NULL),
(18, NULL, NULL, NULL, 'HD18', 42000, 200000, 158000, '2020-07-29 16:57:39', NULL),
(19, NULL, NULL, NULL, 'HD19', 30000, 200000, 170000, '2020-07-29 17:04:29', NULL),
(20, NULL, NULL, NULL, 'HD20', 60000, 2000000000, 1999940000, '2020-07-29 17:06:02', NULL),
(21, NULL, NULL, NULL, 'HD21', 45000, 200000, 155000, '2020-07-29 17:08:19', NULL),
(22, NULL, NULL, NULL, 'HD22', 0, 0, 0, '2020-07-29 17:14:11', NULL),
(23, NULL, NULL, NULL, 'HD23', 0, 0, 0, '2020-07-29 17:14:17', NULL),
(24, NULL, NULL, NULL, 'HD24', 54000, 0, 0, '2020-07-29 17:15:01', NULL),
(25, NULL, NULL, NULL, 'HD25', 39000, 0, 0, '2020-07-29 17:15:41', NULL),
(26, 1, NULL, NULL, 'HD26', 69000, 200000, 131000, '2020-07-29 17:18:03', NULL),
(27, 1, NULL, NULL, 'HD27', 81000, 200000, 119000, '2020-07-29 17:23:46', NULL),
(28, 1, NULL, NULL, 'HD28', 27000, 0, 0, '2020-07-29 17:26:06', NULL),
(29, 1, NULL, NULL, 'HD29', 69000, 2000000, 1931000, '2020-07-29 17:27:49', NULL),
(30, 1, NULL, NULL, 'HD30', 45000, 2000000, 1955000, '2020-07-29 17:28:23', NULL),
(31, 1, NULL, NULL, 'HD31', 66000, 200000, 134000, '2020-07-29 17:28:41', NULL),
(32, 1, NULL, NULL, 'HD32', 66000, 20000000, 19934000, '2020-07-29 17:28:56', NULL),
(33, 1, NULL, NULL, 'HD33', 69000, 200000, 131000, '2020-07-29 17:31:51', NULL),
(34, 1, NULL, NULL, 'HD34', 69000, 2000000, 1931000, '2020-07-29 17:32:01', NULL),
(35, 1, NULL, NULL, 'HD35', 69000, 20000000, 19931000, '2020-07-29 17:32:16', NULL),
(36, 1, NULL, NULL, 'HD36', 69000, 200000, 131000, '2020-07-29 17:34:16', NULL),
(37, 1, NULL, NULL, 'HD37', 49000, 200000, 151000, '2020-07-29 17:34:28', NULL),
(38, 1, NULL, NULL, 'HD38', 54000, 0, 0, '2020-07-29 17:37:42', NULL),
(39, 1, NULL, NULL, 'HD39', 54000, 0, 0, '2020-07-29 17:42:01', NULL),
(40, 1, NULL, NULL, 'HD40', 69000, 0, 0, '2020-07-29 17:42:25', NULL),
(41, 1, NULL, NULL, 'HD41', 54000, 0, 0, '2020-07-29 17:42:38', NULL),
(42, 1, NULL, NULL, 'HD42', 54000, 0, 0, '2020-07-29 17:43:24', NULL),
(43, 1, NULL, NULL, 'HD43', 42000, 0, 0, '2020-07-29 17:44:52', NULL),
(44, 1, NULL, NULL, 'HD44', 54000, 0, 0, '2020-07-29 17:44:58', NULL),
(45, 1, NULL, NULL, 'HD45', 69000, 0, 0, '2020-07-29 17:45:24', NULL),
(46, 1, NULL, NULL, 'HD46', 54000, 0, 0, '2020-07-29 17:46:07', NULL),
(47, 1, NULL, NULL, 'HD47', 54000, 0, 0, '2020-07-29 17:46:14', NULL),
(48, 1, NULL, NULL, 'HD48', 69000, 0, 0, '2020-07-29 17:47:47', NULL),
(49, 1, NULL, NULL, 'HD49', 54000, 0, 0, '2020-07-29 17:48:26', NULL),
(50, 1, NULL, NULL, 'HD50', 54000, 0, 0, '2020-07-29 17:48:51', NULL),
(51, 1, NULL, NULL, 'HD51', 54000, 0, 0, '2020-07-29 17:50:09', NULL),
(52, 1, NULL, NULL, 'HD52', 39000, 0, 0, '2020-07-29 17:51:23', NULL),
(53, 1, NULL, NULL, 'HD53', 27000, 0, 0, '2020-07-29 17:51:50', NULL),
(54, 1, NULL, NULL, 'HD54', 30000, 0, 0, '2020-07-29 17:52:47', NULL),
(55, 1, NULL, NULL, 'HD55', 69000, 0, 0, '2020-07-29 22:06:21', NULL),
(56, 1, NULL, NULL, 'HD56', 84000, 0, 0, '2020-07-29 22:07:14', NULL),
(57, 1, NULL, NULL, 'HD57', 227000, 0, 0, '2020-07-29 22:08:49', NULL),
(58, 1, NULL, NULL, 'HD58', 37000, 0, 0, '2020-07-29 22:11:36', NULL),
(59, 1, NULL, NULL, 'HD59', 66000, 0, 0, '2020-07-29 22:21:56', NULL),
(60, 1, NULL, NULL, 'HD60', 54000, 0, 0, '2020-07-29 22:24:15', NULL),
(61, 1, NULL, NULL, 'HD61', 54000, 0, 0, '2020-07-29 22:25:42', NULL),
(62, 1, NULL, NULL, 'HD62', 74000, 0, 0, '2020-07-29 22:26:16', NULL),
(63, 1, NULL, NULL, 'HD63', 81000, 0, 0, '2020-07-29 22:28:40', NULL),
(64, 1, NULL, NULL, 'HD64', 54000, 0, 0, '2020-07-29 22:30:55', NULL),
(65, 1, NULL, NULL, 'HD65', 66000, 0, 0, '2020-07-29 22:31:37', NULL),
(66, 1, NULL, NULL, 'HD66', 54000, 0, 0, '2020-07-29 22:51:17', NULL),
(67, 1, NULL, NULL, 'HD67', 123000, 0, 0, '2020-07-29 22:51:58', NULL),
(68, 1, NULL, NULL, 'HD68', 108000, 0, 0, '2020-07-29 22:52:22', NULL),
(69, 1, NULL, NULL, 'HD69', 42000, 0, 0, '2020-07-29 22:53:19', NULL),
(70, 1, NULL, NULL, 'HD70', 42000, 0, 0, '2020-07-29 23:05:00', NULL),
(71, 1, NULL, NULL, 'HD71', 69000, 0, 0, '2020-07-29 23:06:00', NULL),
(72, 1, NULL, NULL, 'HD72', 42000, 0, 0, '2020-07-29 23:16:57', NULL),
(73, 1, NULL, NULL, 'HD73', 54000, 0, 0, '2020-07-29 23:17:46', NULL),
(74, 1, NULL, NULL, 'HD74', 54000, 0, 0, '2020-07-29 23:18:14', NULL),
(75, 1, NULL, NULL, 'HD75', 54000, 0, 0, '2020-07-29 23:21:37', NULL),
(76, 1, NULL, NULL, 'HD76', 54000, 0, 0, '2020-07-29 23:24:31', NULL),
(77, 1, NULL, NULL, 'HD77', 54000, 0, 0, '2020-07-29 23:26:48', NULL),
(78, 1, NULL, NULL, 'HD78', 54000, 0, 0, '2020-07-29 23:28:00', NULL),
(79, 1, NULL, NULL, 'HD79', 42000, 0, 0, '2020-07-29 23:29:33', NULL),
(80, 1, NULL, NULL, 'HD80', 54000, 0, 0, '2020-07-29 23:44:14', NULL),
(81, 1, NULL, NULL, 'HD81', 54000, 0, 0, '2020-07-29 23:46:01', NULL),
(82, 1, NULL, NULL, 'HD82', 54000, 0, 0, '2020-07-29 23:59:22', NULL),
(83, 1, NULL, NULL, 'HD83', 140000, 0, 0, '2020-07-30 00:02:26', NULL),
(84, 1, NULL, NULL, 'HD84', 262000, 0, 0, '2020-07-30 00:02:52', NULL),
(85, 1, NULL, NULL, 'HD85', 39000, 0, 0, '2020-07-30 00:04:21', NULL),
(86, 1, NULL, NULL, 'HD86', 54000, 0, 0, '2020-07-30 00:06:30', NULL),
(87, 1, NULL, NULL, 'HD87', 54000, 0, 0, '2020-07-30 00:07:36', NULL),
(88, 1, NULL, NULL, 'HD88', 54000, 0, 0, '2020-07-30 00:12:28', NULL),
(89, 1, NULL, NULL, 'HD89', 15000, 0, 0, '2020-07-30 00:14:29', NULL),
(90, 1, NULL, NULL, 'HD90', 15000, 0, 0, '2020-07-30 00:15:15', NULL),
(91, 1, NULL, NULL, 'HD91', 42000, 0, 0, '2020-07-30 00:17:29', NULL),
(92, 1, NULL, NULL, 'HD92', 54000, 0, 0, '2020-07-30 00:18:35', NULL),
(93, 1, NULL, NULL, 'HD93', 15000, 0, 0, '2020-07-30 00:19:37', NULL),
(94, 1, NULL, NULL, 'HD94', 54000, 0, 0, '2020-07-30 21:06:47', NULL),
(95, 1, NULL, NULL, 'HD95', 30000, 0, 0, '2020-07-30 21:09:47', NULL),
(96, 1, NULL, NULL, 'HD96', 42000, 0, 0, '2020-07-30 21:14:28', NULL),
(97, 1, NULL, NULL, 'HD97', 15000, 0, 0, '2020-07-30 21:16:51', NULL),
(98, 1, NULL, NULL, 'HD98', 15000, 0, 0, '2020-07-30 21:17:25', NULL),
(99, 1, NULL, NULL, 'HD99', 15000, 0, 0, '2020-07-30 21:18:09', NULL),
(100, 1, NULL, NULL, 'HD100', 15000, 0, 0, '2020-07-30 21:18:59', NULL),
(101, 1, NULL, NULL, 'HD101', 15000, 0, 0, '2020-07-30 21:20:05', NULL),
(102, 1, NULL, NULL, 'HD102', 15000, 0, 0, '2020-07-30 21:20:56', NULL),
(103, 1, NULL, NULL, 'HD103', 12000, 0, 0, '2020-07-30 21:22:00', NULL),
(104, 1, NULL, NULL, 'HD104', 12000, 0, 0, '2020-07-30 21:22:37', NULL),
(105, 1, NULL, NULL, 'HD105', 15000, 0, 0, '2020-07-30 21:23:22', NULL),
(106, 1, NULL, NULL, 'HD106', 12000, 0, 0, '2020-07-30 21:25:12', NULL),
(107, 1, NULL, NULL, 'HD107', 27000, 0, 0, '2020-07-30 21:25:55', NULL),
(108, 1, NULL, NULL, 'HD108', 50000, 0, 0, '2020-07-30 21:26:11', NULL),
(109, 1, NULL, NULL, 'HD109', 60000, 0, 0, '2020-07-30 21:26:52', NULL),
(110, 1, NULL, NULL, 'HD110', 54000, 0, 0, '2020-07-30 21:27:11', NULL),
(111, 1, NULL, NULL, 'HD111', 39000, 0, 0, '2020-07-30 21:30:43', NULL),
(112, 1, NULL, NULL, 'HD112', 0, 0, 0, '2020-07-30 21:30:50', NULL),
(113, NULL, NULL, NULL, 'HD113', 49000, 0, 0, '2020-07-30 21:31:30', NULL),
(114, 1, NULL, NULL, 'HD114', 20000, 0, 0, '2020-07-30 21:32:14', NULL),
(115, 1, NULL, NULL, 'HD115', 0, 0, 0, '2020-07-30 21:32:22', NULL),
(116, 1, NULL, NULL, 'HD116', 12000, 0, 0, '2020-07-30 21:35:29', NULL),
(117, 1, NULL, NULL, 'HD117', 10000, 0, 0, '2020-07-30 21:37:16', NULL),
(118, 1, NULL, NULL, 'HD118', 27000, 0, 0, '2020-07-30 21:37:51', NULL),
(119, 1, NULL, NULL, 'HD119', 15000, 0, 0, '2020-07-30 21:39:10', NULL),
(120, 1, NULL, NULL, 'HD120', 12000, 0, 0, '2020-07-30 21:41:22', NULL),
(121, 1, NULL, NULL, 'HD121', 30000, 0, 0, '2020-07-30 21:41:42', NULL),
(122, 1, NULL, NULL, 'HD122', 27000, 0, 0, '2020-07-30 21:42:44', NULL),
(123, 1, NULL, NULL, 'HD123', 45000, 0, 0, '2020-07-30 21:43:00', NULL),
(124, 1, NULL, NULL, 'HD124', 13000, 100000, 87000, '2020-07-30 21:45:46', NULL),
(125, 1, NULL, NULL, 'HD125', 12000, 0, 0, '2020-07-30 21:47:52', NULL),
(126, 1, NULL, NULL, 'HD126', 12000, 0, 0, '2020-07-30 21:48:53', NULL),
(127, 1, NULL, NULL, 'HD127', 12000, 0, 0, '2020-07-30 21:50:19', NULL),
(128, 1, NULL, NULL, 'HD128', 0, 0, 0, '2020-07-30 21:50:30', NULL),
(129, 1, NULL, NULL, 'HD129', 12000, 0, 0, '2020-07-30 21:54:06', NULL),
(130, 1, NULL, NULL, 'HD130', 15000, 0, 0, '2020-07-30 21:55:18', NULL),
(131, 1, NULL, NULL, 'HD131', 27000, 0, 0, '2020-07-30 21:55:47', NULL),
(132, 1, NULL, NULL, 'HD132', 12000, 0, 0, '2020-07-30 21:57:24', NULL),
(133, 1, NULL, NULL, 'HD133', 12000, 0, 0, '2020-07-30 22:01:16', NULL),
(134, 1, NULL, NULL, 'HD134', 12000, 0, 0, '2020-07-30 22:01:55', NULL),
(135, 1, NULL, NULL, 'HD135', 12000, 0, 0, '2020-07-30 22:04:03', NULL),
(136, 1, NULL, NULL, 'HD136', 12000, 0, 0, '2020-07-30 22:06:21', NULL),
(137, 1, NULL, NULL, 'HD137', 54000, 0, 0, '2020-07-30 22:06:35', NULL),
(138, 1, NULL, NULL, 'HD138', 54000, 0, 0, '2020-07-30 22:06:47', NULL),
(139, 1, NULL, NULL, 'HD139', 54000, 0, 0, '2020-07-30 22:06:57', NULL),
(140, NULL, NULL, NULL, 'HD140', 68000, 0, 0, '2020-07-30 22:08:00', NULL),
(141, NULL, NULL, NULL, 'HD141', 68000, 0, 0, '2020-07-30 22:08:03', NULL),
(142, NULL, NULL, NULL, 'HD142', 80000, 0, 0, '2020-07-30 22:08:05', NULL),
(143, NULL, NULL, NULL, 'HD143', 80000, 0, 0, '2020-07-30 22:08:05', NULL),
(144, NULL, NULL, NULL, 'HD144', 80000, 0, 0, '2020-07-30 22:08:05', NULL),
(145, NULL, NULL, NULL, 'HD145', 80000, 0, 0, '2020-07-30 22:08:05', NULL),
(146, 1, NULL, NULL, 'HD146', 27000, 0, 0, '2020-07-30 22:09:45', NULL),
(147, 1, NULL, NULL, 'HD147', 81000, 0, 0, '2020-07-30 22:10:02', NULL),
(148, 1, NULL, NULL, 'HD148', 76000, 0, 0, '2020-07-30 22:10:13', NULL),
(149, 1, NULL, NULL, 'HD149', 54000, 0, 0, '2020-07-30 22:10:20', NULL),
(150, 1, NULL, NULL, 'HD150', 22000, 0, 0, '2020-07-30 22:10:27', NULL),
(151, 1, NULL, NULL, 'HD151', 42000, 0, 0, '2020-07-30 22:10:34', NULL),
(152, 1, NULL, NULL, 'HD152', 27000, 0, 0, '2020-07-30 22:10:43', NULL),
(153, 1, NULL, NULL, 'HD153', 12000, 0, 0, '2020-07-30 22:12:03', NULL),
(154, 1, NULL, NULL, 'HD154', 15000, 0, 0, '2020-07-30 22:12:08', NULL),
(155, 1, NULL, NULL, 'HD155', 15000, 0, 0, '2020-07-30 22:12:41', NULL),
(156, 1, NULL, NULL, 'HD156', 15000, 0, 0, '2020-07-30 22:12:46', NULL),
(157, 1, NULL, NULL, 'HD157', 0, 0, 0, '2020-07-30 22:12:57', NULL),
(158, 1, NULL, NULL, 'HD158', 39000, 0, 0, '2020-07-30 22:15:45', NULL),
(159, 1, NULL, NULL, 'HD159', 12000, 0, 0, '2020-07-30 22:15:57', NULL),
(160, 1, NULL, NULL, 'HD160', 15000, 0, 0, '2020-07-30 22:16:04', NULL),
(161, 1, NULL, NULL, 'HD161', 0, 0, 0, '2020-07-30 22:16:13', NULL),
(162, 1, NULL, NULL, 'HD162', 39000, 0, 0, '2020-07-30 22:18:45', NULL),
(163, 1, NULL, NULL, 'HD163', 10000, 0, 0, '2020-07-30 22:19:58', NULL),
(164, 1, NULL, NULL, 'HD164', 27000, 0, 0, '2020-07-30 22:20:20', NULL),
(165, 1, NULL, NULL, 'HD165', 12000, 0, 0, '2020-07-30 22:22:00', NULL),
(166, 1, NULL, NULL, 'HD166', 24000, 0, 0, '2020-07-30 22:22:55', NULL),
(167, 1, NULL, NULL, 'HD167', 54000, 2000000, 1946000, '2020-08-01 12:51:03', NULL),
(168, 1, NULL, NULL, 'HD168', 66000, 0, 0, '2020-08-01 12:51:12', NULL),
(169, 1, NULL, NULL, 'HD169', 24000, 0, 0, '2020-08-01 12:51:22', NULL),
(170, 1, NULL, NULL, 'HD170', 60000, 0, 0, '2020-08-01 12:51:32', NULL),
(171, 1, NULL, NULL, 'HD171', 24000, 0, 0, '2020-08-01 12:51:39', NULL),
(172, 1, NULL, NULL, 'HD172', 74000, 200000, 126000, '2020-08-01 14:51:45', NULL),
(173, 1, NULL, NULL, 'HD173', 62000, 0, 0, '2020-08-01 14:51:54', NULL),
(174, 1, NULL, NULL, 'HD174', 71000, 0, 0, '2020-08-01 14:52:06', NULL),
(175, 1, NULL, NULL, 'HD175', 27000, 200000, 173000, '2020-08-01 16:48:21', NULL),
(176, 1, NULL, NULL, 'HD176', 13000, 200000, 185000, '2020-08-01 16:48:56', NULL),
(177, 1, NULL, NULL, 'HD177', 54000, 200000, 146000, '2020-08-01 17:08:50', NULL),
(178, 1, 1, NULL, 'HD178', 30000, 200000, 170000, '2020-08-01 17:30:55', NULL),
(179, 1, NULL, NULL, 'HD179', 54000, 20000000, 19946000, '2020-08-01 17:38:36', NULL),
(180, 1, 1, NULL, 'HD180', 39000, 2000000, 1961000, '2020-08-01 17:45:05', NULL),
(181, 1, 1, NULL, 'HD181', 42000, 2000000, 1958000, '2020-08-01 17:47:24', NULL),
(182, 1, 2, NULL, 'HD182', 54000, 200000, 146000, '2020-08-01 17:53:11', NULL),
(183, 1, 2, NULL, 'HD183', 30000, 200000, 170000, '2020-08-01 17:54:47', NULL),
(184, 1, 1, NULL, 'HD184', 64000, 20000000, 19926000, '2020-08-01 17:55:28', NULL),
(185, 1, 2, NULL, 'HD185', 66000, 200000, 114000, '2020-08-01 17:57:04', NULL),
(186, 1, 1, NULL, 'HD186', 64000, 200000, 136000, '2020-08-01 18:02:47', NULL),
(187, 1, NULL, NULL, 'HD187', 105000, 200000, 95000, '2020-08-02 10:34:07', NULL),
(188, 1, NULL, NULL, 'HD188', 66000, 200000, 134000, '2020-08-16 16:39:06', NULL),
(189, 1, NULL, NULL, 'HD189', 90000, 100000, 10000, '2020-08-16 16:39:47', NULL),
(190, 1, NULL, NULL, 'HD190', 54000, 100000, 46000, '2020-08-17 10:45:39', NULL),
(191, 1, NULL, NULL, 'HD191', 54000, 200000, 146000, '2020-08-17 10:45:51', NULL),
(192, 1, 1, NULL, 'HD192', 146000, 200000, 54000, '2020-08-17 10:46:23', NULL),
(193, 1, 1, NULL, 'HD193', 60000, 200000, 140000, '2020-08-17 10:46:40', NULL),
(194, 1, 1, NULL, 'HD194', 81000, 100000, 19000, '2020-08-17 10:46:51', NULL);

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

--
-- Dumping data for table `orderdetail`
--

INSERT INTO `orderdetail` (`Id`, `Id_Order`, `Id_Stock`, `NameStock`, `Quantity`, `Prince`) VALUES
(1, 183, 1, 'Cà phê', 2, 15000),
(4, 184, 1, 'Cà phê', 2, 15000),
(5, 185, 1, 'Cà phê', 2, 15000),
(6, 185, 2, 'Coca', 3, 12000),
(7, 185, 3, 'Bánh plan', 2, 10000),
(8, 186, 1, 'Cà phê', 2, 15000),
(9, 186, 2, 'Coca', 2, 12000),
(10, 186, 3, 'Bánh plan', 1, 10000),
(11, 187, 1, 'Cà phê', 3, 15000),
(12, 187, 2, 'Coca', 5, 12000),
(13, 188, 2, 'Coca', 3, 12000),
(14, 188, 1, 'Cà phê', 2, 15000),
(15, 189, 1, 'Cà phê', 4, 15000),
(16, 189, 3, 'Bánh plan', 3, 10000),
(17, 190, 2, 'Coca', 2, 12000),
(18, 190, 1, 'Cà phê', 2, 15000),
(19, 191, 1, 'Cà phê', 2, 15000),
(20, 191, 2, 'Coca', 2, 12000),
(21, 192, 1, 'Cà phê', 5, 15000),
(22, 192, 2, 'Coca', 3, 12000),
(23, 192, 3, 'Bánh plan', 2, 10000),
(24, 192, 4, 'Xúc xích', 1, 15000),
(25, 193, 1, 'Cà phê', 4, 15000),
(26, 194, 1, 'Cà phê', 3, 15000),
(27, 194, 2, 'Coca', 3, 12000);

-- --------------------------------------------------------

--
-- Table structure for table `purchaseorder`
--

CREATE TABLE `purchaseorder` (
  `Id` int(11) NOT NULL,
  `SupplierId` int(11) DEFAULT NULL,
  `Code` text NOT NULL,
  `Status` int(11) NOT NULL,
  `TotalPrince` float NOT NULL,
  `Discount` float NOT NULL DEFAULT 0,
  `GivenPriceSupplier` float NOT NULL,
  `CreateDate` datetime NOT NULL DEFAULT current_timestamp(),
  `StatusDelete` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `purchaseorder`
--

INSERT INTO `purchaseorder` (`Id`, `SupplierId`, `Code`, `Status`, `TotalPrince`, `Discount`, `GivenPriceSupplier`, `CreateDate`, `StatusDelete`) VALUES
(1, 1, 'bttt', 1, 3000000, 0, 3000000, '2020-08-02 18:17:43', 0),
(2, 1, 'bbqq', 2, 3000000, 0, 3000000, '2020-08-02 18:17:43', 0),
(3, 1, '123', 2, 0, 0, 0, '2020-08-17 23:15:46', -1),
(4, 1, '234', 1, 0, 0, 0, '2020-08-17 23:15:55', -1),
(5, 1, '1233424', 2, 0, 0, 0, '2020-08-17 23:30:39', -1),
(6, 1, '26260', 3, 3000000, 123, 3000000, '2020-08-17 23:41:30', 0);

-- --------------------------------------------------------

--
-- Table structure for table `purchaseorderstatus`
--

CREATE TABLE `purchaseorderstatus` (
  `Id` int(11) NOT NULL,
  `Name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `purchaseorderstatus`
--

INSERT INTO `purchaseorderstatus` (`Id`, `Name`) VALUES
(1, 'Phiếu tạm'),
(2, 'Đã nhập hàng'),
(3, 'Đã hủy');

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
(3, 'sac', 'sacphan242@gmail.com', '2020-06-05', '222g Trần Hưng Đạo Quận 5', '0364990480', 'test', '$2a$10$2E9lCRrzC9GhgNlhjqmVbebmkxaq.4I0Zd5OYTCWCIauC2kn8c6Sa', 1),
(4, 'admin', 'admin@gmail.com', '2020-08-26', 'VIet nam', '1239032423', 'admin', '$2a$10$YJt/mlt/zGjsv.trsjTVoeabSBIUY40J/OtOnWdqwTkSKnWKlDTMG', 2);

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
  `Discount` float DEFAULT NULL,
  `PriceIn` float NOT NULL,
  `PriceOut` float NOT NULL,
  `Img` text NOT NULL DEFAULT '/Images/products/product.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`Id`, `Code`, `Name`, `CatID`, `CreateDate`, `Quantity`, `Discount`, `PriceIn`, `PriceOut`, `Img`) VALUES
(1, 'cf', 'Cà phê', 1, '2020-07-21', 50, NULL, 10000, 15000, '/Images/products/product.png'),
(2, 'cc', 'Coca', 1, '2020-07-21', 50, NULL, 8000, 12000, '/Images/products/product.png'),
(3, 'Bl', 'Bánh plan', 2, '2020-07-21', 50, NULL, 5000, 10000, '/Images/products/product.png'),
(4, 'xx', 'Xúc xích', 2, '2020-07-21', 50, NULL, 10000, 15000, '/Images/products/product.png');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `Id` int(11) NOT NULL,
  `Code` text NOT NULL,
  `Name` text NOT NULL,
  `Phone` text NOT NULL,
  `Address` text NOT NULL,
  `Email` text NOT NULL,
  `City` text NOT NULL,
  `TaxCode` text NOT NULL,
  `GroupSupplierId` int(11) NOT NULL,
  `Note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`Id`, `Code`, `Name`, `Phone`, `Address`, `Email`, `City`, `TaxCode`, `GroupSupplierId`, `Note`) VALUES
(1, 'bt', 'ba tan', '1235343534', '123123ewqadasd', 'sacdewrfae', '123ewqsad', '123', 1, '');

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
-- Indexes for table `purchaseorder`
--
ALTER TABLE `purchaseorder`
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
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
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
  MODIFY `Id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customertype`
--
ALTER TABLE `customertype`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `purchaseorder`
--
ALTER TABLE `purchaseorder`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
