-- Adminer 4.8.1 MySQL 8.0.29 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `agentRecharge`;
CREATE TABLE `agentRecharge` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_code` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `amount` bigint DEFAULT NULL,
  `status` int DEFAULT NULL,
  `createdAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688215945031',
  `updatedAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688215945031',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `agentRecharge` (`id`, `phone`, `order_code`, `amount`, `status`, `createdAt`, `updatedAt`) VALUES
(1,	'0905555555',	'20230701BQIEZG74819',	50000,	2,	'2023-07-01 20:43:07',	'2023-07-01 20:43:30'),
(2,	'0905555555',	'20230701EJITM8IOXX3',	50000,	1,	'2023-07-01 20:43:55',	'2023-07-01 21:15:55'),
(3,	'0905555555',	'20230701GQRM0KZ22I6',	500000000,	1,	'2023-07-01 22:35:50',	'2023-07-01 22:36:00');

DROP TABLE IF EXISTS `agentWithdraw`;
CREATE TABLE `agentWithdraw` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_code` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `amount` bigint DEFAULT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name_bank` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `number_bank` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int DEFAULT NULL,
  `createdAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688215945103',
  `updatedAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688215945103',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `agentWithdraw` (`id`, `order_code`, `phone`, `amount`, `full_name`, `name_bank`, `number_bank`, `status`, `createdAt`, `updatedAt`) VALUES
(1,	'202307017LXRI6C9IVG',	'0905555555',	50000,	'dasd',	'adasd',	'ad',	3,	'2023-07-01 21:29:49',	'2023-07-01 22:34:42'),
(2,	'20230701KNM854RMC8D',	'0905555555',	50000,	'dasd',	'adasd',	'ad',	3,	'2023-07-01 22:36:34',	'2023-07-01 22:37:11'),
(3,	'20230701K3LQ0ZP55AR',	'0905555555',	50000,	'dasd',	'adasd',	'ad',	3,	'2023-07-01 23:44:19',	'2023-07-01 23:44:25'),
(4,	'20230701FLYCJ8FO6C1',	'0905555555',	50000,	'dasd',	'adasd',	'ad',	3,	'2023-07-01 23:45:54',	'2023-07-01 23:45:59'),
(5,	'2023070101CS33CMYPX',	'0905555555',	50000,	'dasd',	'adasd',	'ad',	3,	'2023-07-01 23:49:53',	'2023-07-01 23:49:57'),
(6,	'20230701FV9C128APOR',	'0905555555',	50000,	'dasd',	'adasd',	'ad',	3,	'2023-07-01 23:59:10',	'2023-07-01 23:59:14'),
(7,	'2023070235T0NP96K8Y',	'0905555555',	50000,	'dasd',	'adasd',	'ad',	3,	'2023-07-02 00:04:02',	'2023-07-02 00:04:05'),
(8,	'20230702BP2WJV9XC7U',	'0905555555',	50000,	'dasd',	'adasd',	'ad',	3,	'2023-07-02 00:08:00',	'2023-07-02 00:08:04');

DROP TABLE IF EXISTS `Banks`;
CREATE TABLE `Banks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name_bank` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `number_bank` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `wallet_usdt` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688215945140',
  `updatedAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688215945140',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `Banks` (`id`, `phone`, `full_name`, `name_bank`, `number_bank`, `wallet_usdt`, `createdAt`, `updatedAt`) VALUES
(1,	'0988765224',	'Bùi Thị Liên',	'Vietcombank',	'1018009960',	'',	'2023-06-12 10:24:23',	'2023-06-12 10:24:23'),
(4,	'0962292688',	'VUONG QUOC TUAN',	'Vietcombank ',	'00083000720688',	'',	'2023-06-12 10:38:22',	'2023-06-12 10:38:22'),
(5,	'0989314097',	'0989314097',	'MB bank',	'BUIMANHHUNG',	'',	'2023-06-12 12:01:21',	'2023-06-12 12:01:21'),
(6,	'0963258147',	'0989314099',	'vietcombank',	'NGUYENMINHLONG',	'',	'2023-06-12 12:55:43',	'2023-06-12 12:55:43'),
(7,	'0866107775',	'Nguyễn Thành Đạt ',	'MB Bank',	'0989314096',	'',	'2023-06-12 13:26:18',	'2023-06-12 13:26:18'),
(8,	'0356035888',	'NGUYEN TUAN PHONG',	'MB bank',	'0935666789',	'',	'2023-06-12 13:54:17',	'2023-06-12 13:54:17'),
(10,	'0337479979',	'Phạm thị lý ',	'Sacombank ',	'050027336296',	'',	'2023-06-12 14:42:01',	'2023-06-12 14:42:01'),
(11,	'0911313318',	'Lê Thị Tuyết Nhung ',	'ACB- Ngân hàng Á Châu ',	'2744427',	'',	'2023-06-12 21:28:39',	'2023-06-12 21:28:39'),
(12,	'0906068230',	'BUI THI LIEN',	'Vietcombank',	'1018009960',	'',	'2023-06-12 22:01:31',	'2023-06-12 22:01:31'),
(13,	'0986460915',	'NGUYEN THI YEN NHI',	'VIETINBANK',	'108869889099',	'',	'2023-06-13 11:35:11',	'2023-06-13 11:35:11'),
(14,	'0334497924',	'Trần Thị Ngọc Giàu',	'Sacombank',	'070050422702',	'',	'2023-06-13 14:31:50',	'2023-06-13 14:31:50'),
(15,	'0337610436',	'Dương Thanh Thủy ',	'Ngân hàng ACB ',	'13186',	'',	'2023-06-13 15:42:45',	'2023-06-13 15:42:45'),
(16,	'0373986085',	'Bùi  Thị Liên ',	'Vietcombank',	'1018009960',	'',	'2023-06-13 21:41:09',	'2023-06-13 21:41:09'),
(17,	'0905555555',	'dasddasdas',	'adasdsadasdsad',	'addsad',	'dasdasddasdsdasdasdsadasdasd',	'2023-07-01 20:46:09',	'2023-07-07 00:09:28');

DROP TABLE IF EXISTS `Carts`;
CREATE TABLE `Carts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint DEFAULT NULL,
  `product_type` int DEFAULT NULL,
  `full_price` bigint DEFAULT NULL,
  `sale_price` bigint DEFAULT NULL,
  `agent_id` bigint DEFAULT NULL,
  `event_id` bigint DEFAULT NULL,
  `createdAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688215945174',
  `updatedAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688215945174',
  `is_closed` tinyint(1) DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `Carts` (`id`, `product_id`, `product_type`, `full_price`, `sale_price`, `agent_id`, `event_id`, `createdAt`, `updatedAt`, `is_closed`, `customer_id`) VALUES
(1,	18,	3,	262327000,	13116350,	3,	1,	'2023-07-03 22:56:49',	'2023-07-03 23:26:05',	1,	4),
(2,	17,	3,	185902000,	9295100,	3,	1,	'2023-07-03 22:56:57',	'2023-07-03 23:26:05',	1,	4);

DROP TABLE IF EXISTS `Conversations`;
CREATE TABLE `Conversations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `conversation_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sender` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `receiver` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `eventSales`;
CREATE TABLE `eventSales` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `agent_id` bigint DEFAULT NULL,
  `percent_sale` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `expired_at` datetime DEFAULT NULL,
  `listProductType` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `eventSales` (`id`, `agent_id`, `percent_sale`, `created_at`, `expired_at`, `listProductType`, `customer_id`) VALUES
(1,	3,	5,	'2023-07-03 22:55:59',	'2023-07-10 23:25:59',	'1',	4);

DROP TABLE IF EXISTS `Messages`;
CREATE TABLE `Messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sender` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `file` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `file_type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `agent_id` int DEFAULT '0',
  `customer_id` int DEFAULT '0',
  `createdAt` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updatedAt` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `support_id` bigint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `Messages` (`id`, `content`, `sender`, `file`, `file_type`, `agent_id`, `customer_id`, `createdAt`, `updatedAt`, `support_id`) VALUES
(1,	'hi',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:04:13',	'2023-07-02 12:04:13',	0),
(2,	'hi',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:04:27',	'2023-07-02 12:04:27',	0),
(3,	'hi',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:05:26',	'2023-07-02 12:05:26',	0),
(4,	'hi',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:34:30',	'2023-07-02 12:34:30',	0),
(5,	'd',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:34:57',	'2023-07-02 12:34:57',	0),
(6,	'dasdasd',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:35:35',	'2023-07-02 12:35:35',	0),
(7,	'dsadasd',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:38:48',	'2023-07-02 12:38:48',	0),
(8,	'dsadasd',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:39:18',	'2023-07-02 12:39:18',	0),
(9,	'dasdasd',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:39:50',	'2023-07-02 12:39:50',	0),
(10,	'dsadsad',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:40:39',	'2023-07-02 12:40:39',	0),
(11,	'dsadsad',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:41:37',	'2023-07-02 12:41:37',	0),
(12,	'dsadsad',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:44:04',	'2023-07-02 12:44:04',	0),
(13,	'CSKH của sàn thương mại điện tử Tiki xin kính chào quý khách chúng tôi có thể giúp gì được cho quý khách hàng ạ.',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:46:47',	'2023-07-02 12:46:47',	0),
(14,	'CSKH của sàn thương mại điện tử Tiki xin kính chào quý khách chúng tôi có thể giúp gì được cho quý khách hàng ạ.',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:47:17',	'2023-07-02 12:47:17',	0),
(15,	'dasdasd',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 12:58:43',	'2023-07-02 12:58:43',	0),
(16,	'dasdasdasdasdasdasdsda',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 13:00:24',	'2023-07-02 13:00:24',	0),
(17,	'dasdasdasdasdsadasd',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 13:01:09',	'2023-07-02 13:01:09',	0),
(18,	'dasdsdasd',	'0905555555',	NULL,	NULL,	0,	0,	'2023-07-02 13:03:33',	'2023-07-02 13:03:33',	0),
(19,	'dsadasdasdasdasdsadsad',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 13:03:55',	'2023-07-02 13:03:55',	1),
(20,	'dasdasdasd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 13:38:34',	'2023-07-02 13:38:34',	0),
(21,	'dsadasdsadasd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 13:44:33',	'2023-07-02 13:44:33',	1),
(22,	'dasdad',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 13:48:21',	'2023-07-02 13:48:21',	1),
(23,	'dadsadas',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 13:49:07',	'2023-07-02 13:49:07',	1),
(24,	'1',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 13:51:49',	'2023-07-02 13:51:49',	1),
(25,	'2',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 13:53:48',	'2023-07-02 13:53:48',	1),
(26,	'dasdsad',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 13:55:55',	'2023-07-02 13:55:55',	1),
(27,	'dsadasd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:08:50',	'2023-07-02 14:08:50',	1),
(28,	'dasdasd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:09:12',	'2023-07-02 14:09:12',	2),
(29,	'dsaccxzc',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:16:51',	'2023-07-02 14:16:51',	2),
(30,	'dsadasd',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 14:20:03',	'2023-07-02 14:20:03',	2),
(31,	'dasdsad',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 14:24:50',	'2023-07-02 14:24:50',	2),
(32,	'dasdsad',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:29:41',	'2023-07-02 14:29:41',	1),
(33,	'dasdsad',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:30:13',	'2023-07-02 14:30:13',	1),
(34,	'dasdsadadsadsad',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 14:30:21',	'2023-07-02 14:30:21',	1),
(35,	'dasdasd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:30:56',	'2023-07-02 14:30:56',	1),
(36,	'11111',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 14:31:05',	'2023-07-02 14:31:05',	1),
(37,	'dsadasd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:34:07',	'2023-07-02 14:34:07',	1),
(38,	'2',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 14:34:13',	'2023-07-02 14:34:13',	1),
(39,	'ddddd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:35:01',	'2023-07-02 14:35:01',	1),
(40,	'4444',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 14:35:07',	'2023-07-02 14:35:07',	1),
(41,	'ddddd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:36:48',	'2023-07-02 14:36:48',	1),
(42,	'44',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 14:36:54',	'2023-07-02 14:36:54',	1),
(43,	'dasdsad',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:44:44',	'2023-07-02 14:44:44',	1),
(44,	'55',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 14:44:51',	'2023-07-02 14:44:51',	1),
(45,	'55',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:46:21',	'2023-07-02 14:46:21',	1),
(46,	'6666',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 14:46:27',	'2023-07-02 14:46:27',	1),
(47,	'dsadasd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:52:07',	'2023-07-02 14:52:07',	1),
(48,	'7',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 14:52:13',	'2023-07-02 14:52:13',	1),
(49,	'77',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 14:53:48',	'2023-07-02 14:53:48',	1),
(50,	'dasda',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:53:57',	'2023-07-02 14:53:57',	1),
(51,	'6',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 14:54:01',	'2023-07-02 14:54:01',	1),
(52,	'dsad',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:55:53',	'2023-07-02 14:55:53',	1),
(53,	'666',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 14:55:59',	'2023-07-02 14:55:59',	1),
(54,	'dd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 14:56:18',	'2023-07-02 14:56:18',	1),
(55,	'78',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 14:56:23',	'2023-07-02 14:56:23',	1),
(56,	'dasd',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 15:08:43',	'2023-07-02 15:08:43',	1),
(57,	'dsadasd',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 15:10:14',	'2023-07-02 15:10:14',	1),
(58,	'444',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 15:10:47',	'2023-07-02 15:10:47',	1),
(59,	'd',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 15:11:32',	'2023-07-02 15:11:32',	1),
(60,	'das',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 15:11:55',	'2023-07-02 15:11:55',	1),
(61,	'd',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 15:12:03',	'2023-07-02 15:12:03',	1),
(62,	'das',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 15:12:36',	'2023-07-02 15:12:36',	1),
(63,	'dsa',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 15:13:06',	'2023-07-02 15:13:06',	1),
(64,	'dsad',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 15:14:06',	'2023-07-02 15:14:06',	1),
(65,	'd',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 15:16:44',	'2023-07-02 15:16:44',	1),
(66,	'dasd',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 15:18:59',	'2023-07-02 15:18:59',	1),
(67,	'd',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 15:19:27',	'2023-07-02 15:19:27',	1),
(68,	'r',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 15:19:33',	'2023-07-02 15:19:33',	1),
(69,	'dasds',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 16:26:50',	'2023-07-02 16:26:50',	1),
(70,	'yes',	'admin',	NULL,	NULL,	0,	0,	'2023-07-02 16:27:03',	'2023-07-02 16:27:03',	1),
(71,	'dasdsad',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 16:42:15',	'2023-07-02 16:42:15',	1),
(72,	'dsadas',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-02 16:47:04',	'2023-07-02 16:47:04',	1),
(73,	'',	'0905555555',	'/Users/apple/nodejs/tikivx_api/src/public/images/1688294037306_0.17288808999742922_user_undefined_bj-6119384d.png',	'image/png',	3,	4,	'2023-07-02 17:33:57',	'2023-07-02 17:33:57',	1),
(74,	'',	'0905555555',	'https://api.tikivx.code/images/1688294178350_0.13619035675899038_user_undefined_bj-6119384d.png',	'image/png',	3,	4,	'2023-07-02 17:36:18',	'2023-07-02 17:36:18',	1),
(75,	'hi',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-04 12:29:28',	'2023-07-04 12:29:28',	1),
(76,	'd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-04 12:31:50',	'2023-07-04 12:31:50',	1),
(77,	'hi',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-04 12:36:57',	'2023-07-04 12:36:57',	1),
(78,	'hi',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-04 12:38:21',	'2023-07-04 12:38:21',	1),
(79,	'd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-04 12:39:59',	'2023-07-04 12:39:59',	1),
(80,	'hi',	'vYw8yKs',	NULL,	NULL,	0,	0,	'2023-07-05 00:35:28',	'2023-07-05 00:35:28',	4),
(81,	'yes',	'vYw8yKs',	NULL,	NULL,	0,	0,	'2023-07-05 00:37:27',	'2023-07-05 00:37:27',	4),
(82,	'yes',	'admin',	NULL,	NULL,	0,	0,	'2023-07-05 00:40:25',	'2023-07-05 00:40:25',	4),
(83,	'hi admin',	'vYw8yKs',	NULL,	NULL,	0,	0,	'2023-07-05 00:43:46',	'2023-07-05 00:43:46',	4),
(84,	'hi',	'vYw8yKs',	NULL,	NULL,	0,	0,	'2023-07-05 00:46:52',	'2023-07-05 00:46:52',	4),
(85,	'alo',	'vYw8yKs',	NULL,	NULL,	0,	0,	'2023-07-05 00:47:02',	'2023-07-05 00:47:02',	4),
(86,	'sao bạn',	'admin',	NULL,	NULL,	0,	0,	'2023-07-05 00:47:10',	'2023-07-05 00:47:10',	4),
(87,	'cho tu hỏi',	'vYw8yKs',	NULL,	NULL,	0,	0,	'2023-07-05 00:47:17',	'2023-07-05 00:47:17',	4),
(88,	'ae',	'vYw8yKs',	NULL,	NULL,	0,	0,	'2023-07-05 00:47:58',	'2023-07-05 00:47:58',	4),
(89,	'ghf',	'vYw8yKs',	NULL,	NULL,	0,	0,	'2023-07-05 00:48:06',	'2023-07-05 00:48:06',	4),
(90,	'hi',	'LKdvqw1',	NULL,	NULL,	0,	0,	'2023-07-05 00:53:47',	'2023-07-05 00:53:47',	6),
(91,	'hi',	'admin',	NULL,	NULL,	0,	0,	'2023-07-05 00:59:56',	'2023-07-05 00:59:56',	7),
(92,	'hi',	'admin',	NULL,	NULL,	0,	0,	'2023-07-05 01:00:05',	'2023-07-05 01:00:05',	8),
(93,	'gu',	'UtMnh9Y',	NULL,	NULL,	0,	0,	'2023-07-05 01:00:51',	'2023-07-05 01:00:51',	8),
(94,	'hi2',	'admin',	NULL,	NULL,	0,	0,	'2023-07-05 01:01:16',	'2023-07-05 01:01:16',	8),
(95,	'yes',	'admin',	NULL,	NULL,	0,	0,	'2023-07-05 01:02:00',	'2023-07-05 01:02:00',	8),
(96,	'hi',	'UtMnh9Y',	NULL,	NULL,	0,	0,	'2023-07-05 01:02:05',	'2023-07-05 01:02:05',	8),
(97,	'hi',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-05 01:03:07',	'2023-07-05 01:03:07',	1),
(98,	'yes',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-05 01:14:11',	'2023-07-05 01:14:11',	1),
(99,	'd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-05 01:15:01',	'2023-07-05 01:15:01',	1),
(100,	'das',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-05 01:15:31',	'2023-07-05 01:15:31',	1),
(101,	'dasd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-05 01:16:29',	'2023-07-05 01:16:29',	1),
(102,	'dasd',	'0905555555',	NULL,	NULL,	3,	4,	'2023-07-05 01:17:27',	'2023-07-05 01:17:27',	1),
(103,	'dasd',	'HdTuIIL',	NULL,	NULL,	0,	0,	'2023-07-05 01:17:50',	'2023-07-05 01:17:50',	9),
(104,	'dasd',	'HdTuIIL',	NULL,	NULL,	0,	0,	'2023-07-05 09:27:13',	'2023-07-05 09:27:13',	9),
(105,	'dasd',	'HdTuIIL',	NULL,	NULL,	0,	0,	'2023-07-05 09:28:27',	'2023-07-05 09:28:27',	9),
(106,	'dasda',	'HdTuIIL',	NULL,	NULL,	0,	0,	'2023-07-05 09:28:38',	'2023-07-05 09:28:38',	9);

DROP TABLE IF EXISTS `Products`;
CREATE TABLE `Products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_name` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_type` int DEFAULT NULL,
  `full_price` bigint DEFAULT NULL,
  `image_path` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_lock` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `Products` (`id`, `product_name`, `product_type`, `full_price`, `image_path`, `description`, `is_lock`) VALUES
(1,	'Nồi Chiên Không Dầu Philips HD9200/90 - Hàng Chính Hãng',	1,	8186000,	'sp7.jpg',	NULL,	0),
(2,	'Máy hút mùi gắn tường Hafele HH-WI60B 53981173 - Hàng Chính Hãngg',	1,	15572400,	'sp8.jpg',	NULL,	0),
(3,	'Robot hút bụi lau nhà thông minh Xiaomi Mi Robot Vacuum-Mop P SKV4110GL màu trắng - Hàng Chính Hãng',	1,	13490000,	'sp9.jpg',	NULL,	0),
(4,	'Quạt điều hòa Không Khí Comet CM8838 175W (60L) - Hàng Chính Hãng',	1,	14470100,	'sp10.jpg',	NULL,	0),
(5,	'Máy hút bụi Hitachi CV-SC22 - Hàng chính hãng',	1,	11649000,	'sp11.jpg',	NULL,	0),
(6,	'Máy Lọc Nước AO Smith G2 - Hàng Chính Hãng',	1,	17000000,	'sp12.jpg',	NULL,	0),
(7,	'NỒI CƠM ĐIỆN CAO TẦNG CUCKOO CRP-DHXB0610FS - HÀNG CHÍNH HÃNG',	1,	17880000,	'sp13.jpg',	NULL,	0),
(8,	'Lò Nướng CATA ME 611 DI - Hàng Chính Hãng',	1,	17950000,	'sp14.jpg',	NULL,	0),
(9,	'Máy Lọc Nước Nóng Lạnh CNC CNC915 - Hàng Chính Hãng',	1,	16945200,	'sp15.jpg',	NULL,	0),
(10,	'Laptop Asus ExpertBook L1400CDA-EK0490T (AMD R3-3250U/ 4GB DDR4/ 256GB SSD/ Win10) - Hàng Chính Hãng',	2,	14880000,	'sp1.jpg',	NULL,	0),
(11,	'Máy cắt đa năng Brother SDX1200 - Hàng chính hãng',	2,	14759000,	'sp2.jpg',	NULL,	0),
(12,	'Đồng Hồ Thông Minh Apple Watch Series 6 LTE GPS + Cellular Stainless Steel Case With Milanese Loop (Viền Thép & Dây Thép) - Hàng Chính HãngVNA',	2,	19990000,	'sp3.jpg',	NULL,	0),
(13,	'Điện Thoại iPhone 14 Pro Max  256GB - Hàng Chính Hãng',	2,	32990000,	'sp4.jpg',	NULL,	0),
(14,	'Máy Ảnh Sony Cyber-Shot DSC-RX10 III - Hàng Chính Hãng',	2,	56490000,	'sp5.jpg',	NULL,	0),
(15,	'Máy ảnh Sony Alpha A7S III | Chính hãng',	2,	82990000,	'sp6.jpg',	NULL,	0),
(16,	'Nhẫn Lộc Phúc Fine Jewelry K4BQFS0382AR Vàng Đính Kim Cương',	3,	158000000,	'sp16.jpg',	NULL,	0),
(17,	'DELVAUX22 mùa xuân và mùa hè mới túi xách nữ messenger túi đeo vai sang trọng túi xách nữ túi xách trung bình Món quà sinh nhật rực rỡ cho bạn gái latte color PM',	3,	185902000,	'sp17.jpg',	NULL,	0),
(18,	'CHANEL Chanel Ladies Flip Bag New Maxi Classic Handbag Fashion and Beautiful Pre-full_price Love Don\'t Wait Black',	3,	262327000,	'sp18.jpg',	NULL,	0),
(19,	'Cartier Cartier Vòng cổ nữ sang trọng vàng 18K dát vàng kim cương xương rồng Mặt dây chuyền Vòng cổ tinh tế và thanh lịch Phụ kiện quyến rũ',	3,	519827119,	'sp19.jpg',	NULL,	0),
(20,	'Đủ Paris GUCCI Gucci Spring  Summer 22 Women\'s GG Marmont Series Crocodile Leather Mini Handbag 547260 EV40T 3120 Green One Size',	3,	542597000,	'sp20.jpg',	NULL,	0),
(21,	'Đủ Paris GUCCI Gucci 22 nữ mùa xuân và mùa hè GG Marmont dòng túi đeo vai nhỏ bằng da cá sấu',	3,	635226000,	'sp21.jpg',	NULL,	0),
(22,	'HERMES Túi xách nữ Hermes màu tím bạch kim túi da khóa kim loại thời trang và màu tím thanh lịch',	3,	854738000,	'sp22.jpg',	NULL,	0),
(23,	'Hublot Big Bang Sang Bleu II King Gold Blue Pave 45mm',	3,	1590000000,	'sp23.jpg',	NULL,	0),
(24,	'Bộ trang sức Kim cương Vàng trắng 14K PNJ 00703-02002',	3,	1650323000,	'sp24.jpg',	NULL,	0),
(25,	'[Nhận dạng xác thực] Đồng hồ nam Rolex Cosmograph Daytona Chronograph 18K Gold Automatic Mechanical Quartz 116508 Ludi Men\'s Watch',	3,	2147483000,	'sp25.jpg',	NULL,	0),
(26,	'đồng hồ Rolex Submariner Automatic Chronometer Diamond Silver Dial',	3,	5499000000,	'sp26.jpg',	NULL,	0),
(27,	'Bí ẩn của nước biển xanh mạ vàng sáng bóng tinh chất 150ml nước tinh chất đường sáng tinh tế dưỡng ẩm nuôi dưỡng sửa chữa sáng da',	4,	8541000,	'sp27.jpg',	NULL,	0),
(28,	'Nước Hoa Tom Ford Tobacco Vanille Eau De Parfum 100ml',	4,	10500000,	'sp28.jpg',	NULL,	0),
(29,	'Bộ 3 dược mỹ phẩm chăm sóc da chống lão hóa Caviar of Switzerland',	4,	9044000,	'sp29.jpg',	NULL,	0),
(30,	'Nước Hoa Nữ Ramon Molvizar Art & Silver Vàng Trắng Đính Đá Swarovski Trắng 75ml',	4,	12000000,	'sp30.jpg',	NULL,	0),
(31,	'Tinh chất phục hồi cô đặc Sea Blue Mystery 50ml Tinh chất phục hồi mạnh mẽ chống oxy hóa tuyệt vời Sản phẩm chăm sóc da Lamer',	4,	15898000,	'sp31.jpg',	NULL,	0),
(32,	'Truffle Infusion Brightening Face Lift Cream (Gold Elements)',	4,	15300000,	'sp32.jpg',	NULL,	0),
(33,	'Bộ Set Tái Sinh Da Su m37 Losec Summa Elixir Special Set 12 Sản Phẩm',	4,	24000000,	'sp33.jpg',	NULL,	0),
(34,	'Mặt Nạ Làm Săn Chắc Da - Platinum Instant Firming Mask Kedma',	4,	19500000,	'sp34.jpg',	NULL,	0),
(35,	'Mặt Nạ Nhiệt Black Pearl Thermal Mask - Có Nguồn Gốc Từ Biển Chết - Xuất Xứ Israel - Hỗ Trợ Điều trị cho làn da của bạn nhẹ nhàng, mịn màng hơn và trẻ trung hơn',	4,	21760000,	'sp35.jpg',	NULL,	0),
(36,	'Mặt nạ tinh chất vàng 24K chắc khỏe da Botanifique – gold era-24k facial mask',	4,	21950000,	'sp36.jpg',	NULL,	0),
(37,	'Test',	1,	200000000,	'https://api.tikivx.code/images/1688838317820_0.6401327788103499_user_undefined_1dv5.jpg',	'',	0),
(38,	'Test 2',	1,	50000000,	'https://api.tikivx.code/images/1688838680056_0.25918748514431145_user_undefined_168325292284.jpg',	'',	0),
(39,	'Test 3',	1,	450000000,	'https://api.tikivx.code/images/1688838790706_0.32621067973864104_user_undefined_1dv5.jpg',	'',	0),
(40,	'Test 4',	1,	123000000,	'https://api.tikivx.code/images/1688878916627_0.35199017989987724_user_undefined_168325292284.jpg',	'',	0),
(41,	'test 5',	1,	45000000,	'https://api.tikivx.code/images/1688879119913_0.9278244745644302_user_undefined_1dv5.jpg',	'',	0),
(42,	'test 6',	1,	3488899,	'https://api.tikivx.code/images/1688879804610_0.826209814244846_user_undefined_1dv5.jpg',	'',	0),
(43,	'Test 7',	1,	25000000,	'1688882308459_0.18080395661922544_1dv5.jpg',	'',	1),
(44,	'Test 8',	1,	50000000,	'1688882240182_0.7218634536085624_photo_2023-05-05_09-52-45.jpg',	'',	0),
(45,	'test 9',	1,	45666666,	'1688880288180_0.1276042180088106_1dv5.jpg',	'',	0);

DROP TABLE IF EXISTS `Recharges`;
CREATE TABLE `Recharges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_code` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `amount` bigint DEFAULT NULL,
  `status` int DEFAULT NULL,
  `createdAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688215945359',
  `updatedAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688215945359',
  `is_agent_update` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `Recharges` (`id`, `phone`, `order_code`, `amount`, `status`, `createdAt`, `updatedAt`, `is_agent_update`) VALUES
(1,	'0905555555',	'20230701EJITM8IOXX3',	50000,	1,	'2023-07-01 21:15:55',	'2023-07-01 21:28:32',	0),
(2,	'0905555555',	'20230701GQRM0KZ22I6',	500000000,	1,	'2023-07-01 22:36:00',	'2023-07-01 22:36:20',	0),
(3,	'0905555555',	'20230702LJI5YTQI42T',	50000,	2,	'2023-07-02 22:08:54',	'2023-07-02 22:18:02',	0),
(4,	'0905555555',	'202307027YJK31XTE5S',	50000,	2,	'2023-07-02 22:19:12',	'2023-07-02 22:19:40',	0),
(5,	'0905555555',	'20230702TXBLCM1Z2OS',	50000,	2,	'2023-07-02 22:19:58',	'2023-07-02 22:20:09',	0),
(6,	'0905555555',	'202307029IJUXZSSZIW',	50000,	2,	'2023-07-02 22:20:19',	'2023-07-02 22:33:36',	0),
(7,	'0905555555',	'20230702APAXH7BICP9',	50000,	2,	'2023-07-02 22:33:46',	'2023-07-02 22:34:03',	0),
(8,	'0905555555',	'20230702Y6XS2INO5QX',	50000,	2,	'2023-07-02 22:34:14',	'2023-07-02 22:41:02',	0),
(9,	'0905555555',	'2023070214OHJ93Q9H1',	50000,	2,	'2023-07-02 22:41:15',	'2023-07-02 22:42:20',	0),
(10,	'0905555555',	'20230702UUM1A9CYXPM',	50000,	2,	'2023-07-02 22:42:28',	'2023-07-02 22:43:50',	0),
(11,	'0905555555',	'202307029OA9AVHIF89',	50000,	2,	'2023-07-02 22:44:16',	'2023-07-02 22:46:46',	0),
(12,	'0905555555',	'20230702V2N9VGPIAYE',	50000,	2,	'2023-07-02 22:46:52',	'2023-07-02 22:47:08',	0),
(13,	'0905555555',	'20230702D3C05CKUPLZ',	50000,	2,	'2023-07-02 22:47:16',	'2023-07-02 23:07:05',	0),
(14,	'0905555555',	'20230703047J1TFE82K',	50000,	3,	'2023-07-03 13:02:53',	'2023-07-03 13:21:46',	0),
(15,	'0905555555',	'20230703QAA28U4Q3L5',	50000,	2,	'2023-07-03 13:39:35',	'2023-07-03 13:41:45',	0),
(16,	'0905555555',	'20230703YTY817CO749',	50000,	2,	'2023-07-03 13:41:56',	'2023-07-03 13:43:46',	0),
(17,	'0905555555',	'20230703I4THWXTNEXE',	50000,	2,	'2023-07-03 13:43:56',	'2023-07-03 13:44:29',	0),
(18,	'0905555555',	'20230703SZJ1XTIB5L7',	50000,	2,	'2023-07-03 13:44:51',	'2023-07-03 13:46:01',	0),
(19,	'0905555555',	'20230703AXZTUB01Z24',	50000,	2,	'2023-07-03 13:46:12',	'2023-07-03 13:47:07',	0),
(20,	'0905555555',	'202307039Z193MRF5U2',	50000,	2,	'2023-07-03 13:47:17',	'2023-07-03 13:52:59',	0),
(21,	'0905555555',	'202307031P4VD7TC01H',	50000,	2,	'2023-07-03 13:53:27',	'2023-07-03 13:53:32',	0),
(22,	'0905555555',	'20230703X7J2IZ7ZCAY',	50000,	2,	'2023-07-03 13:58:50',	'2023-07-03 13:58:57',	0);

DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

INSERT INTO `SequelizeMeta` (`name`) VALUES
('agentRecharge.js'),
('agentWithdraw.js'),
('bank.js'),
('cart.js'),
('conversation.js'),
('eventSale.js'),
('message_add_fields_v2.js'),
('message_add_fields_v3.js'),
('message_add_fields.js'),
('message.js'),
('product_add_fields_v2.js'),
('product_add_fields.js'),
('product.js'),
('recharge_add_fields.js'),
('recharge.js'),
('setting.js'),
('support_add_fields_v2.js'),
('support_add_fields_v3.js'),
('support_add_fields.js'),
('support.js'),
('user_add_fields_v2.js'),
('user_add_fields.js'),
('user.js'),
('withdraw_add_fields_v2.js'),
('withdraw_add_fields_v3.js'),
('withdraw_add_fields_v4.js'),
('withdraw_add_fields.js'),
('withdraw.js');

DROP TABLE IF EXISTS `Settings`;
CREATE TABLE `Settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name_bank` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `number_bank` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `wallet_usdt` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `link_support` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688215945399',
  `updatedAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688215945399',
  `user_id` int DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `Supports`;
CREATE TABLE `Supports` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(50) COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `service` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updatedAt` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_guest` int DEFAULT '0',
  `status_sort` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `Supports` (`id`, `status`, `service`, `user`, `createdAt`, `updatedAt`, `is_guest`, `status_sort`) VALUES
(1,	'done',	'topup',	'0905555555',	'2023-07-02 13:00:24',	'2023-07-07 22:01:27',	0,	3),
(2,	'done',	'withdraw',	'0905555555',	'2023-07-02 13:38:34',	'2023-07-05 01:09:55',	0,	3),
(3,	'done',	'shopping',	'0905555555',	'2023-07-02 15:49:16',	'2023-07-03 20:43:32',	0,	3),
(4,	'done',	'topup',	'vYw8yKs',	'2023-07-04 23:48:08',	'2023-07-05 00:50:41',	1,	3),
(6,	'done',	'withdraw',	'LKdvqw1',	'2023-07-05 00:53:41',	'2023-07-05 00:59:08',	1,	3),
(7,	'done',	'withdraw',	'aU2Eacs',	'2023-07-05 00:59:13',	'2023-07-05 01:01:27',	1,	3),
(8,	'done',	'topup',	'UtMnh9Y',	'2023-07-05 00:59:30',	'2023-07-05 01:02:34',	1,	3),
(9,	'done',	'topup',	'HdTuIIL',	'2023-07-05 01:17:44',	'2023-07-07 21:44:58',	1,	3);

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password_v1` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `money` bigint DEFAULT '0',
  `invite` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `refferer` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` int DEFAULT '0',
  `name_store` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ip_address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int DEFAULT '1',
  `agent_id` int DEFAULT NULL,
  `createdAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688215945472',
  `updatedAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688215945472',
  `grade` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status_pay` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `Users` (`id`, `phone`, `username`, `password_v1`, `money`, `invite`, `refferer`, `role`, `name_store`, `ip_address`, `status`, `agent_id`, `createdAt`, `updatedAt`, `grade`, `status_pay`) VALUES
(1,	'0972191191',	'superadmin1',	'$2b$10$hoCwrkGjNsxI9MreCWxsveoiivQoS2qj.DuB9.9nfWWmyQJ7jhTQK',	0,	'PHLY7YYUXfRft',	'PHLY7YYUXfRft',	1,	' MAKE MONEY NOT FRIENDS.',	'127.0.0.1',	1,	NULL,	'1686458766866',	'1686458766866',	NULL,	1),
(2,	'0977777777',	'admin',	'$2b$10$hoCwrkGjNsxI9MreCWxsveoiivQoS2qj.DuB9.9nfWWmyQJ7jhTQK',	0,	'PHLY7YYUXfRfd',	'PHLY7YYUXfRfd',	1,	' MAKE MONEY NOT FRIENDS.',	'127.0.0.1',	1,	NULL,	'1686458766866',	'1686458766866',	NULL,	1),
(3,	'0966666666',	'agent',	'$2b$10$4Ctc9.QJJ7XUYTlF6czGaeiHjHYwRLuFssBgYGk7qjhNohe2EtQ/i',	0,	'PHLY7YYUXfRfe',	'PHLY7YYUXfRfe',	2,	NULL,	NULL,	1,	NULL,	'1688215945472',	'1688215945472',	NULL,	1),
(4,	'0905555555',	'myshop0905555555',	'$2b$10$hoCwrkGjNsxI9MreCWxsveoiivQoS2qj.DuB9.9nfWWmyQJ7jhTQK',	522461450,	'30393',	'PHLY7YYUXfRfd',	0,	'myshop',	'127.0.0.1',	1,	3,	'2023-07-01 20:33:48',	'2023-07-07 22:03:08',	'VIP1',	1),
(10001,	'0966710777',	'tungsoi777',	'$2b$10$Ke8ZSQYP9igneELExmHCsumJH5kElZOzfNr8sMSgRSFLluIlIEwdq',	0,	'rzFwRVWe7hBlB',	'SDGHB568K4',	2,	NULL,	'::ffff:127.0.0.1',	1,	NULL,	'2023-06-11 16:58:15',	'2023-06-11 16:58:15',	NULL,	1),
(10002,	'0988000000',	'ManhCa00000',	'$2b$10$lXnO0kL5Tdbs0kVoO3hOeOW3avTbyH9pCHfKGz0xl8H..wENQIRuC',	0,	'YWLmoFHC32Wo8',	'AAAAA',	2,	NULL,	'::1',	1,	NULL,	'2023-06-11 17:40:13',	'2023-06-11 17:40:13',	NULL,	1),
(10003,	'0988111111',	'NGUYENTHANHAN1',	'$2b$10$GGTUUjnsXImRoW1.mg.XYe.gxcwraf5DLf1/64EDDtbt2CSCb90xe',	0,	'uH0wdgdJBhN5x',	'11111',	2,	NULL,	'::ffff:127.0.0.1',	1,	NULL,	'2023-06-11 17:41:06',	'2023-06-11 17:41:06',	NULL,	1),
(10004,	'0988222222',	'Nguyễn Tuấn Anh',	'$2b$10$gh6xnnWyxsN8gAjWKwkI/etgrMmxOV0M89hCtnc9aLq7EW6OlUrYK',	0,	'JM362rCHcQWLu',	'22222',	2,	NULL,	'::ffff:127.0.0.1',	1,	NULL,	'2023-06-11 17:41:51',	'2023-06-11 17:41:51',	NULL,	1),
(10005,	'0988333333',	'Giang Đầu Đỏ ',	'$2b$10$q4yc9PcuCW9FNIHbrDWpOu7yhDVvvIM7Sp85bK9a8Hpup/AIrsbHq',	0,	'zqvQdlnvY36hp',	'33333',	2,	NULL,	'::ffff:127.0.0.1',	1,	NULL,	'2023-06-11 17:42:36',	'2023-06-11 17:42:36',	NULL,	1),
(10006,	'0988444444',	'Trung Bắc Giang ',	'$2b$10$6o3FrtKPdOojwD0H8moTRuqvr7PTb34StwxktS0XJMYBAy/Ckl5be',	0,	'KDtCKqN1tFBb7',	'44444',	2,	NULL,	'::ffff:127.0.0.1',	1,	NULL,	'2023-06-11 17:44:03',	'2023-06-11 17:44:03',	NULL,	1),
(10007,	'0988555555',	'MANHBG5555',	'$2b$10$ewfoYPDf9TYckRS8Q09zg.j3dCElLCuxAUchmpl9FeSEGUIkPGBnK',	0,	'UZpLJEKvPTGGK',	'55555',	2,	NULL,	'::ffff:127.0.0.1',	1,	NULL,	'2023-06-11 17:44:52',	'2023-06-11 17:44:52',	NULL,	1),
(10008,	'0988666666',	'LÊ VĂN THANH ',	'$2b$10$SQFeqNdPPy2ipB8pS4dkQuRjFUR1SgpWkc4qhGFd47.UJRp0Y9qVu',	0,	'q2EoIPVGPdZGE',	'66666',	2,	NULL,	'::ffff:127.0.0.1',	1,	NULL,	'2023-06-11 17:45:47',	'2023-06-11 17:45:47',	NULL,	1),
(10009,	'0988777777',	'PHATOKBGGG',	'$2b$10$sv/.j8AXRKOiNcKQfPcZseOusF6uQgL84L8B4.4ggCUH.UiBDH/HW',	0,	'3uGAx7NgBAkUM',	'777',	2,	NULL,	'::ffff:127.0.0.1',	1,	NULL,	'2023-06-11 17:46:23',	'2023-06-11 17:46:23',	NULL,	1),
(10012,	'0988765224',	'0988765224',	'$2b$10$Y6/HoNOkvranpLfjQ2Uvn.pozUQgvtjCATKyk4lPtDWL.NEbgRDhG',	1068422500,	'40451',	'q2EoIPVGPdZGE',	0,	'Thành An shop',	'::1',	1,	10008,	'2023-06-12 10:23:14',	'2023-06-14 10:03:36',	NULL,	1),
(10013,	'0973011161',	'0973011161',	'$2b$10$WFkuIbKsErvLVs/FK48ixO0QlRuM0C7gQjr06O2RKnNDv2GtNr8kW',	0,	'47626',	'3uGAx7NgBAkUM',	0,	'Shop88',	'::1',	1,	10009,	'2023-06-12 10:23:17',	'2023-06-12 15:35:48',	NULL,	1),
(10014,	'0911786686',	'0911786686',	'$2b$10$ZVNhj5Jf0hpWdslj.EsIZu6bRr91nahIYYX/xHxndvojWX0vxC96u',	0,	'99540',	'KDtCKqN1tFBb7',	0,	'Đức Phong ',	'::1',	1,	10006,	'2023-06-12 10:24:01',	'2023-06-14 23:23:27',	NULL,	1),
(10015,	'0962292688',	'vuongquoctuan88',	'$2b$10$shkkhtKjrrgmLYpS1HJ.bOhPTscTr9BFoZuuKrOWgtg8ajE183OV6',	0,	'26514',	'zqvQdlnvY36hp',	0,	'minionshop',	'::ffff:127.0.0.1',	1,	10005,	'2023-06-12 10:35:29',	'2023-06-14 12:14:26',	NULL,	1),
(10016,	'0963258147',	'Minh Tuấn ',	'$2b$10$blIKWxkMzobIOiH7pRykX.OkGzamQocabseuQtlKD77OZcbWQYIDe',	299507400,	'80295',	'UZpLJEKvPTGGK',	0,	'SHOP MINH TUẤN',	'::ffff:127.0.0.1',	1,	10007,	'2023-06-12 10:55:23',	'2023-06-14 10:03:38',	NULL,	1),
(10017,	'0337479979',	'Phamthily1987',	'$2b$10$fXOGoMiLCxK8r6SyzNkohuSCF83xwr7DW.00bnbSrzqThC.2/cRLC',	0,	'45036',	'KDtCKqN1tFBb7',	0,	'Phamthilyshop',	'::ffff:127.0.0.1',	1,	10006,	'2023-06-12 11:44:47',	'2023-06-12 11:44:47',	NULL,	1),
(10018,	'0989314097',	'Bui manh hung',	'$2b$10$sPvqrOLSsBr6xY28O.UyDeseGyKvxd5eLVk7q81Ja23gbvG.wwSEO',	0,	'14863',	'PHLY7YYUXfRft',	0,	'shop hoa',	'::ffff:127.0.0.1',	1,	1,	'2023-06-12 12:00:37',	'2023-06-12 12:00:37',	NULL,	1),
(10019,	'0866107775',	'0988111111',	'$2b$10$gS9rns7trT2tGlYqXbghqOq1gRIDl9E9mnCLKZjUDdEBHaCNziRn6',	0,	'96561',	'uH0wdgdJBhN5x',	0,	'Tiki.com',	'::ffff:127.0.0.1',	1,	10003,	'2023-06-12 13:21:00',	'2023-06-12 13:21:00',	NULL,	1),
(10020,	'0327062545',	'nguyenbien8686',	'$2b$10$AJN51QQlGxxwZW6tzmdrJe0AIm5O6nrt4QYpRVkmv4OqII6g1mmNO',	0,	'67517',	'rzFwRVWe7hBlB',	0,	'Biên Store',	'::ffff:127.0.0.1',	1,	10001,	'2023-06-12 13:25:55',	'2023-06-12 19:59:09',	NULL,	1),
(10021,	'0356035888',	'Nguyễn Tuấn Anh',	'$2b$10$PlTmhM5fvCvuLmnmUDdsh.HOswX2F/AduJx3WliD6VAiVpm.mBkEi',	0,	'73731',	'JM362rCHcQWLu',	0,	'shop Anh Tuấn',	'::1',	1,	10004,	'2023-06-12 13:52:02',	'2023-06-13 21:54:36',	NULL,	1),
(10022,	'0911313318',	'Tuyết Nhung ',	'$2b$10$SuAgdDbntGmL85BynrFL/umuicKuNe8zEfrSeaG3Iiq0BmF3ASWD.',	194290000,	'38831',	'q2EoIPVGPdZGE',	0,	'Nhung lee',	'::ffff:127.0.0.1',	1,	10008,	'2023-06-12 20:55:03',	'2023-06-14 15:26:54',	NULL,	1),
(10023,	'0906306759',	'nguyentu2407',	'$2b$10$6gMGLXIVKLsyj2e3sdOO/e4GJ.wvy44ERX.j/0i1FqPLZSIwYpVQe',	0,	'89114',	'zqvQdlnvY36hp',	0,	'cong ty co phan tiki',	'::1',	1,	10005,	'2023-06-12 21:06:47',	'2023-06-12 21:06:47',	NULL,	1),
(10024,	'0961788320',	'soidolce777',	'$2b$10$OElHK0Fo2mMJsLGNG9Q7FObzoSFwxNPkhtGCP2GRDbAAGkucOGnr.',	0,	'XozRfbmlCImED',	'HKOIHNXHKI1',	2,	NULL,	'::ffff:127.0.0.1',	1,	NULL,	'2023-06-12 21:21:19',	'2023-06-12 21:21:19',	NULL,	1),
(10025,	'0906068230',	'Longhoa1406',	'$2b$10$5RR92lqEe8U5FD3mShx.W.Jaiph51OYU1V9AzWAbzxM/UvWSwdJSS',	0,	'72460',	'XozRfbmlCImED',	0,	'Long Hoa shop',	'::1',	1,	10024,	'2023-06-12 21:28:03',	'2023-06-12 22:06:59',	NULL,	1),
(10026,	'0334497924',	'Ngoctran2007',	'$2b$10$kriDU/Yy6bue17rwlF7pput4IlIAyPIjfdgrcZ/YWw6a2Y5ORnDhq',	161798780,	'60295',	'UZpLJEKvPTGGK',	0,	'Ngọc Trần',	'::ffff:127.0.0.1',	1,	10007,	'2023-06-13 10:02:26',	'2023-06-13 20:03:42',	NULL,	1),
(10027,	'0986460915',	'Yennhibien',	'$2b$10$G3thbEEuzq1R0FLAmIMNhOHilYxhOdaEiXBqV7xlaVPoFIIj6Nj8G',	19990000,	'95389',	'KDtCKqN1tFBb7',	0,	'Yen Nhi ',	'::1',	1,	10006,	'2023-06-13 10:47:59',	'2023-06-14 19:34:31',	NULL,	1),
(10028,	'0337610436',	'Thủy duong',	'$2b$10$rKgK5fsh6cnjiz4UD9965ub1HFCnKjlisM7yyTvlWUC5xwjsBTmda',	0,	'75478',	'UZpLJEKvPTGGK',	0,	'Dương Thanh Thủy ',	'::ffff:127.0.0.1',	1,	10007,	'2023-06-13 15:40:44',	'2023-06-13 15:40:44',	NULL,	1),
(10029,	'0904308383',	'HoaLong8889',	'$2b$10$UzqmV.YT5/ByqIQf/f0tI.QzX3dUuYfsZvo5uFhSJjKX0rw3nsgDi',	0,	'19257',	'KDtCKqN1tFBb7',	0,	'LongHoashop',	'::1',	1,	10006,	'2023-06-13 19:38:53',	'2023-06-13 19:38:53',	NULL,	1),
(10030,	'0373986085',	'Gialong1988',	'$2b$10$sIVWj1PkD1whI7gOyqoxJOkgrfoc4YA17Km2y1jelEyvsLtXVFrzy',	0,	'01946',	'3uGAx7NgBAkUM',	0,	'Gia Long Shop',	'::1',	1,	10009,	'2023-06-13 21:12:28',	'2023-06-13 21:51:01',	NULL,	1),
(10031,	'0989753666',	'Nguyenanhtuan',	'$2b$10$9SxGRkx1V80ghw09kClbhOCf.httcwSOcz9uGxpiEty6gnVhD1s4m',	0,	'52562',	'YWLmoFHC32Wo8',	0,	'Shoptuananh88',	'::ffff:127.0.0.1',	1,	10002,	'2023-06-14 15:37:55',	'2023-06-14 15:37:55',	NULL,	1),
(10032,	'0944483538',	'Vuimlo28102000',	'$2b$10$j7QGETvm.yACiqcXOWGxEecSllefb2r6TjDFzcznBU1fZxAfqkpmi',	0,	'47560',	'zqvQdlnvY36hp',	0,	'Shopbeut888',	'::ffff:127.0.0.1',	1,	10005,	'2023-06-14 16:14:54',	'2023-06-14 16:14:54',	NULL,	1);

DROP TABLE IF EXISTS `Withdraws`;
CREATE TABLE `Withdraws` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_code` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `amount` bigint DEFAULT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name_bank` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `number_bank` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int DEFAULT NULL,
  `createdAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688659084283',
  `updatedAt` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '1688659084283',
  `deletedAt` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_agent_update` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- 2023-07-21 06:35:54
