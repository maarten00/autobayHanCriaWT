-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 23, 2012 at 01:15 PM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `autobay`
--

-- --------------------------------------------------------

--
-- Table structure for table `autos`
--

CREATE TABLE IF NOT EXISTS `autos` (
  `id` int(10) NOT NULL,
  `merk` varchar(15) NOT NULL,
  `type` varchar(20) NOT NULL,
  `brandstof` varchar(1) NOT NULL,
  `motorinhoud` int(12) NOT NULL,
  `vermogen` int(12) NOT NULL,
  `bouwjaar` varchar(4) NOT NULL,
  `kleur` varchar(15) NOT NULL,
  `fotoURL` varchar(50) NOT NULL,
  `vraagprijs` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `autos`
--

INSERT INTO `autos` (`id`, `merk`, `type`, `brandstof`, `motorinhoud`, `vermogen`, `bouwjaar`, `kleur`, `fotoURL`, `vraagprijs`) VALUES
(0, 'Opel', 'Astra', 'D', 1700, 60, '2005', 'Zilver', 'images/auto1.jpg', 8700),
(2, 'Opel', 'Astra', 'D', 1995, 60, '1999', 'Blauw', 'images/auto2.jpg', 5500),
(3, 'Opel', 'Astra', 'D', 1910, 60, '2006', 'Zilver', 'images/auto3.jpg', 9800),
(4, 'Opel', 'Astra', 'G', 1364, 60, '2006', 'Zilver', 'images/auto4.jpg', 8700),
(5, 'Opel', 'Vectra', 'B', 1796, 88, '2002', 'Zwart', 'images/auto5.jpg', 10500),
(6, 'Opel', 'Vectra', 'D', 74, 1985, '2004', 'Grijs', 'images/auto6.jpg', 9400),
(7, 'Opel', 'Vectra', 'B', 2597, 126, '2001', 'Zilver', 'images/auto7.jpg', 12000),
(8, 'Volkswagen', 'Golf', 'D', 1896, 72, '2005', 'Zwart', 'images/auto8.jpg', 7600),
(9, 'Volkswagen', 'Golf', 'D', 1968, 72, '2005', 'Zilver', 'images/auto9.jpg', 7700),
(10, 'Volkswagen', 'Golf', 'D', 1985, 66, '2004', 'Blauw', 'images/auto10.jpg', 6700),
(11, 'Volkswagen', 'Golf', 'D', 1968, 66, '2005', 'Zwart', 'images/auto11.jpg', 6500),
(12, 'Volkswagen', 'Golf', 'D', 1986, 74, '2005', 'Zwart', 'images/auto12.jpg', 7600),
(13, 'Volkswagen', 'Passat', 'D', 1896, 100, '2005', 'Zwart', 'images/auto13.jpg', 11500),
(14, 'Volkswagen', 'Passat', 'D', 1896, 100, '2006', 'Blauw', 'images/auto14.jpg', 12000),
(15, 'Volkswagen', 'Passat', 'D', 2500, 150, '2005', 'Zwart', 'images/auto15.jpg', 14500),
(16, 'Volkswagen', 'Passat', 'D', 1968, 103, '2006', 'Rood', 'images/auto16.jpg', 14000),
(17, 'Ferrari', 'Maranello', 'B', 5474, 350, '1998', 'Rood', 'images/auto17.jpg', 76000),
(18, 'Ferrari', 'Maranello', 'B', 5474, 330, '1996', 'Blauw', 'images/auto18.jpg', 45000),
(19, 'Ferrari', 'Scuderia', 'B', 4308, 372, '2008', 'Rood', 'images/auto19.jpg', 180000),
(20, 'Maserati', 'onbekend', 'B', 4244, 300, '2004', 'Zwart', 'images/auto20.jpg', 76000),
(21, 'Maserati', 'Gibli', 'B', 4600, 325, '1997', 'Zilver', 'images/auto21.jpg', 23000),
(22, 'Jaguar', 'E-type', 'B', 5343, 230, '1973', 'Groen', 'images/auto22.jpg', 55000),
(23, 'Jaguar', 'E-type', 'B', 4534, 180, '1967', 'Groen', 'images/auto23.jpg', 45000),
(24, 'Porsche', '911', 'B', 3600, 250, '1989', 'Rood', 'images/auto24.jpg', 23000),
(25, 'Porsche', '911', 'B', 3600, 200, '1994', 'Zwart', 'images/auto25.jpg', 22000);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`) VALUES
('maarten', '123');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
