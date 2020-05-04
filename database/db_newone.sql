-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-05-2020 a las 02:56:41
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_newone`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bloque`
--

CREATE TABLE `bloque` (
  `id` int(11) NOT NULL,
  `prevhash` varchar(100) DEFAULT NULL,
  `acthash` varchar(100) DEFAULT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_Minero` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `bloque`
--

INSERT INTO `bloque` (`id`, `prevhash`, `acthash`, `fechaCreacion`, `id_Minero`) VALUES
(1, '0', '8217ae6814f53b3ebe55da1a173b8db1f2bed30527156208fd87893c50f25838', '2020-05-04 00:28:55', 1),
(2, '8217ae6814f53b3ebe55da1a173b8db1f2bed30527156208fd87893c50f25838', 'b93a8edde537a8ec64f23565a9e52aec82b55697e2f6446ed81e5cdeb0e36d6b', '2020-05-03 23:37:41', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transacciones`
--

CREATE TABLE `transacciones` (
  `idTrans` int(11) NOT NULL,
  `origen` varchar(150) DEFAULT NULL,
  `destino` varchar(50) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `transacciones`
--

INSERT INTO `transacciones` (`idTrans`, `origen`, `destino`, `cantidad`, `id`) VALUES
(1, '#llavepublicaorigen', '#llavedealguien', 20, 1),
(2, '12323131', 'llavepublicadealguien', 2147483647, 1),
(3, NULL, 'llavepublicadealguien', 12323, 1),
(4, NULL, 'llavepublicadealguien1', 123312312, 1),
(5, NULL, 'Elon Musk', 8000000, 1),
(6, '0468480d6c4bb8a73faf05c0fc5bc5cfb558098d57d2689b5ffb799fa66e57545f6156b72d4202bfd2a5f4d51b6db71552d8c70dc653d4c1cda73b82cff2f0d766', 'Elon Musk', 123123, 1),
(7, '0468480d6c4bb8a73faf05c0fc5bc5cfb558098d57d2689b5ffb799fa66e57545f6156b72d4202bfd2a5f4d51b6db71552d8c70dc653d4c1cda73b82cff2f0d766', 'llavepublicadealguien', 32112312, 1),
(8, '0468480d6c4bb8a73faf05c0fc5bc5cfb558098d57d2689b5ffb799fa66e57545f6156b72d4202bfd2a5f4d51b6db71552d8c70dc653d4c1cda73b82cff2f0d766', 'llavepublicadealguien1', 312312312, 1),
(9, '0468480d6c4bb8a73faf05c0fc5bc5cfb558098d57d2689b5ffb799fa66e57545f6156b72d4202bfd2a5f4d51b6db71552d8c70dc653d4c1cda73b82cff2f0d766', 'adadawd', 1213123, 1),
(10, '0468480d6c4bb8a73faf05c0fc5bc5cfb558098d57d2689b5ffb799fa66e57545f6156b72d4202bfd2a5f4d51b6db71552d8c70dc653d4c1cda73b82cff2f0d766', 'Steve Wozniak', 323123123, 1),
(11, '0468480d6c4bb8a73faf05c0fc5bc5cfb558098d57d2689b5ffb799fa66e57545f6156b72d4202bfd2a5f4d51b6db71552d8c70dc653d4c1cda73b82cff2f0d766', 'Dennis B Ritchie', 312312312, 2),
(12, 'YO', '#331312312312adawdadw', 2312313, 2),
(13, '0468480d6c4bb8a73faf05c0fc5bc5cfb558098d57d2689b5ffb799fa66e57545f6156b72d4202bfd2a5f4d51b6db71552d8c70dc653d4c1cda73b82cff2f0d766', '#321eedadawdbawdwada', 2147483647, 2),
(14, 'Me', 'c31323131314bbfhdfhy3y4y3', 1200, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bloque`
--
ALTER TABLE `bloque`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD PRIMARY KEY (`idTrans`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bloque`
--
ALTER TABLE `bloque`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  MODIFY `idTrans` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD CONSTRAINT `transacciones_ibfk_1` FOREIGN KEY (`id`) REFERENCES `bloque` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
