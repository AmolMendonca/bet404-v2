-- Create chart 103 for test_user1
INSERT INTO charts (chart_id, user_id, mode)
VALUES (103, 'test_user1', 'A-9DAS');

-- =========================
-- H A R D   T O T A L S
-- =========================

-- Hard 8
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',8,'hard',NULL,FALSE,'H'),
(103,'3',8,'hard',NULL,FALSE,'H'),
(103,'4',8,'hard',NULL,FALSE,'H'),
(103,'5',8,'hard',NULL,FALSE,'H'),
(103,'6',8,'hard',NULL,FALSE,'H'),
(103,'7',8,'hard',NULL,FALSE,'H'),
(103,'8',8,'hard',NULL,FALSE,'H'),
(103,'9',8,'hard',NULL,FALSE,'H'),
(103,'10',8,'hard',NULL,FALSE,'H'),
(103,'A',8,'hard',NULL,FALSE,'H');

-- Hard 9
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',9,'hard',NULL,FALSE,'H'),
(103,'3',9,'hard',NULL,FALSE,'H'),
(103,'4',9,'hard',NULL,FALSE,'H'),
(103,'5',9,'hard',NULL,FALSE,'D'),
(103,'6',9,'hard',NULL,FALSE,'D'),
(103,'7',9,'hard',NULL,FALSE,'D'),
(103,'8',9,'hard',NULL,FALSE,'D'),
(103,'9',9,'hard',NULL,FALSE,'H'),
(103,'10',9,'hard',NULL,FALSE,'D'),
(103,'A',9,'hard',NULL,FALSE,'H');

-- Hard 10
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',10,'hard',NULL,FALSE,'D'),
(103,'3',10,'hard',NULL,FALSE,'D'),
(103,'4',10,'hard',NULL,FALSE,'D'),
(103,'5',10,'hard',NULL,FALSE,'D'),
(103,'6',10,'hard',NULL,FALSE,'D'),
(103,'7',10,'hard',NULL,FALSE,'D'),
(103,'8',10,'hard',NULL,FALSE,'D'),
(103,'9',10,'hard',NULL,FALSE,'D'),
(103,'10',10,'hard',NULL,FALSE,'D'),
(103,'A',10,'hard',NULL,FALSE,'H');

-- Hard 11
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',11,'hard',NULL,FALSE,'D'),
(103,'3',11,'hard',NULL,FALSE,'D'),
(103,'4',11,'hard',NULL,FALSE,'D'),
(103,'5',11,'hard',NULL,FALSE,'D'),
(103,'6',11,'hard',NULL,FALSE,'D'),
(103,'7',11,'hard',NULL,FALSE,'D'),
(103,'8',11,'hard',NULL,FALSE,'D'),
(103,'9',11,'hard',NULL,FALSE,'D'),
(103,'10',11,'hard',NULL,FALSE,'D'),
(103,'A',11,'hard',NULL,FALSE,'D');  -- many single-deck charts hit 11 v A

-- Hard 12
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',12,'hard',NULL,FALSE,'H'),
(103,'3',12,'hard',NULL,FALSE,'H'),
(103,'4',12,'hard',NULL,FALSE,'H'),
(103,'5',12,'hard',NULL,FALSE,'H'),
(103,'6',12,'hard',NULL,FALSE,'H1'),
(103,'7',12,'hard',NULL,FALSE,'S'),
(103,'8',12,'hard',NULL,FALSE,'H'),
(103,'9',12,'hard',NULL,FALSE,'H'),
(103,'10',12,'hard',NULL,FALSE,'H'),
(103,'A',12,'hard',NULL,FALSE,'H');

-- Hard 13
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',13,'hard',NULL,FALSE,'H'),
(103,'3',13,'hard',NULL,FALSE,'H'),
(103,'4',13,'hard',NULL,FALSE,'S'),
(103,'5',13,'hard',NULL,FALSE,'S'),
(103,'6',13,'hard',NULL,FALSE,'S/H'),
(103,'7',13,'hard',NULL,FALSE,'S'),
(103,'8',13,'hard',NULL,FALSE,'S'),
(103,'9',13,'hard',NULL,FALSE,'H'),
(103,'10',13,'hard',NULL,FALSE,'H'),
(103,'A',13,'hard',NULL,FALSE,'H');

-- Hard 14
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',14,'hard',NULL,FALSE,'S'),
(103,'3',14,'hard',NULL,FALSE,'S'),
(103,'4',14,'hard',NULL,FALSE,'S'),
(103,'5',14,'hard',NULL,FALSE,'S'),
(103,'6',14,'hard',NULL,FALSE,'S'),
(103,'7',14,'hard',NULL,FALSE,'S'),
(103,'8',14,'hard',NULL,FALSE,'S'),
(103,'9',14,'hard',NULL,FALSE,'S'),
(103,'10',14,'hard',NULL,FALSE,'H'),
(103,'A',14,'hard',NULL,FALSE,'H');

-- Hard 15
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',15,'hard',NULL,FALSE,'S'),
(103,'3',15,'hard',NULL,FALSE,'S'),
(103,'4',15,'hard',NULL,FALSE,'S'),
(103,'5',15,'hard',NULL,FALSE,'S'),
(103,'6',15,'hard',NULL,FALSE,'S'),
(103,'7',15,'hard',NULL,FALSE,'S'),
(103,'8',15,'hard',NULL,FALSE,'S'),
(103,'9',15,'hard',NULL,FALSE,'S'),
(103,'10',15,'hard',NULL,FALSE,'S'),
(103,'A',15,'hard',NULL,FALSE,'RH');

-- Hard 16
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',16,'hard',NULL,FALSE,'S'),
(103,'3',16,'hard',NULL,FALSE,'S'),
(103,'4',16,'hard',NULL,FALSE,'S'),
(103,'5',16,'hard',NULL,FALSE,'S'),
(103,'6',16,'hard',NULL,FALSE,'S'),
(103,'7',16,'hard',NULL,FALSE,'S'),
(103,'8',16,'hard',NULL,FALSE,'S'),
(103,'9',16,'hard',NULL,FALSE,'S'),
(103,'10',16,'hard',NULL,FALSE,'S'),
(103,'A',16,'hard',NULL,FALSE,'RH');

-- Hard 17
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',17,'hard',NULL,FALSE,'S'),
(103,'3',17,'hard',NULL,FALSE,'S'),
(103,'4',17,'hard',NULL,FALSE,'S'),
(103,'5',17,'hard',NULL,FALSE,'S'),
(103,'6',17,'hard',NULL,FALSE,'S'),
(103,'7',17,'hard',NULL,FALSE,'S'),
(103,'8',17,'hard',NULL,FALSE,'S'),
(103,'9',17,'hard',NULL,FALSE,'S'),
(103,'10',17,'hard',NULL,FALSE,'S'),
(103,'A',17,'hard',NULL,FALSE,'RS');

-- Hard 18
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',18,'hard',NULL,FALSE,'S'),
(103,'3',18,'hard',NULL,FALSE,'S'),
(103,'4',18,'hard',NULL,FALSE,'S'),
(103,'5',18,'hard',NULL,FALSE,'S'),
(103,'6',18,'hard',NULL,FALSE,'S'),
(103,'7',18,'hard',NULL,FALSE,'S'),
(103,'8',18,'hard',NULL,FALSE,'S'),
(103,'9',18,'hard',NULL,FALSE,'S'),
(103,'10',18,'hard',NULL,FALSE,'S'),
(103,'A',18,'hard',NULL,FALSE,'S');

-- =========================
-- S O F T   T O T A L S
-- =========================

-- Soft 13 (A2)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',13,'soft',NULL,FALSE,'H'),
(103,'3',13,'soft',NULL,FALSE,'H'),
(103,'4',13,'soft',NULL,FALSE,'H'),
(103,'5',13,'soft',NULL,FALSE,'H'),
(103,'6',13,'soft',NULL,FALSE,'H'),
(103,'7',13,'soft',NULL,FALSE,'H'),
(103,'8',13,'soft',NULL,FALSE,'H'),
(103,'9',13,'soft',NULL,FALSE,'H'),
(103,'10',13,'soft',NULL,FALSE,'H'),
(103,'A',13,'soft',NULL,FALSE,'H');

-- Soft 14 (A3)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',14,'soft',NULL,FALSE,'H'),
(103,'3',14,'soft',NULL,FALSE,'H'),
(103,'4',14,'soft',NULL,FALSE,'H'),
(103,'5',14,'soft',NULL,FALSE,'H'),
(103,'6',14,'soft',NULL,FALSE,'H'),
(103,'7',14,'soft',NULL,FALSE,'H'),
(103,'8',14,'soft',NULL,FALSE,'H'),
(103,'9',14,'soft',NULL,FALSE,'H'),
(103,'10',14,'soft',NULL,FALSE,'H'),
(103,'A',14,'soft',NULL,FALSE,'H');

-- Soft 15 (A4)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',15,'soft',NULL,FALSE,'H'),
(103,'3',15,'soft',NULL,FALSE,'H'),
(103,'4',15,'soft',NULL,FALSE,'H'),
(103,'5',15,'soft',NULL,FALSE,'H'),
(103,'6',15,'soft',NULL,FALSE,'H'),
(103,'7',15,'soft',NULL,FALSE,'D'),
(103,'8',15,'soft',NULL,FALSE,'H'),
(103,'9',15,'soft',NULL,FALSE,'H'),
(103,'10',15,'soft',NULL,FALSE,'H'),
(103,'A',15,'soft',NULL,FALSE,'H');

-- Soft 16 (A5)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',16,'soft',NULL,FALSE,'H'),
(103,'3',16,'soft',NULL,FALSE,'H'),
(103,'4',16,'soft',NULL,FALSE,'H'),
(103,'5',16,'soft',NULL,FALSE,'H'),
(103,'6',16,'soft',NULL,FALSE,'H'),
(103,'7',16,'soft',NULL,FALSE,'DH'),
(103,'8',16,'soft',NULL,FALSE,'H'),
(103,'9',16,'soft',NULL,FALSE,'H'),
(103,'10',16,'soft',NULL,FALSE,'H'),
(103,'A',16,'soft',NULL,FALSE,'H');

-- Soft 17 (A6)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',17,'soft',NULL,FALSE,'H'),
(103,'3',17,'soft',NULL,FALSE,'H'),
(103,'4',17,'soft',NULL,FALSE,'H'),
(103,'5',17,'soft',NULL,FALSE,'DH'),
(103,'6',17,'soft',NULL,FALSE,'DH'),
(103,'7',17,'soft',NULL,FALSE,'DH'),
(103,'8',17,'soft',NULL,FALSE,'DH'),
(103,'9',17,'soft',NULL,FALSE,'DH'),
(103,'10',17,'soft',NULL,FALSE,'DH'),
(103,'A',17,'soft',NULL,FALSE,'H');

-- Soft 18 (A7)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',18,'soft',NULL,FALSE,'S'),
(103,'3',18,'soft',NULL,FALSE,'S'),
(103,'4',18,'soft',NULL,FALSE,'DS'),
(103,'5',18,'soft',NULL,FALSE,'DS'),
(103,'6',18,'soft',NULL,FALSE,'DS'),
(103,'7',18,'soft',NULL,FALSE,'DS'),
(103,'8',18,'soft',NULL,FALSE,'DS'),
(103,'9',18,'soft',NULL,FALSE,'S'),
(103,'10',18,'soft',NULL,FALSE,'DS'),
(103,'A',18,'soft',NULL,FALSE,'H');

-- Soft 19 (A8)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',19,'soft',NULL,FALSE,'S'),
(103,'3',19,'soft',NULL,FALSE,'S'),
(103,'4',19,'soft',NULL,FALSE,'S'),
(103,'5',19,'soft',NULL,FALSE,'S'),
(103,'6',19,'soft',NULL,FALSE,'S'),
(103,'7',19,'soft',NULL,FALSE,'S'),
(103,'8',19,'soft',NULL,FALSE,'S'),
(103,'9',19,'soft',NULL,FALSE,'S'),
(103,'10',19,'soft',NULL,FALSE,'S'),
(103,'A',19,'soft',NULL,FALSE,'S');

-- =========================
-- P A I R S   (DAS)
-- =========================

-- 22
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',22,'hard',NULL,TRUE,'H'),
(103,'3',22,'hard',NULL,TRUE,'H'),
(103,'4',22,'hard',NULL,TRUE,'P'),
(103,'5',22,'hard',NULL,TRUE,'P'),
(103,'6',22,'hard',NULL,TRUE,'P'),
(103,'7',22,'hard',NULL,TRUE,'P'),
(103,'8',22,'hard',NULL,TRUE,'P'),
(103,'9',22,'hard',NULL,TRUE,'P'),
(103,'10',22,'hard',NULL,TRUE,'P'),
(103,'A',22,'hard',NULL,TRUE,'H');

-- 33
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',33,'hard',NULL,TRUE,'H'),
(103,'3',33,'hard',NULL,TRUE,'H'),
(103,'4',33,'hard',NULL,TRUE,'P'),
(103,'5',33,'hard',NULL,TRUE,'P'),
(103,'6',33,'hard',NULL,TRUE,'P'),
(103,'7',33,'hard',NULL,TRUE,'P'),
(103,'8',33,'hard',NULL,TRUE,'P'),
(103,'9',33,'hard',NULL,TRUE,'P'),
(103,'10',33,'hard',NULL,TRUE,'P'),
(103,'A',33,'hard',NULL,TRUE,'H');

-- 44 (DAS: split vs 5-6)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',44,'hard',NULL,TRUE,'H'),
(103,'3',44,'hard',NULL,TRUE,'H'),
(103,'4',44,'hard',NULL,TRUE,'H'),
(103,'5',44,'hard',NULL,TRUE,'H'),
(103,'6',44,'hard',NULL,TRUE,'H'),
(103,'7',44,'hard',NULL,TRUE,'H'),
(103,'8',44,'hard',NULL,TRUE,'H'),
(103,'9',44,'hard',NULL,TRUE,'H'),
(103,'10',44,'hard',NULL,TRUE,'H'),
(103,'A',44,'hard',NULL,TRUE,'H');

-- 55 (never split; double like hard 10)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',55,'hard',NULL,TRUE,'D'),
(103,'3',55,'hard',NULL,TRUE,'D'),
(103,'4',55,'hard',NULL,TRUE,'D'),
(103,'5',55,'hard',NULL,TRUE,'D'),
(103,'6',55,'hard',NULL,TRUE,'D'),
(103,'7',55,'hard',NULL,TRUE,'D'),
(103,'8',55,'hard',NULL,TRUE,'D'),
(103,'9',55,'hard',NULL,TRUE,'D'),
(103,'10',55,'hard',NULL,TRUE,'D'),
(103,'A',55,'hard',NULL,TRUE,'H');

-- 66
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',66,'hard',NULL,TRUE,'H'),
(103,'3',66,'hard',NULL,TRUE,'P'),
(103,'4',66,'hard',NULL,TRUE,'P'),
(103,'5',66,'hard',NULL,TRUE,'P'),
(103,'6',66,'hard',NULL,TRUE,'P'),
(103,'7',66,'hard',NULL,TRUE,'P'),
(103,'8',66,'hard',NULL,TRUE,'P'),
(103,'9',66,'hard',NULL,TRUE,'P'),
(103,'10',66,'hard',NULL,TRUE,'P'),
(103,'A',66,'hard',NULL,TRUE,'H');

-- 77
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',77,'hard',NULL,TRUE,'P'),
(103,'3',77,'hard',NULL,TRUE,'P'),
(103,'4',77,'hard',NULL,TRUE,'P'),
(103,'5',77,'hard',NULL,TRUE,'P'),
(103,'6',77,'hard',NULL,TRUE,'P'),
(103,'7',77,'hard',NULL,TRUE,'P'),
(103,'8',77,'hard',NULL,TRUE,'P'),
(103,'9',77,'hard',NULL,TRUE,'P'),
(103,'10',77,'hard',NULL,TRUE,'P'),
(103,'A',77,'hard',NULL,TRUE,'RH');

-- 88
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',88,'hard',NULL,TRUE,'P'),
(103,'3',88,'hard',NULL,TRUE,'P'),
(103,'4',88,'hard',NULL,TRUE,'P'),
(103,'5',88,'hard',NULL,TRUE,'P'),
(103,'6',88,'hard',NULL,TRUE,'P'),
(103,'7',88,'hard',NULL,TRUE,'P'),
(103,'8',88,'hard',NULL,TRUE,'P'),
(103,'9',88,'hard',NULL,TRUE,'P'),
(103,'10',88,'hard',NULL,TRUE,'P'),
(103,'A',88,'hard',NULL,TRUE,'PRH');

-- 99 (split 2-6,8-9; stand 7,10,A)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',99,'hard',NULL,TRUE,'S'),
(103,'3',99,'hard',NULL,TRUE,'P'),
(103,'4',99,'hard',NULL,TRUE,'P'),
(103,'5',99,'hard',NULL,TRUE,'P'),
(103,'6',99,'hard',NULL,TRUE,'P'),
(103,'7',99,'hard',NULL,TRUE,'P'),
(103,'8',99,'hard',NULL,TRUE,'P'),
(103,'9',99,'hard',NULL,TRUE,'S'),
(103,'10',99,'hard',NULL,TRUE,'P'),
(103,'A',99,'hard',NULL,TRUE,'P');

-- TT (20)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2',20,'hard',NULL,TRUE,'S'),
(103,'3',20,'hard',NULL,TRUE,'S'),
(103,'4',20,'hard',NULL,TRUE,'S'),
(103,'5',20,'hard',NULL,TRUE,'S'),
(103,'6',20,'hard',NULL,TRUE,'S'),
(103,'7',20,'hard',NULL,TRUE,'S'),
(103,'8',20,'hard',NULL,TRUE,'S'),
(103,'9',20,'hard',NULL,TRUE,'S'),
(103,'10',20,'hard',NULL,TRUE,'S'),
(103,'A',20,'hard',NULL,TRUE,'S');

-- AA (encode as 12 + soft + pair)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(103,'2', 12,'soft',NULL,TRUE,'P'),
(103,'3', 12,'soft',NULL,TRUE,'P'),
(103,'4', 12,'soft',NULL,TRUE,'P'),
(103,'5', 12,'soft',NULL,TRUE,'P'),
(103,'6', 12,'soft',NULL,TRUE,'P'),
(103,'7', 12,'soft',NULL,TRUE,'P'),
(103,'8', 12,'soft',NULL,TRUE,'P'),
(103,'9', 12,'soft',NULL,TRUE,'P'),
(103,'10',12,'soft',NULL,TRUE,'P'),
(103,'A', 12,'soft',NULL,TRUE,'P');


INSERT INTO charts (chart_id, user_id, mode)
VALUES (104, 'test_user1', 'A-9NoDAS');

-- =========================
-- H A R D   T O T A L S
-- =========================

-- Hard 8
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2', 8, 'hard', NULL, FALSE, 'H'),
(104, '3', 8, 'hard', NULL, FALSE, 'H'),
(104, '4', 8, 'hard', NULL, FALSE, 'H'),
(104, '5', 8, 'hard', NULL, FALSE, 'H'),
(104, '6', 8, 'hard', NULL, FALSE, 'H'),
(104, '7', 8, 'hard', NULL, FALSE, 'H'),
(104, '8', 8, 'hard', NULL, FALSE, 'H'),
(104, '9', 8, 'hard', NULL, FALSE, 'H'),
(104,'10', 8, 'hard', NULL, FALSE, 'H'),
(104, 'A', 8, 'hard', NULL, FALSE, 'H');

-- Hard 9
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2', 9, 'hard', NULL, FALSE, 'H'),
(104, '3', 9, 'hard', NULL, FALSE, 'H'),
(104, '4', 9, 'hard', NULL, FALSE, 'D'),
(104, '5', 9, 'hard', NULL, FALSE, 'D'),
(104, '6', 9, 'hard', NULL, FALSE, 'D'),
(104, '7', 9, 'hard', NULL, FALSE, 'D'),
(104, '8', 9, 'hard', NULL, FALSE, 'D'),
(104, '9', 9, 'hard', NULL, FALSE, 'D'),
(104,'10', 9, 'hard', NULL, FALSE, 'H'),
(104, 'A', 9, 'hard', NULL, FALSE, 'H');

-- Hard 10
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',10, 'hard', NULL, FALSE, 'D'),
(104, '3',10, 'hard', NULL, FALSE, 'D'),
(104, '4',10, 'hard', NULL, FALSE, 'D'),
(104, '5',10, 'hard', NULL, FALSE, 'D'),
(104, '6',10, 'hard', NULL, FALSE, 'D'),
(104, '7',10, 'hard', NULL, FALSE, 'D'),
(104, '8',10, 'hard', NULL, FALSE, 'D'),
(104, '9',10, 'hard', NULL, FALSE, 'D'),
(104,'10',10, 'hard', NULL, FALSE, 'D'),
(104, 'A',10, 'hard', NULL, FALSE, 'H');

-- Hard 11
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',11, 'hard', NULL, FALSE, 'D'),
(104, '3',11, 'hard', NULL, FALSE, 'D'),
(104, '4',11, 'hard', NULL, FALSE, 'D'),
(104, '5',11, 'hard', NULL, FALSE, 'D'),
(104, '6',11, 'hard', NULL, FALSE, 'D'),
(104, '7',11, 'hard', NULL, FALSE, 'D'),
(104, '8',11, 'hard', NULL, FALSE, 'D'),
(104, '9',11, 'hard', NULL, FALSE, 'D'),
(104,'10',11, 'hard', NULL, FALSE, 'D'),
(104, 'A',11, 'hard', NULL, FALSE, 'H');

-- Hard 12
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',12, 'hard', NULL, FALSE, 'H'),
(104, '3',12, 'hard', NULL, FALSE, 'H'),
(104, '4',12, 'hard', NULL, FALSE, 'H'),
(104, '5',12, 'hard', NULL, FALSE, 'S'),
(104, '6',12, 'hard', NULL, FALSE, 'S'),
(104, '7',12, 'hard', NULL, FALSE, 'S'),
(104, '8',12, 'hard', NULL, FALSE, 'H'),
(104, '9',12, 'hard', NULL, FALSE, 'H'),
(104,'10',12, 'hard', NULL, FALSE, 'H'),
(104, 'A',12, 'hard', NULL, FALSE, 'H');

-- Hard 13
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',13, 'hard', NULL, FALSE, 'H'),
(104, '3',13, 'hard', NULL, FALSE, 'H'),
(104, '4',13, 'hard', NULL, FALSE, 'S'),
(104, '5',13, 'hard', NULL, FALSE, 'S'),
(104, '6',13, 'hard', NULL, FALSE, 'S'),
(104, '7',13, 'hard', NULL, FALSE, 'S'),
(104, '8',13, 'hard', NULL, FALSE, 'S'),
(104, '9',13, 'hard', NULL, FALSE, 'H'),
(104,'10',13, 'hard', NULL, FALSE, 'H'),
(104, 'A',13, 'hard', NULL, FALSE, 'H');

-- Hard 14
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',14, 'hard', NULL, FALSE, 'H'),
(104, '3',14, 'hard', NULL, FALSE, 'S'),
(104, '4',14, 'hard', NULL, FALSE, 'S'),
(104, '5',14, 'hard', NULL, FALSE, 'S'),
(104, '6',14, 'hard', NULL, FALSE, 'S'),
(104, '7',14, 'hard', NULL, FALSE, 'S'),
(104, '8',14, 'hard', NULL, FALSE, 'S'),
(104, '9',14, 'hard', NULL, FALSE, 'H'),
(104,'10',14, 'hard', NULL, FALSE, 'H'),
(104, 'A',14, 'hard', NULL, FALSE, 'H');

-- Hard 15
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',15, 'hard', NULL, FALSE, 'S'),
(104, '3',15, 'hard', NULL, FALSE, 'S'),
(104, '4',15, 'hard', NULL, FALSE, 'S'),
(104, '5',15, 'hard', NULL, FALSE, 'S'),
(104, '6',15, 'hard', NULL, FALSE, 'S'),
(104, '7',15, 'hard', NULL, FALSE, 'S'),
(104, '8',15, 'hard', NULL, FALSE, 'S'),
(104, '9',15, 'hard', NULL, FALSE, 'S'),
(104,'10',15, 'hard', NULL, FALSE, 'H'),
(104, 'A',15, 'hard', NULL, FALSE, 'RH/H');

-- Hard 16
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',16, 'hard', NULL, FALSE, 'S'),
(104, '3',16, 'hard', NULL, FALSE, 'S'),
(104, '4',16, 'hard', NULL, FALSE, 'S'),
(104, '5',16, 'hard', NULL, FALSE, 'S'),
(104, '6',16, 'hard', NULL, FALSE, 'S'),
(104, '7',16, 'hard', NULL, FALSE, 'S'),
(104, '8',16, 'hard', NULL, FALSE, 'S'),
(104, '9',16, 'hard', NULL, FALSE, 'S'),
(104,'10',16, 'hard', NULL, FALSE, 'H'),
(104, 'A',16, 'hard', NULL, FALSE, 'RH');

-- Hard 17
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',17, 'hard', NULL, FALSE, 'S'),
(104, '3',17, 'hard', NULL, FALSE, 'S'),
(104, '4',17, 'hard', NULL, FALSE, 'S'),
(104, '5',17, 'hard', NULL, FALSE, 'S'),
(104, '6',17, 'hard', NULL, FALSE, 'S'),
(104, '7',17, 'hard', NULL, FALSE, 'S'),
(104, '8',17, 'hard', NULL, FALSE, 'S'),
(104, '9',17, 'hard', NULL, FALSE, 'S'),
(104,'10',17, 'hard', NULL, FALSE, 'S'),
(104, 'A',17, 'hard', NULL, FALSE, 'RS');

-- Hard 18
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',18, 'hard', NULL, FALSE, 'S'),
(104, '3',18, 'hard', NULL, FALSE, 'S'),
(104, '4',18, 'hard', NULL, FALSE, 'S'),
(104, '5',18, 'hard', NULL, FALSE, 'S'),
(104, '6',18, 'hard', NULL, FALSE, 'S'),
(104, '7',18, 'hard', NULL, FALSE, 'S'),
(104, '8',18, 'hard', NULL, FALSE, 'S'),
(104, '9',18, 'hard', NULL, FALSE, 'S'),
(104,'10',18, 'hard', NULL, FALSE, 'S'),
(104, 'A',18, 'hard', NULL, FALSE, 'S');

-- =========================
-- S O F T   T O T A L S
-- =========================

-- Soft 13 (A2)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',13, 'soft', NULL, FALSE, 'H'),
(104, '3',13, 'soft', NULL, FALSE, 'H'),
(104, '4',13, 'soft', NULL, FALSE, 'H'),
(104, '5',13, 'soft', NULL, FALSE, 'H'),
(104, '6',13, 'soft', NULL, FALSE, 'D'),
(104, '7',13, 'soft', NULL, FALSE, 'D'),
(104, '8',13, 'soft', NULL, FALSE, 'H'),
(104, '9',13, 'soft', NULL, FALSE, 'H'),
(104,'10',13, 'soft', NULL, FALSE, 'H'),
(104, 'A',13, 'soft', NULL, FALSE, 'H');

-- Soft 14 (A3)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',14, 'soft', NULL, FALSE, 'H'),
(104, '3',14, 'soft', NULL, FALSE, 'H'),
(104, '4',14, 'soft', NULL, FALSE, 'H'),
(104, '5',14, 'soft', NULL, FALSE, 'H'),
(104, '6',14, 'soft', NULL, FALSE, 'D'),
(104, '7',14, 'soft', NULL, FALSE, 'D'),
(104, '8',14, 'soft', NULL, FALSE, 'D'),
(104, '9',14, 'soft', NULL, FALSE, 'H'),
(104,'10',14, 'soft', NULL, FALSE, 'H'),
(104, 'A',14, 'soft', NULL, FALSE, 'H');

-- Soft 15 (A4)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',15, 'soft', NULL, FALSE, 'H'),
(104, '3',15, 'soft', NULL, FALSE, 'H'),
(104, '4',15, 'soft', NULL, FALSE, 'H'),
(104, '5',15, 'soft', NULL, FALSE, 'H'),
(104, '6',15, 'soft', NULL, FALSE, 'D'),
(104, '7',15, 'soft', NULL, FALSE, 'D'),
(104, '8',15, 'soft', NULL, FALSE, 'D'),
(104, '9',15, 'soft', NULL, FALSE, 'H'),
(104,'10',15, 'soft', NULL, FALSE, 'H'),
(104, 'A',15, 'soft', NULL, FALSE, 'H');

-- Soft 16 (A5)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',16, 'soft', NULL, FALSE, 'H'),
(104, '3',16, 'soft', NULL, FALSE, 'H'),
(104, '4',16, 'soft', NULL, FALSE, 'H'),
(104, '5',16, 'soft', NULL, FALSE, 'D'),
(104, '6',16, 'soft', NULL, FALSE, 'D'),
(104, '7',16, 'soft', NULL, FALSE, 'D'),
(104, '8',16, 'soft', NULL, FALSE, 'D'),
(104, '9',16, 'soft', NULL, FALSE, 'H'),
(104,'10',16, 'soft', NULL, FALSE, 'H'),
(104, 'A',16, 'soft', NULL, FALSE, 'H');

-- Soft 17 (A6)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',17, 'soft', NULL, FALSE, 'H'),
(104, '3',17, 'soft', NULL, FALSE, 'H'),
(104, '4',17, 'soft', NULL, FALSE, 'H'),
(104, '5',17, 'soft', NULL, FALSE, 'D'),
(104, '6',17, 'soft', NULL, FALSE, 'D'),
(104, '7',17, 'soft', NULL, FALSE, 'D'),
(104, '8',17, 'soft', NULL, FALSE, 'D'),
(104, '9',17, 'soft', NULL, FALSE, 'D'),
(104,'10',17, 'soft', NULL, FALSE, 'H'),
(104, 'A',17, 'soft', NULL, FALSE, 'H');

-- Soft 18 (A7)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',18, 'soft', NULL, FALSE, 'S'),
(104, '3',18, 'soft', NULL, FALSE, 'S'),
(104, '4',18, 'soft', NULL, FALSE, 'DS'),
(104, '5',18, 'soft', NULL, FALSE, 'DS'),
(104, '6',18, 'soft', NULL, FALSE, 'DS'),
(104, '7',18, 'soft', NULL, FALSE, 'DS'),
(104, '8',18, 'soft', NULL, FALSE, 'DS'),
(104, '9',18, 'soft', NULL, FALSE, 'S'),
(104,'10',18, 'soft', NULL, FALSE, 'S'),
(104, 'A',18, 'soft', NULL, FALSE, 'H');

-- Soft 19 (A8)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2',19, 'soft', NULL, FALSE, 'S'),
(104, '3',19, 'soft', NULL, FALSE, 'S'),
(104, '4',19, 'soft', NULL, FALSE, 'S'),
(104, '5',19, 'soft', NULL, FALSE, 'S'),
(104, '6',19, 'soft', NULL, FALSE, 'DS'),
(104, '7',19, 'soft', NULL, FALSE, 'S'),
(104, '8',19, 'soft', NULL, FALSE, 'S'),
(104, '9',19, 'soft', NULL, FALSE, 'S'),
(104,'10',19, 'soft', NULL, FALSE, 'S'),
(104, 'A',19, 'soft', NULL, FALSE, 'S');

-- =========================
-- P A I R S
-- =========================

-- Pair 2s (22)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2', 22, 'hard', NULL, TRUE, 'H'),
(104, '3', 22, 'hard', NULL, TRUE, 'H'),
(104, '4', 22, 'hard', NULL, TRUE, 'H'),
(104, '5', 22, 'hard', NULL, TRUE, 'H'),
(104, '6', 22, 'hard', NULL, TRUE, 'H'),
(104, '7', 22, 'hard', NULL, TRUE, 'P'),
(104, '8', 22, 'hard', NULL, TRUE, 'H'),
(104, '9', 22, 'hard', NULL, TRUE, 'H'),
(104,'10', 22, 'hard', NULL, TRUE, 'P'),
(104, 'A', 22, 'hard', NULL, TRUE, 'H');

-- Pair 3s (33)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2', 33, 'hard', NULL, TRUE, 'H'),
(104, '3', 33, 'hard', NULL, TRUE, 'H'),
(104, '4', 33, 'hard', NULL, TRUE, 'H'),
(104, '5', 33, 'hard', NULL, TRUE, 'H'),
(104, '6', 33, 'hard', NULL, TRUE, 'H'),
(104, '7', 33, 'hard', NULL, TRUE, 'P'),
(104, '8', 33, 'hard', NULL, TRUE, 'H'),
(104, '9', 33, 'hard', NULL, TRUE, 'H'),
(104,'10', 33, 'hard', NULL, TRUE, 'P'),
(104, 'A', 33, 'hard', NULL, TRUE, 'H');

-- Pair 4s (44)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2', 44, 'hard', NULL, TRUE, 'H'),
(104, '3', 44, 'hard', NULL, TRUE, 'H'),
(104, '4', 44, 'hard', NULL, TRUE, 'H'),
(104, '5', 44, 'hard', NULL, TRUE, 'H'),
(104, '6', 44, 'hard', NULL, TRUE, 'H'),
(104, '7', 44, 'hard', NULL, TRUE, 'H'),
(104, '8', 44, 'hard', NULL, TRUE, 'H'),
(104, '9', 44, 'hard', NULL, TRUE, 'H'),
(104,'10', 44, 'hard', NULL, TRUE, 'H'),
(104, 'A', 44, 'hard', NULL, TRUE, 'H');

-- Pair 5s (55)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2', 55, 'hard', NULL, TRUE, 'D'),
(104, '3', 55, 'hard', NULL, TRUE, 'D'),
(104, '4', 55, 'hard', NULL, TRUE, 'D'),
(104, '5', 55, 'hard', NULL, TRUE, 'D'),
(104, '6', 55, 'hard', NULL, TRUE, 'D'),
(104, '7', 55, 'hard', NULL, TRUE, 'D'),
(104, '8', 55, 'hard', NULL, TRUE, 'D'),
(104, '9', 55, 'hard', NULL, TRUE, 'D'),
(104,'10', 55, 'hard', NULL, TRUE, 'D'),
(104, 'A', 55, 'hard', NULL, TRUE, 'H');

-- Pair 6s (66)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2', 66, 'hard', NULL, TRUE, 'H'),
(104, '3', 66, 'hard', NULL, TRUE, 'H'),
(104, '4', 66, 'hard', NULL, TRUE, 'H'),
(104, '5', 66, 'hard', NULL, TRUE, 'P'),
(104, '6', 66, 'hard', NULL, TRUE, 'P'),
(104, '7', 66, 'hard', NULL, TRUE, 'P'),
(104, '8', 66, 'hard', NULL, TRUE, 'P'),
(104, '9', 66, 'hard', NULL, TRUE, 'P'),
(104,'10', 66, 'hard', NULL, TRUE, 'H'),
(104, 'A', 66, 'hard', NULL, TRUE, 'H');

-- Pair 7s (77)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2', 77, 'hard', NULL, TRUE, 'P'),
(104, '3', 77, 'hard', NULL, TRUE, 'P'),
(104, '4', 77, 'hard', NULL, TRUE, 'P'),
(104, '5', 77, 'hard', NULL, TRUE, 'P'),
(104, '6', 77, 'hard', NULL, TRUE, 'P'),
(104, '7', 77, 'hard', NULL, TRUE, 'P'),
(104, '8', 77, 'hard', NULL, TRUE, 'P'),
(104, '9', 77, 'hard', NULL, TRUE, 'P'),
(104,'10', 77, 'hard', NULL, TRUE, 'P'),
(104, 'A', 77, 'hard', NULL, TRUE, 'RH');

-- Pair 8s (88)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2', 88, 'hard', NULL, TRUE, 'P'),
(104, '3', 88, 'hard', NULL, TRUE, 'P'),
(104, '4', 88, 'hard', NULL, TRUE, 'P'),
(104, '5', 88, 'hard', NULL, TRUE, 'P'),
(104, '6', 88, 'hard', NULL, TRUE, 'P'),
(104, '7', 88, 'hard', NULL, TRUE, 'P'),
(104, '8', 88, 'hard', NULL, TRUE, 'P'),
(104, '9', 88, 'hard', NULL, TRUE, 'P'),
(104,'10', 88, 'hard', NULL, TRUE, 'P'),
(104, 'A', 88, 'hard', NULL, TRUE, 'PRH');

-- Pair 9s (99)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2', 99, 'hard', NULL, TRUE, 'S'),
(104, '3', 99, 'hard', NULL, TRUE, 'S'),
(104, '4', 99, 'hard', NULL, TRUE, 'S'),
(104, '5', 99, 'hard', NULL, TRUE, 'P'),
(104, '6', 99, 'hard', NULL, TRUE, 'P'),
(104, '7', 99, 'hard', NULL, TRUE, 'P'),
(104, '8', 99, 'hard', NULL, TRUE, 'P'),
(104, '9', 99, 'hard', NULL, TRUE, 'S'),
(104,'10', 99, 'hard', NULL, TRUE, 'P'),
(104, 'A', 99, 'hard', NULL, TRUE, 'S');

-- Pair Tens (TT) -> player_val = 20
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2', 20, 'hard', NULL, TRUE, 'S'),
(104, '3', 20, 'hard', NULL, TRUE, 'S'),
(104, '4', 20, 'hard', NULL, TRUE, 'S'),
(104, '5', 20, 'hard', NULL, TRUE, 'S'),
(104, '6', 20, 'hard', NULL, TRUE, 'S'),
(104, '7', 20, 'hard', NULL, TRUE, 'S'),
(104, '8', 20, 'hard', NULL, TRUE, 'S'),
(104, '9', 20, 'hard', NULL, TRUE, 'S'),
(104,'10', 20, 'hard', NULL, TRUE, 'S'),
(104, 'A', 20, 'hard', NULL, TRUE, 'S');

-- Pair Aces (AA) -> encode as 12 + soft + pair
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(104, '2', 12, 'soft', NULL, TRUE, 'P'),
(104, '3', 12, 'soft', NULL, TRUE, 'P'),
(104, '4', 12, 'soft', NULL, TRUE, 'P'),
(104, '5', 12, 'soft', NULL, TRUE, 'P'),
(104, '6', 12, 'soft', NULL, TRUE, 'P'),
(104, '7', 12, 'soft', NULL, TRUE, 'P'),
(104, '8', 12, 'soft', NULL, TRUE, 'P'),
(104, '9', 12, 'soft', NULL, TRUE, 'P'),
(104,'10', 12, 'soft', NULL, TRUE, 'P'),
(104, 'A', 12, 'soft', NULL, TRUE, 'P');
