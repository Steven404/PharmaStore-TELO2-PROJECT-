-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: 127.0.0.1
-- Χρόνος δημιουργίας: 31 Μάη 2020 στις 14:56:16
-- Έκδοση διακομιστή: 10.4.11-MariaDB
-- Έκδοση PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `pharmacy`
--
CREATE DATABASE IF NOT EXISTS `pharmacy` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `pharmacy`;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `clients`
--

CREATE TABLE `clients` (
  `pharmacyName` varchar(40) CHARACTER SET latin1 NOT NULL,
  `phoneNo` varchar(15) CHARACTER SET latin1 DEFAULT NULL CHECK (octet_length(`phoneNo`) = 10),
  `address` varchar(40) CHARACTER SET latin1 NOT NULL,
  `numberOfOrders` int(11) DEFAULT NULL,
  `zipCode` varchar(5) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Άδειασμα δεδομένων του πίνακα `clients`
--

INSERT INTO `clients` (`pharmacyName`, `phoneNo`, `address`, `numberOfOrders`, `zipCode`) VALUES('Anastasia Anastasiou', '6948518120', 'Anastasiou 20', 2, '57019');
INSERT INTO `clients` (`pharmacyName`, `phoneNo`, `address`, `numberOfOrders`, `zipCode`) VALUES('Giannhs Giannopoulos', '2392023010', 'Giannopoulou 49', 2, '65404');
INSERT INTO `clients` (`pharmacyName`, `phoneNo`, `address`, `numberOfOrders`, `zipCode`) VALUES('Pasxalhs Pasxalidhs', '2392024179', 'Pasxalidou 19', 2, '59999');
INSERT INTO `clients` (`pharmacyName`, `phoneNo`, `address`, `numberOfOrders`, `zipCode`) VALUES('Petridhs Petros', '2392023920', 'Petroudoulou 28', 1, '42042');
INSERT INTO `clients` (`pharmacyName`, `phoneNo`, `address`, `numberOfOrders`, `zipCode`) VALUES('Stefanos M', '6950363602', 'Paragouah 45', 2, '42424');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `invoices`
--

CREATE TABLE `invoices` (
  `invoiceID` int(11) NOT NULL,
  `orderID` int(11) NOT NULL,
  `pharName` varchar(40) CHARACTER SET latin1 NOT NULL,
  `regDate` date DEFAULT NULL,
  `finalPrice` double(5,2) NOT NULL,
  `Tax` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `orderproductsbought`
--

CREATE TABLE `orderproductsbought` (
  `orderID` int(11) NOT NULL,
  `productN` varchar(40) CHARACTER SET latin1 NOT NULL,
  `piecesBought` int(11) NOT NULL,
  `oCost` double(5,2) DEFAULT NULL,
  `oEarnings` double(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Άδειασμα δεδομένων του πίνακα `orderproductsbought`
--

INSERT INTO `orderproductsbought` (`orderID`, `productN`, `piecesBought`, `oCost`, `oEarnings`) VALUES(1, 'Algofren', 15, 67.50, 58.50);
INSERT INTO `orderproductsbought` (`orderID`, `productN`, `piecesBought`, `oCost`, `oEarnings`) VALUES(1, 'Modular', 2, 13.00, 11.00);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `orders`
--

CREATE TABLE `orders` (
  `orderID` int(11) NOT NULL,
  `pharName` varchar(40) CHARACTER SET latin1 DEFAULT NULL,
  `pharAddress` varchar(40) CHARACTER SET latin1 DEFAULT NULL,
  `distributor` varchar(25) CHARACTER SET latin1 DEFAULT NULL,
  `orderCost` double(10,2) DEFAULT NULL,
  `cleanEarnings` double(10,2) DEFAULT NULL,
  `orderDate` date DEFAULT NULL,
  `orderZipCode` varchar(5) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Άδειασμα δεδομένων του πίνακα `orders`
--

INSERT INTO `orders` (`orderID`, `pharName`, `pharAddress`, `distributor`, `orderCost`, `cleanEarnings`, `orderDate`, `orderZipCode`) VALUES(1, 'Pasxalhs Pasxalidhs', 'Pasxalidou 19', 'SPEEDWAGON FOUNDATIONS', 80.50, 69.50, '2020-04-29', '59999');
INSERT INTO `orders` (`orderID`, `pharName`, `pharAddress`, `distributor`, `orderCost`, `cleanEarnings`, `orderDate`, `orderZipCode`) VALUES(2, 'Stefanos M', 'Paragouah 45', 'SPEEDWAGON FOUNDATIONS', NULL, NULL, '2020-04-27', '42424');
INSERT INTO `orders` (`orderID`, `pharName`, `pharAddress`, `distributor`, `orderCost`, `cleanEarnings`, `orderDate`, `orderZipCode`) VALUES(3, 'Giannhs Giannopoulos', 'Giannopoulou 49', 'SPEEDWAGON FOUNDATIONS', NULL, NULL, '2020-04-26', '65404');
INSERT INTO `orders` (`orderID`, `pharName`, `pharAddress`, `distributor`, `orderCost`, `cleanEarnings`, `orderDate`, `orderZipCode`) VALUES(4, 'Petridhs Petros', 'Petroudoulou 28', 'SPEEDWAGON FOUNDATIONS', NULL, NULL, '2020-05-01', '42042');
INSERT INTO `orders` (`orderID`, `pharName`, `pharAddress`, `distributor`, `orderCost`, `cleanEarnings`, `orderDate`, `orderZipCode`) VALUES(5, 'Giannhs Giannopoulos', 'Giannopoulou 49', 'SPEEDWAGON FOUNDATIONS', NULL, NULL, '2020-04-26', '65404');
INSERT INTO `orders` (`orderID`, `pharName`, `pharAddress`, `distributor`, `orderCost`, `cleanEarnings`, `orderDate`, `orderZipCode`) VALUES(6, 'Anastasia Anastasiou', 'Anastasiou 20', 'SPEEDWAGON FOUNDATIONS', NULL, NULL, '2020-04-28', '57019');
INSERT INTO `orders` (`orderID`, `pharName`, `pharAddress`, `distributor`, `orderCost`, `cleanEarnings`, `orderDate`, `orderZipCode`) VALUES(7, 'Stefanos M', 'Paragouah 45', 'SPEEDWAGON FOUNDATIONS', NULL, NULL, '2020-04-27', '42424');
INSERT INTO `orders` (`orderID`, `pharName`, `pharAddress`, `distributor`, `orderCost`, `cleanEarnings`, `orderDate`, `orderZipCode`) VALUES(8, 'Anastasia Anastasiou', 'Anastasiou 20', 'SPEEDWAGON FOUNDATIONS', NULL, NULL, '2020-04-30', '57019');
INSERT INTO `orders` (`orderID`, `pharName`, `pharAddress`, `distributor`, `orderCost`, `cleanEarnings`, `orderDate`, `orderZipCode`) VALUES(9, 'Pasxalhs Pasxalidhs', 'Pasxalidou 19', 'SPEEDWAGON FOUNDATIONS', NULL, NULL, '2020-04-28', '59999');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `permissions`
--

CREATE TABLE `permissions` (
  `username` varchar(15) CHARACTER SET latin1 DEFAULT NULL,
  `permission1` tinyint(1) DEFAULT NULL,
  `permission2` tinyint(1) DEFAULT NULL,
  `permission3` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Άδειασμα δεδομένων του πίνακα `permissions`
--

INSERT INTO `permissions` (`username`, `permission1`, `permission2`, `permission3`) VALUES('ADMIN', 1, 1, 1);
INSERT INTO `permissions` (`username`, `permission1`, `permission2`, `permission3`) VALUES('StevenHGrey404', 1, 1, 1);
INSERT INTO `permissions` (`username`, `permission1`, `permission2`, `permission3`) VALUES('SSGG2', 0, 0, 0);
INSERT INTO `permissions` (`username`, `permission1`, `permission2`, `permission3`) VALUES('Steven42', 1, 1, 1);
INSERT INTO `permissions` (`username`, `permission1`, `permission2`, `permission3`) VALUES('ParZo22', 1, 1, 1);
INSERT INTO `permissions` (`username`, `permission1`, `permission2`, `permission3`) VALUES('Stefanos2', NULL, NULL, NULL);
INSERT INTO `permissions` (`username`, `permission1`, `permission2`, `permission3`) VALUES('Pazoh23', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `products`
--

CREATE TABLE `products` (
  `productName` varchar(70) CHARACTER SET latin1 NOT NULL,
  `piecesSold` int(11) DEFAULT NULL,
  `provider` varchar(40) CHARACTER SET latin1 DEFAULT NULL,
  `costPricePerPiece` double(5,2) DEFAULT NULL,
  `sellPricePerPiece` double(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Άδειασμα δεδομένων του πίνακα `products`
--

INSERT INTO `products` (`productName`, `piecesSold`, `provider`, `costPricePerPiece`, `sellPricePerPiece`) VALUES('Algofren', 15, 'Stefanos Michelakis', 0.60, 4.50);
INSERT INTO `products` (`productName`, `piecesSold`, `provider`, `costPricePerPiece`, `sellPricePerPiece`) VALUES('Depon', NULL, 'Stefanos Stefanidhs', 2.00, 10.00);
INSERT INTO `products` (`productName`, `piecesSold`, `provider`, `costPricePerPiece`, `sellPricePerPiece`) VALUES('Insuline', NULL, 'Stefanos Michelakis', 1.00, 10.00);
INSERT INTO `products` (`productName`, `piecesSold`, `provider`, `costPricePerPiece`, `sellPricePerPiece`) VALUES('Modular', 2, 'Stefanos Michelakis', 1.00, 6.50);
INSERT INTO `products` (`productName`, `piecesSold`, `provider`, `costPricePerPiece`, `sellPricePerPiece`) VALUES('Zanax', NULL, 'Stefanos Michelakis', 1.00, 10.00);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `providers`
--

CREATE TABLE `providers` (
  `providerName` varchar(40) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Άδειασμα δεδομένων του πίνακα `providers`
--

INSERT INTO `providers` (`providerName`) VALUES('Kwnstantinos Kwnstantinidhs');
INSERT INTO `providers` (`providerName`) VALUES('Stefanos Michelakis');
INSERT INTO `providers` (`providerName`) VALUES('Stefanos Stefanidhs');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users`
--

CREATE TABLE `users` (
  `username` varchar(15) CHARACTER SET latin1 NOT NULL,
  `firstlastname` varchar(40) CHARACTER SET latin1 NOT NULL,
  `password` varchar(250) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Άδειασμα δεδομένων του πίνακα `users`
--

INSERT INTO `users` (`username`, `firstlastname`, `password`) VALUES('ADMIN', 'Papadopoulos Giorgos', '$2b$10$gYyL3A7uMB2KTjLrV5AqpuLktaTnoZgJDVxv.XuomndPPMWoxtHti');
INSERT INTO `users` (`username`, `firstlastname`, `password`) VALUES('ParZo22', 'Paris Zohros', '$2b$10$DzQRKRNwmXeCQ0ZfYfFlgukMG80nEHjAK9uE0RzYUOAS/bGi9gPvO');
INSERT INTO `users` (`username`, `firstlastname`, `password`) VALUES('Pazoh23', 'Paris Zohros23', '$2b$10$pFlwR.vRmwr.kHAtXeRx6Ow0L2VfOeBk5k/BRDx65HuJxx.ONXKve');
INSERT INTO `users` (`username`, `firstlastname`, `password`) VALUES('SSGG2', 'Sasha Grey', '$2b$10$q2RNyHAZLvqVxlA8aX5alO4CmcSlT47M7gyzn9IOGBIfj4i2sVjNi');
INSERT INTO `users` (`username`, `firstlastname`, `password`) VALUES('Stefanos2', 'Stefanos2', '$2b$10$gdYNKRvoP5C3yR/mwA5SjOE50U1K3fe4v7ktDIe9qI.zkSAbRxa16');
INSERT INTO `users` (`username`, `firstlastname`, `password`) VALUES('Steven42', 'Stefanos Mich', '$2b$10$TwrkvdB3wQx9Tf4wFUl7IuaZCrNCM3YD4g7E2sc46Y6NkTLutzTzi');
INSERT INTO `users` (`username`, `firstlastname`, `password`) VALUES('StevenHGrey404', 'Stefanos Michelakis', '$2b$10$ntNOsvF.VJP.76Bs3Z46QO/FUbc82Pb0eyvdA1ik3bAXtdlsw1.Mi');

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`pharmacyName`),
  ADD UNIQUE KEY `address` (`address`),
  ADD UNIQUE KEY `phoneNo` (`phoneNo`);

--
-- Ευρετήρια για πίνακα `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`invoiceID`),
  ADD KEY `orderID` (`orderID`),
  ADD KEY `pharName` (`pharName`);

--
-- Ευρετήρια για πίνακα `orderproductsbought`
--
ALTER TABLE `orderproductsbought`
  ADD PRIMARY KEY (`orderID`,`productN`),
  ADD KEY `productN` (`productN`);

--
-- Ευρετήρια για πίνακα `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `pharName` (`pharName`);

--
-- Ευρετήρια για πίνακα `permissions`
--
ALTER TABLE `permissions`
  ADD UNIQUE KEY `username` (`username`);

--
-- Ευρετήρια για πίνακα `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productName`),
  ADD KEY `provider` (`provider`);

--
-- Ευρετήρια για πίνακα `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`providerName`);

--
-- Ευρετήρια για πίνακα `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `firstlastname` (`firstlastname`);

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`),
  ADD CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`pharName`) REFERENCES `clients` (`pharmacyName`);

--
-- Περιορισμοί για πίνακα `orderproductsbought`
--
ALTER TABLE `orderproductsbought`
  ADD CONSTRAINT `orderproductsbought_ibfk_1` FOREIGN KEY (`productN`) REFERENCES `products` (`productName`),
  ADD CONSTRAINT `orderproductsbought_ibfk_2` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`);

--
-- Περιορισμοί για πίνακα `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`pharName`) REFERENCES `clients` (`pharmacyName`);

--
-- Περιορισμοί για πίνακα `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`);

--
-- Περιορισμοί για πίνακα `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`provider`) REFERENCES `providers` (`providerName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
