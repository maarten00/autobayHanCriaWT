-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 02, 2012 at 12:31 AM
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
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `merk` varchar(15) NOT NULL,
  `type` varchar(20) NOT NULL,
  `brandstof` varchar(1) NOT NULL,
  `motorinhoud` int(12) NOT NULL,
  `vermogen` int(12) NOT NULL,
  `bouwjaar` varchar(4) NOT NULL,
  `kleur` varchar(15) NOT NULL,
  `fotoURL` varchar(50) NOT NULL,
  `vraagprijs` int(10) NOT NULL,
  `status` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=76 ;

--
-- Dumping data for table `autos`
--

INSERT INTO `autos` (`id`, `merk`, `type`, `brandstof`, `motorinhoud`, `vermogen`, `bouwjaar`, `kleur`, `fotoURL`, `vraagprijs`, `status`) VALUES
(1, 'Opel', 'Astra', 'D', 1700, 60, '2005', 'Zilver', 'images/auto1.jpg', 8700, 'aangeboden'),
(2, 'Opel', 'Astra', 'D', 1995, 60, '1999', 'Blauw', 'images/auto2.jpg', 5500, 'aangeboden'),
(3, 'Opel', 'Astra', 'D', 1910, 60, '2006', 'Zilver', 'images/auto3.jpg', 9800, 'aangeboden'),
(4, 'Opel', 'Astra', 'G', 1364, 60, '2006', 'Zilver', 'images/auto4.jpg', 8700, 'aangeboden'),
(5, 'Opel', 'Vectra', 'B', 1796, 88, '2002', 'Zwart', 'images/auto5.jpg', 10500, 'aangeboden'),
(6, 'Opel', 'Vectra', 'D', 74, 1985, '2004', 'Grijs', 'images/auto6.jpg', 9400, 'aangeboden'),
(7, 'Opel', 'Vectra', 'B', 2597, 126, '2001', 'Zilver', 'images/auto7.jpg', 12000, 'aangeboden'),
(8, 'Volkswagen', 'Golf', 'D', 1896, 72, '2005', 'Zwart', 'images/auto8.jpg', 7600, 'aangeboden'),
(9, 'Volkswagen', 'Golf', 'D', 1968, 72, '2005', 'Zilver', 'images/auto9.jpg', 7700, 'aangeboden'),
(10, 'Volkswagen', 'Golf', 'D', 1985, 66, '2004', 'Blauw', 'images/auto10.jpg', 6700, 'aangeboden'),
(11, 'Volkswagen', 'Golf', 'D', 1968, 66, '2005', 'Zwart', 'images/auto11.jpg', 6500, 'aangeboden'),
(12, 'Volkswagen', 'Golf', 'D', 1986, 74, '2005', 'Zwart', 'images/auto12.jpg', 7600, 'aangeboden'),
(13, 'Volkswagen', 'Passat', 'D', 1896, 100, '2005', 'Zwart', 'images/auto13.jpg', 11500, 'aangeboden'),
(14, 'Volkswagen', 'Passat', 'D', 1896, 100, '2006', 'Blauw', 'images/auto14.jpg', 12000, 'aangeboden'),
(15, 'Volkswagen', 'Passat', 'D', 2500, 150, '2005', 'Zwart', 'images/auto15.jpg', 14500, 'aangeboden'),
(16, 'Volkswagen', 'Passat', 'D', 1968, 103, '2006', 'Rood', 'images/auto16.jpg', 14000, 'aangeboden'),
(17, 'Ferrari', 'Maranello', 'B', 5474, 350, '1998', 'Rood', 'images/auto17.jpg', 76000, 'verkocht'),
(18, 'Ferrari', 'Maranello', 'B', 5474, 330, '1996', 'Blauw', 'images/auto18.jpg', 45000, 'verkocht'),
(19, 'Ferrari', 'Scuderia', 'B', 4308, 372, '2008', 'Rood', 'images/auto19.jpg', 180000, 'aangeboden'),
(20, 'Maserati', 'onbekend', 'B', 4244, 300, '2004', 'Zwart', 'images/auto20.jpg', 76000, 'verkocht'),
(21, 'Maserati', 'Gibli', 'B', 4600, 325, '1997', 'Zilver', 'images/auto21.jpg', 23000, 'verkocht'),
(22, 'Jaguar', 'E-type', 'B', 5343, 230, '1973', 'Groen', 'images/auto22.jpg', 55000, 'aangeboden'),
(23, 'Jaguar', 'E-type', 'B', 4534, 180, '1967', 'Groen', 'images/auto23.jpg', 45000, 'aangeboden'),
(24, 'Porsche', '911', 'B', 3600, 250, '1989', 'Rood', 'images/auto24.jpg', 23000, 'aangeboden'),
(25, 'Porsche', '911', 'B', 3600, 200, '1994', 'Zwart', 'images/auto25.jpg', 22000, 'aangeboden'),
(39, 'Koenigsegg', 'Agera R', 'B', 5000, 1100, '2011', 'Wit-Zwart', 'images/auto37', 1000000, 'aangeboden');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
