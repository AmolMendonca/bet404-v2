-- =========================================
-- Create Spanish_4to9 chart for test_user1
-- =========================================
INSERT INTO charts (chart_id, user_id, mode)
VALUES (99, 'test_user1', 'Spanish_4to9')
ON CONFLICT (chart_id) DO NOTHING;

-- If rerunning, clear previous entries for chart 99
DELETE FROM chart_entries WHERE chart_id = 99;

-- =========================
-- H A R D   T O T A L S
-- =========================

-- Hard 8
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',8,'hard',NULL,FALSE,'H'),
(99,'3',8,'hard',NULL,FALSE,'H'),
(99,'4',8,'hard',NULL,FALSE,'H'),
(99,'5',8,'hard',NULL,FALSE,'H'),
(99,'6',8,'hard',NULL,FALSE,'H'),
(99,'7',8,'hard',NULL,FALSE,'H'),
(99,'8',8,'hard',NULL,FALSE,'H'),
(99,'9',8,'hard',NULL,FALSE,'H'),
(99,'10',8,'hard',NULL,FALSE,'H'),
(99,'A',8,'hard',NULL,FALSE,'H');

-- Hard 9
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',9,'hard',NULL,FALSE,'H'),
(99,'3',9,'hard',NULL,FALSE,'H'),
(99,'4',9,'hard',NULL,FALSE,'H'),
(99,'5',9,'hard',NULL,FALSE,'H'),
(99,'6',9,'hard',NULL,FALSE,'H'),
(99,'7',9,'hard',NULL,FALSE,'H'),
(99,'8',9,'hard',NULL,FALSE,'H'),
(99,'9',9,'hard',NULL,FALSE,'H'),
(99,'10',9,'hard',NULL,FALSE,'H'),
(99,'A',9,'hard',NULL,FALSE,'H');

-- Hard 10
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',10,'hard',NULL,FALSE,'H'),
(99,'3',10,'hard',NULL,FALSE,'H'),
(99,'4',10,'hard',NULL,FALSE,'H'),
(99,'5',10,'hard',NULL,FALSE,'H'),
(99,'6',10,'hard',NULL,FALSE,'H'),
(99,'7',10,'hard',NULL,FALSE,'H'),
(99,'8',10,'hard',NULL,FALSE,'H'),
(99,'9',10,'hard',NULL,FALSE,'H'),
(99,'10',10,'hard',NULL,FALSE,'H'),
(99,'A',10,'hard',NULL,FALSE,'H');

-- Hard 11
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',11,'hard',NULL,FALSE,'H'),
(99,'3',11,'hard',NULL,FALSE,'H'),
(99,'4',11,'hard',NULL,FALSE,'H'),
(99,'5',11,'hard',NULL,FALSE,'H'),
(99,'6',11,'hard',NULL,FALSE,'H'),
(99,'7',11,'hard',NULL,FALSE,'H'),
(99,'8',11,'hard',NULL,FALSE,'H'),
(99,'9',11,'hard',NULL,FALSE,'H'),
(99,'10',11,'hard',NULL,FALSE,'H'),
(99,'A',11,'hard',NULL,FALSE,'H');

-- Hard 12
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',12,'hard',NULL,FALSE,'H'),
(99,'3',12,'hard',NULL,FALSE,'H'),
(99,'4',12,'hard',NULL,FALSE,'H'),
(99,'5',12,'hard',NULL,FALSE,'H'),
(99,'6',12,'hard',NULL,FALSE,'H'),
(99,'7',12,'hard',NULL,FALSE,'H'),
(99,'8',12,'hard',NULL,FALSE,'H'),
(99,'9',12,'hard',NULL,FALSE,'H'),
(99,'10',12,'hard',NULL,FALSE,'H'),
(99,'A',12,'hard',NULL,FALSE,'H');

-- Hard 13
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',13,'hard',NULL,FALSE,'H'),
(99,'3',13,'hard',NULL,FALSE,'H'),
(99,'4',13,'hard',NULL,FALSE,'H'),
(99,'5',13,'hard',NULL,FALSE,'H'),
(99,'6',13,'hard',NULL,FALSE,'H'),
(99,'7',13,'hard',NULL,FALSE,'H'),
(99,'8',13,'hard',NULL,FALSE,'H'),
(99,'9',13,'hard',NULL,FALSE,'H'),
(99,'10',13,'hard',NULL,FALSE,'H'),
(99,'A',13,'hard',NULL,FALSE,'H');

-- Hard 14
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',14,'hard',NULL,FALSE,'H'),
(99,'3',14,'hard',NULL,FALSE,'H'),
(99,'4',14,'hard',NULL,FALSE,'H'),
(99,'5',14,'hard',NULL,FALSE,'H'),
(99,'6',14,'hard',NULL,FALSE,'H'),
(99,'7',14,'hard',NULL,FALSE,'H'),
(99,'8',14,'hard',NULL,FALSE,'H'),
(99,'9',14,'hard',NULL,FALSE,'H'),
(99,'10',14,'hard',NULL,FALSE,'H'),
(99,'A',14,'hard',NULL,FALSE,'H');

-- Hard 15
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',15,'hard',NULL,FALSE,'H'),
(99,'3',15,'hard',NULL,FALSE,'H'),
(99,'4',15,'hard',NULL,FALSE,'H'),
(99,'5',15,'hard',NULL,FALSE,'H'),
(99,'6',15,'hard',NULL,FALSE,'H'),
(99,'7',15,'hard',NULL,FALSE,'H'),
(99,'8',15,'hard',NULL,FALSE,'H'),
(99,'9',15,'hard',NULL,FALSE,'H'),
(99,'10',15,'hard',NULL,FALSE,'H'),
(99,'A',15,'hard',NULL,FALSE,'H');

-- Hard 16
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',16,'hard',NULL,FALSE,'H'),
(99,'3',16,'hard',NULL,FALSE,'H'),
(99,'4',16,'hard',NULL,FALSE,'H'),
(99,'5',16,'hard',NULL,FALSE,'H'),
(99,'6',16,'hard',NULL,FALSE,'H'),
(99,'7',16,'hard',NULL,FALSE,'H'),
(99,'8',16,'hard',NULL,FALSE,'H'),
(99,'9',16,'hard',NULL,FALSE,'H'),
(99,'10',16,'hard',NULL,FALSE,'H'),
(99,'A',16,'hard',NULL,FALSE,'H');

-- Hard 17
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',17,'hard',NULL,FALSE,'H'),
(99,'3',17,'hard',NULL,FALSE,'H'),
(99,'4',17,'hard',NULL,FALSE,'H'),
(99,'5',17,'hard',NULL,FALSE,'H'),
(99,'6',17,'hard',NULL,FALSE,'H'),
(99,'7',17,'hard',NULL,FALSE,'H'),
(99,'8',17,'hard',NULL,FALSE,'H'),
(99,'9',17,'hard',NULL,FALSE,'H'),
(99,'10',17,'hard',NULL,FALSE,'H'),
(99,'A',17,'hard',NULL,FALSE,'H');

-- Hard 18
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',18,'hard',NULL,FALSE,'H'),
(99,'3',18,'hard',NULL,FALSE,'H'),
(99,'4',18,'hard',NULL,FALSE,'H'),
(99,'5',18,'hard',NULL,FALSE,'H'),
(99,'6',18,'hard',NULL,FALSE,'H'),
(99,'7',18,'hard',NULL,FALSE,'H'),
(99,'8',18,'hard',NULL,FALSE,'H'),
(99,'9',18,'hard',NULL,FALSE,'H'),
(99,'10',18,'hard',NULL,FALSE,'H'),
(99,'A',18,'hard',NULL,FALSE,'H');

-- =========================
-- S O F T   T O T A L S
-- =========================

-- Soft 13 (A2)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',13,'soft',NULL,FALSE,'H'),
(99,'3',13,'soft',NULL,FALSE,'H'),
(99,'4',13,'soft',NULL,FALSE,'H'),
(99,'5',13,'soft',NULL,FALSE,'H'),
(99,'6',13,'soft',NULL,FALSE,'H'),
(99,'7',13,'soft',NULL,FALSE,'H'),
(99,'8',13,'soft',NULL,FALSE,'H'),
(99,'9',13,'soft',NULL,FALSE,'H'),
(99,'10',13,'soft',NULL,FALSE,'H'),
(99,'A',13,'soft',NULL,FALSE,'H');

-- Soft 14 (A3)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',14,'soft',NULL,FALSE,'H'),
(99,'3',14,'soft',NULL,FALSE,'H'),
(99,'4',14,'soft',NULL,FALSE,'H'),
(99,'5',14,'soft',NULL,FALSE,'H'),
(99,'6',14,'soft',NULL,FALSE,'H'),
(99,'7',14,'soft',NULL,FALSE,'H'),
(99,'8',14,'soft',NULL,FALSE,'H'),
(99,'9',14,'soft',NULL,FALSE,'H'),
(99,'10',14,'soft',NULL,FALSE,'H'),
(99,'A',14,'soft',NULL,FALSE,'H');

-- Soft 15 (A4)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',15,'soft',NULL,FALSE,'H'),
(99,'3',15,'soft',NULL,FALSE,'H'),
(99,'4',15,'soft',NULL,FALSE,'H'),
(99,'5',15,'soft',NULL,FALSE,'H'),
(99,'6',15,'soft',NULL,FALSE,'H'),
(99,'7',15,'soft',NULL,FALSE,'H'),
(99,'8',15,'soft',NULL,FALSE,'H'),
(99,'9',15,'soft',NULL,FALSE,'H'),
(99,'10',15,'soft',NULL,FALSE,'H'),
(99,'A',15,'soft',NULL,FALSE,'H');

-- Soft 16 (A5)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',16,'soft',NULL,FALSE,'H'),
(99,'3',16,'soft',NULL,FALSE,'H'),
(99,'4',16,'soft',NULL,FALSE,'H'),
(99,'5',16,'soft',NULL,FALSE,'H'),
(99,'6',16,'soft',NULL,FALSE,'H'),
(99,'7',16,'soft',NULL,FALSE,'H'),
(99,'8',16,'soft',NULL,FALSE,'H'),
(99,'9',16,'soft',NULL,FALSE,'H'),
(99,'10',16,'soft',NULL,FALSE,'H'),
(99,'A',16,'soft',NULL,FALSE,'H');

-- Soft 17 (A6)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',17,'soft',NULL,FALSE,'H'),
(99,'3',17,'soft',NULL,FALSE,'H'),
(99,'4',17,'soft',NULL,FALSE,'H'),
(99,'5',17,'soft',NULL,FALSE,'H'),
(99,'6',17,'soft',NULL,FALSE,'H'),
(99,'7',17,'soft',NULL,FALSE,'H'),
(99,'8',17,'soft',NULL,FALSE,'H'),
(99,'9',17,'soft',NULL,FALSE,'H'),
(99,'10',17,'soft',NULL,FALSE,'H'),
(99,'A',17,'soft',NULL,FALSE,'H');

-- Soft 18 (A7)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',18,'soft',NULL,FALSE,'H'),
(99,'3',18,'soft',NULL,FALSE,'H'),
(99,'4',18,'soft',NULL,FALSE,'H'),
(99,'5',18,'soft',NULL,FALSE,'H'),
(99,'6',18,'soft',NULL,FALSE,'H'),
(99,'7',18,'soft',NULL,FALSE,'H'),
(99,'8',18,'soft',NULL,FALSE,'H'),
(99,'9',18,'soft',NULL,FALSE,'H'),
(99,'10',18,'soft',NULL,FALSE,'H'),
(99,'A',18,'soft',NULL,FALSE,'H');

-- Soft 19 (A8)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',19,'soft',NULL,FALSE,'H'),
(99,'3',19,'soft',NULL,FALSE,'H'),
(99,'4',19,'soft',NULL,FALSE,'H'),
(99,'5',19,'soft',NULL,FALSE,'H'),
(99,'6',19,'soft',NULL,FALSE,'H'),
(99,'7',19,'soft',NULL,FALSE,'H'),
(99,'8',19,'soft',NULL,FALSE,'H'),
(99,'9',19,'soft',NULL,FALSE,'H'),
(99,'10',19,'soft',NULL,FALSE,'H'),
(99,'A',19,'soft',NULL,FALSE,'H');

-- =========================
-- P A I R S
-- =========================

-- 22
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',22,'hard',NULL,TRUE,'H'),
(99,'3',22,'hard',NULL,TRUE,'H'),
(99,'4',22,'hard',NULL,TRUE,'H'),
(99,'5',22,'hard',NULL,TRUE,'H'),
(99,'6',22,'hard',NULL,TRUE,'H'),
(99,'7',22,'hard',NULL,TRUE,'H'),
(99,'8',22,'hard',NULL,TRUE,'H'),
(99,'9',22,'hard',NULL,TRUE,'H'),
(99,'10',22,'hard',NULL,TRUE,'H'),
(99,'A',22,'hard',NULL,TRUE,'H');

-- 33
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',33,'hard',NULL,TRUE,'H'),
(99,'3',33,'hard',NULL,TRUE,'H'),
(99,'4',33,'hard',NULL,TRUE,'H'),
(99,'5',33,'hard',NULL,TRUE,'H'),
(99,'6',33,'hard',NULL,TRUE,'H'),
(99,'7',33,'hard',NULL,TRUE,'H'),
(99,'8',33,'hard',NULL,TRUE,'H'),
(99,'9',33,'hard',NULL,TRUE,'H'),
(99,'10',33,'hard',NULL,TRUE,'H'),
(99,'A',33,'hard',NULL,TRUE,'H');

-- 44
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',44,'hard',NULL,TRUE,'H'),
(99,'3',44,'hard',NULL,TRUE,'H'),
(99,'4',44,'hard',NULL,TRUE,'H'),
(99,'5',44,'hard',NULL,TRUE,'H'),
(99,'6',44,'hard',NULL,TRUE,'H'),
(99,'7',44,'hard',NULL,TRUE,'H'),
(99,'8',44,'hard',NULL,TRUE,'H'),
(99,'9',44,'hard',NULL,TRUE,'H'),
(99,'10',44,'hard',NULL,TRUE,'H'),
(99,'A',44,'hard',NULL,TRUE,'H');

-- 55
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',55,'hard',NULL,TRUE,'H'),
(99,'3',55,'hard',NULL,TRUE,'H'),
(99,'4',55,'hard',NULL,TRUE,'H'),
(99,'5',55,'hard',NULL,TRUE,'H'),
(99,'6',55,'hard',NULL,TRUE,'H'),
(99,'7',55,'hard',NULL,TRUE,'H'),
(99,'8',55,'hard',NULL,TRUE,'H'),
(99,'9',55,'hard',NULL,TRUE,'H'),
(99,'10',55,'hard',NULL,TRUE,'H'),
(99,'A',55,'hard',NULL,TRUE,'H');

-- 66
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',66,'hard',NULL,TRUE,'H'),
(99,'3',66,'hard',NULL,TRUE,'H'),
(99,'4',66,'hard',NULL,TRUE,'H'),
(99,'5',66,'hard',NULL,TRUE,'H'),
(99,'6',66,'hard',NULL,TRUE,'H'),
(99,'7',66,'hard',NULL,TRUE,'H'),
(99,'8',66,'hard',NULL,TRUE,'H'),
(99,'9',66,'hard',NULL,TRUE,'H'),
(99,'10',66,'hard',NULL,TRUE,'H'),
(99,'A',66,'hard',NULL,TRUE,'H');

-- 77
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',77,'hard',NULL,TRUE,'H'),
(99,'3',77,'hard',NULL,TRUE,'H'),
(99,'4',77,'hard',NULL,TRUE,'H'),
(99,'5',77,'hard',NULL,TRUE,'H'),
(99,'6',77,'hard',NULL,TRUE,'H'),
(99,'7',77,'hard',NULL,TRUE,'H'),
(99,'8',77,'hard',NULL,TRUE,'H'),
(99,'9',77,'hard',NULL,TRUE,'H'),
(99,'10',77,'hard',NULL,TRUE,'H'),
(99,'A',77,'hard',NULL,TRUE,'H');

-- 88
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',88,'hard',NULL,TRUE,'H'),
(99,'3',88,'hard',NULL,TRUE,'H'),
(99,'4',88,'hard',NULL,TRUE,'H'),
(99,'5',88,'hard',NULL,TRUE,'H'),
(99,'6',88,'hard',NULL,TRUE,'H'),
(99,'7',88,'hard',NULL,TRUE,'H'),
(99,'8',88,'hard',NULL,TRUE,'H'),
(99,'9',88,'hard',NULL,TRUE,'H'),
(99,'10',88,'hard',NULL,TRUE,'H'),
(99,'A',88,'hard',NULL,TRUE,'H');

-- 99
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',99,'hard',NULL,TRUE,'H'),
(99,'3',99,'hard',NULL,TRUE,'H'),
(99,'4',99,'hard',NULL,TRUE,'H'),
(99,'5',99,'hard',NULL,TRUE,'H'),
(99,'6',99,'hard',NULL,TRUE,'H'),
(99,'7',99,'hard',NULL,TRUE,'H'),
(99,'8',99,'hard',NULL,TRUE,'H'),
(99,'9',99,'hard',NULL,TRUE,'H'),
(99,'10',99,'hard',NULL,TRUE,'H'),
(99,'A',99,'hard',NULL,TRUE,'H');

-- TT (20)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2',20,'hard',NULL,TRUE,'H'),
(99,'3',20,'hard',NULL,TRUE,'H'),
(99,'4',20,'hard',NULL,TRUE,'H'),
(99,'5',20,'hard',NULL,TRUE,'H'),
(99,'6',20,'hard',NULL,TRUE,'H'),
(99,'7',20,'hard',NULL,TRUE,'H'),
(99,'8',20,'hard',NULL,TRUE,'H'),
(99,'9',20,'hard',NULL,TRUE,'H'),
(99,'10',20,'hard',NULL,TRUE,'H'),
(99,'A',20,'hard',NULL,TRUE,'H');

-- AA (Spanish) encode as 12 + soft + pair; keep move 'H' as in your seed
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(99,'2', 12,'soft',NULL,TRUE,'H'),
(99,'3', 12,'soft',NULL,TRUE,'H'),
(99,'4', 12,'soft',NULL,TRUE,'H'),
(99,'5', 12,'soft',NULL,TRUE,'H'),
(99,'6', 12,'soft',NULL,TRUE,'H'),
(99,'7', 12,'soft',NULL,TRUE,'H'),
(99,'8', 12,'soft',NULL,TRUE,'H'),
(99,'9', 12,'soft',NULL,TRUE,'H'),
(99,'10',12,'soft',NULL,TRUE,'H'),
(99,'A', 12,'soft',NULL,TRUE,'H');


-- =========================================
-- Create Spanish_2to3 chart for test_user1
-- =========================================
INSERT INTO charts (chart_id, user_id, mode)
VALUES (98, 'test_user1', 'Spanish_2to3')
ON CONFLICT (chart_id) DO NOTHING;

-- If rerunning, clear previous entries for chart 98
DELETE FROM chart_entries WHERE chart_id = 98;

-- =========================
-- H A R D   T O T A L S
-- =========================

-- Hard 8
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',8,'hard',NULL,FALSE,'H'),
(98,'3',8,'hard',NULL,FALSE,'H'),
(98,'4',8,'hard',NULL,FALSE,'H'),
(98,'5',8,'hard',NULL,FALSE,'H'),
(98,'6',8,'hard',NULL,FALSE,'H'),
(98,'7',8,'hard',NULL,FALSE,'H'),
(98,'8',8,'hard',NULL,FALSE,'H'),
(98,'9',8,'hard',NULL,FALSE,'H'),
(98,'10',8,'hard',NULL,FALSE,'H'),
(98,'A',8,'hard',NULL,FALSE,'H');

-- Hard 9
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',9,'hard',NULL,FALSE,'H'),
(98,'3',9,'hard',NULL,FALSE,'H'),
(98,'4',9,'hard',NULL,FALSE,'H'),
(98,'5',9,'hard',NULL,FALSE,'H'),
(98,'6',9,'hard',NULL,FALSE,'H'),
(98,'7',9,'hard',NULL,FALSE,'H'),
(98,'8',9,'hard',NULL,FALSE,'H'),
(98,'9',9,'hard',NULL,FALSE,'H'),
(98,'10',9,'hard',NULL,FALSE,'H'),
(98,'A',9,'hard',NULL,FALSE,'H');

-- Hard 10
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',10,'hard',NULL,FALSE,'H'),
(98,'3',10,'hard',NULL,FALSE,'H'),
(98,'4',10,'hard',NULL,FALSE,'H'),
(98,'5',10,'hard',NULL,FALSE,'H'),
(98,'6',10,'hard',NULL,FALSE,'H'),
(98,'7',10,'hard',NULL,FALSE,'H'),
(98,'8',10,'hard',NULL,FALSE,'H'),
(98,'9',10,'hard',NULL,FALSE,'H'),
(98,'10',10,'hard',NULL,FALSE,'H'),
(98,'A',10,'hard',NULL,FALSE,'H');

-- Hard 11
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',11,'hard',NULL,FALSE,'H'),
(98,'3',11,'hard',NULL,FALSE,'H'),
(98,'4',11,'hard',NULL,FALSE,'H'),
(98,'5',11,'hard',NULL,FALSE,'H'),
(98,'6',11,'hard',NULL,FALSE,'H'),
(98,'7',11,'hard',NULL,FALSE,'H'),
(98,'8',11,'hard',NULL,FALSE,'H'),
(98,'9',11,'hard',NULL,FALSE,'H'),
(98,'10',11,'hard',NULL,FALSE,'H'),
(98,'A',11,'hard',NULL,FALSE,'H');

-- Hard 12
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',12,'hard',NULL,FALSE,'H'),
(98,'3',12,'hard',NULL,FALSE,'H'),
(98,'4',12,'hard',NULL,FALSE,'H'),
(98,'5',12,'hard',NULL,FALSE,'H'),
(98,'6',12,'hard',NULL,FALSE,'H'),
(98,'7',12,'hard',NULL,FALSE,'H'),
(98,'8',12,'hard',NULL,FALSE,'H'),
(98,'9',12,'hard',NULL,FALSE,'H'),
(98,'10',12,'hard',NULL,FALSE,'H'),
(98,'A',12,'hard',NULL,FALSE,'H');

-- Hard 13
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',13,'hard',NULL,FALSE,'H'),
(98,'3',13,'hard',NULL,FALSE,'H'),
(98,'4',13,'hard',NULL,FALSE,'H'),
(98,'5',13,'hard',NULL,FALSE,'H'),
(98,'6',13,'hard',NULL,FALSE,'H'),
(98,'7',13,'hard',NULL,FALSE,'H'),
(98,'8',13,'hard',NULL,FALSE,'H'),
(98,'9',13,'hard',NULL,FALSE,'H'),
(98,'10',13,'hard',NULL,FALSE,'H'),
(98,'A',13,'hard',NULL,FALSE,'H');

-- Hard 14
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',14,'hard',NULL,FALSE,'H'),
(98,'3',14,'hard',NULL,FALSE,'H'),
(98,'4',14,'hard',NULL,FALSE,'H'),
(98,'5',14,'hard',NULL,FALSE,'H'),
(98,'6',14,'hard',NULL,FALSE,'H'),
(98,'7',14,'hard',NULL,FALSE,'H'),
(98,'8',14,'hard',NULL,FALSE,'H'),
(98,'9',14,'hard',NULL,FALSE,'H'),
(98,'10',14,'hard',NULL,FALSE,'H'),
(98,'A',14,'hard',NULL,FALSE,'H');

-- Hard 15
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',15,'hard',NULL,FALSE,'H'),
(98,'3',15,'hard',NULL,FALSE,'H'),
(98,'4',15,'hard',NULL,FALSE,'H'),
(98,'5',15,'hard',NULL,FALSE,'H'),
(98,'6',15,'hard',NULL,FALSE,'H'),
(98,'7',15,'hard',NULL,FALSE,'H'),
(98,'8',15,'hard',NULL,FALSE,'H'),
(98,'9',15,'hard',NULL,FALSE,'H'),
(98,'10',15,'hard',NULL,FALSE,'H'),
(98,'A',15,'hard',NULL,FALSE,'H');

-- Hard 16
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',16,'hard',NULL,FALSE,'H'),
(98,'3',16,'hard',NULL,FALSE,'H'),
(98,'4',16,'hard',NULL,FALSE,'H'),
(98,'5',16,'hard',NULL,FALSE,'H'),
(98,'6',16,'hard',NULL,FALSE,'H'),
(98,'7',16,'hard',NULL,FALSE,'H'),
(98,'8',16,'hard',NULL,FALSE,'H'),
(98,'9',16,'hard',NULL,FALSE,'H'),
(98,'10',16,'hard',NULL,FALSE,'H'),
(98,'A',16,'hard',NULL,FALSE,'H');

-- Hard 17
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',17,'hard',NULL,FALSE,'H'),
(98,'3',17,'hard',NULL,FALSE,'H'),
(98,'4',17,'hard',NULL,FALSE,'H'),
(98,'5',17,'hard',NULL,FALSE,'H'),
(98,'6',17,'hard',NULL,FALSE,'H'),
(98,'7',17,'hard',NULL,FALSE,'H'),
(98,'8',17,'hard',NULL,FALSE,'H'),
(98,'9',17,'hard',NULL,FALSE,'H'),
(98,'10',17,'hard',NULL,FALSE,'H'),
(98,'A',17,'hard',NULL,FALSE,'H');

-- Hard 18
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',18,'hard',NULL,FALSE,'H'),
(98,'3',18,'hard',NULL,FALSE,'H'),
(98,'4',18,'hard',NULL,FALSE,'H'),
(98,'5',18,'hard',NULL,FALSE,'H'),
(98,'6',18,'hard',NULL,FALSE,'H'),
(98,'7',18,'hard',NULL,FALSE,'H'),
(98,'8',18,'hard',NULL,FALSE,'H'),
(98,'9',18,'hard',NULL,FALSE,'H'),
(98,'10',18,'hard',NULL,FALSE,'H'),
(98,'A',18,'hard',NULL,FALSE,'H');

-- =========================
-- S O F T   T O T A L S
-- =========================

-- Soft 13 (A2)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',13,'soft',NULL,FALSE,'H'),
(98,'3',13,'soft',NULL,FALSE,'H'),
(98,'4',13,'soft',NULL,FALSE,'H'),
(98,'5',13,'soft',NULL,FALSE,'H'),
(98,'6',13,'soft',NULL,FALSE,'H'),
(98,'7',13,'soft',NULL,FALSE,'H'),
(98,'8',13,'soft',NULL,FALSE,'H'),
(98,'9',13,'soft',NULL,FALSE,'H'),
(98,'10',13,'soft',NULL,FALSE,'H'),
(98,'A',13,'soft',NULL,FALSE,'H');

-- Soft 14 (A3)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',14,'soft',NULL,FALSE,'H'),
(98,'3',14,'soft',NULL,FALSE,'H'),
(98,'4',14,'soft',NULL,FALSE,'H'),
(98,'5',14,'soft',NULL,FALSE,'H'),
(98,'6',14,'soft',NULL,FALSE,'H'),
(98,'7',14,'soft',NULL,FALSE,'H'),
(98,'8',14,'soft',NULL,FALSE,'H'),
(98,'9',14,'soft',NULL,FALSE,'H'),
(98,'10',14,'soft',NULL,FALSE,'H'),
(98,'A',14,'soft',NULL,FALSE,'H');

-- Soft 15 (A4)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',15,'soft',NULL,FALSE,'H'),
(98,'3',15,'soft',NULL,FALSE,'H'),
(98,'4',15,'soft',NULL,FALSE,'H'),
(98,'5',15,'soft',NULL,FALSE,'H'),
(98,'6',15,'soft',NULL,FALSE,'H'),
(98,'7',15,'soft',NULL,FALSE,'H'),
(98,'8',15,'soft',NULL,FALSE,'H'),
(98,'9',15,'soft',NULL,FALSE,'H'),
(98,'10',15,'soft',NULL,FALSE,'H'),
(98,'A',15,'soft',NULL,FALSE,'H');

-- Soft 16 (A5)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',16,'soft',NULL,FALSE,'H'),
(98,'3',16,'soft',NULL,FALSE,'H'),
(98,'4',16,'soft',NULL,FALSE,'H'),
(98,'5',16,'soft',NULL,FALSE,'H'),
(98,'6',16,'soft',NULL,FALSE,'H'),
(98,'7',16,'soft',NULL,FALSE,'H'),
(98,'8',16,'soft',NULL,FALSE,'H'),
(98,'9',16,'soft',NULL,FALSE,'H'),
(98,'10',16,'soft',NULL,FALSE,'H'),
(98,'A',16,'soft',NULL,FALSE,'H');

-- Soft 17 (A6)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',17,'soft',NULL,FALSE,'H'),
(98,'3',17,'soft',NULL,FALSE,'H'),
(98,'4',17,'soft',NULL,FALSE,'H'),
(98,'5',17,'soft',NULL,FALSE,'H'),
(98,'6',17,'soft',NULL,FALSE,'H'),
(98,'7',17,'soft',NULL,FALSE,'H'),
(98,'8',17,'soft',NULL,FALSE,'H'),
(98,'9',17,'soft',NULL,FALSE,'H'),
(98,'10',17,'soft',NULL,FALSE,'H'),
(98,'A',17,'soft',NULL,FALSE,'H');

-- Soft 18 (A7)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',18,'soft',NULL,FALSE,'H'),
(98,'3',18,'soft',NULL,FALSE,'H'),
(98,'4',18,'soft',NULL,FALSE,'H'),
(98,'5',18,'soft',NULL,FALSE,'H'),
(98,'6',18,'soft',NULL,FALSE,'H'),
(98,'7',18,'soft',NULL,FALSE,'H'),
(98,'8',18,'soft',NULL,FALSE,'H'),
(98,'9',18,'soft',NULL,FALSE,'H'),
(98,'10',18,'soft',NULL,FALSE,'H'),
(98,'A',18,'soft',NULL,FALSE,'H');

-- Soft 19 (A8)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',19,'soft',NULL,FALSE,'H'),
(98,'3',19,'soft',NULL,FALSE,'H'),
(98,'4',19,'soft',NULL,FALSE,'H'),
(98,'5',19,'soft',NULL,FALSE,'H'),
(98,'6',19,'soft',NULL,FALSE,'H'),
(98,'7',19,'soft',NULL,FALSE,'H'),
(98,'8',19,'soft',NULL,FALSE,'H'),
(98,'9',19,'soft',NULL,FALSE,'H'),
(98,'10',19,'soft',NULL,FALSE,'H'),
(98,'A',19,'soft',NULL,FALSE,'H');

-- =========================
-- P A I R S
-- =========================

-- 22 (pair of 2s)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',22,'hard',NULL,TRUE,'H'),
(98,'3',22,'hard',NULL,TRUE,'H'),
(98,'4',22,'hard',NULL,TRUE,'H'),
(98,'5',22,'hard',NULL,TRUE,'H'),
(98,'6',22,'hard',NULL,TRUE,'H'),
(98,'7',22,'hard',NULL,TRUE,'H'),
(98,'8',22,'hard',NULL,TRUE,'H'),
(98,'9',22,'hard',NULL,TRUE,'H'),
(98,'10',22,'hard',NULL,TRUE,'H'),
(98,'A',22,'hard',NULL,TRUE,'H');

-- 33
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',33,'hard',NULL,TRUE,'H'),
(98,'3',33,'hard',NULL,TRUE,'H'),
(98,'4',33,'hard',NULL,TRUE,'H'),
(98,'5',33,'hard',NULL,TRUE,'H'),
(98,'6',33,'hard',NULL,TRUE,'H'),
(98,'7',33,'hard',NULL,TRUE,'H'),
(98,'8',33,'hard',NULL,TRUE,'H'),
(98,'9',33,'hard',NULL,TRUE,'H'),
(98,'10',33,'hard',NULL,TRUE,'H'),
(98,'A',33,'hard',NULL,TRUE,'H');

-- 44
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',44,'hard',NULL,TRUE,'H'),
(98,'3',44,'hard',NULL,TRUE,'H'),
(98,'4',44,'hard',NULL,TRUE,'H'),
(98,'5',44,'hard',NULL,TRUE,'H'),
(98,'6',44,'hard',NULL,TRUE,'H'),
(98,'7',44,'hard',NULL,TRUE,'H'),
(98,'8',44,'hard',NULL,TRUE,'H'),
(98,'9',44,'hard',NULL,TRUE,'H'),
(98,'10',44,'hard',NULL,TRUE,'H'),
(98,'A',44,'hard',NULL,TRUE,'H');

-- 55
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',55,'hard',NULL,TRUE,'H'),
(98,'3',55,'hard',NULL,TRUE,'H'),
(98,'4',55,'hard',NULL,TRUE,'H'),
(98,'5',55,'hard',NULL,TRUE,'H'),
(98,'6',55,'hard',NULL,TRUE,'H'),
(98,'7',55,'hard',NULL,TRUE,'H'),
(98,'8',55,'hard',NULL,TRUE,'H'),
(98,'9',55,'hard',NULL,TRUE,'H'),
(98,'10',55,'hard',NULL,TRUE,'H'),
(98,'A',55,'hard',NULL,TRUE,'H');

-- 66
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',66,'hard',NULL,TRUE,'H'),
(98,'3',66,'hard',NULL,TRUE,'H'),
(98,'4',66,'hard',NULL,TRUE,'H'),
(98,'5',66,'hard',NULL,TRUE,'H'),
(98,'6',66,'hard',NULL,TRUE,'H'),
(98,'7',66,'hard',NULL,TRUE,'H'),
(98,'8',66,'hard',NULL,TRUE,'H'),
(98,'9',66,'hard',NULL,TRUE,'H'),
(98,'10',66,'hard',NULL,TRUE,'H'),
(98,'A',66,'hard',NULL,TRUE,'H');

-- 77
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',77,'hard',NULL,TRUE,'H'),
(98,'3',77,'hard',NULL,TRUE,'H'),
(98,'4',77,'hard',NULL,TRUE,'H'),
(98,'5',77,'hard',NULL,TRUE,'H'),
(98,'6',77,'hard',NULL,TRUE,'H'),
(98,'7',77,'hard',NULL,TRUE,'H'),
(98,'8',77,'hard',NULL,TRUE,'H'),
(98,'9',77,'hard',NULL,TRUE,'H'),
(98,'10',77,'hard',NULL,TRUE,'H'),
(98,'A',77,'hard',NULL,TRUE,'H');

-- 88
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',88,'hard',NULL,TRUE,'H'),
(98,'3',88,'hard',NULL,TRUE,'H'),
(98,'4',88,'hard',NULL,TRUE,'H'),
(98,'5',88,'hard',NULL,TRUE,'H'),
(98,'6',88,'hard',NULL,TRUE,'H'),
(98,'7',88,'hard',NULL,TRUE,'H'),
(98,'8',88,'hard',NULL,TRUE,'H'),
(98,'9',88,'hard',NULL,TRUE,'H'),
(98,'10',88,'hard',NULL,TRUE,'H'),
(98,'A',88,'hard',NULL,TRUE,'H');

-- 99
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',99,'hard',NULL,TRUE,'H'),
(98,'3',99,'hard',NULL,TRUE,'H'),
(98,'4',99,'hard',NULL,TRUE,'H'),
(98,'5',99,'hard',NULL,TRUE,'H'),
(98,'6',99,'hard',NULL,TRUE,'H'),
(98,'7',99,'hard',NULL,TRUE,'H'),
(98,'8',99,'hard',NULL,TRUE,'H'),
(98,'9',99,'hard',NULL,TRUE,'H'),
(98,'10',99,'hard',NULL,TRUE,'H'),
(98,'A',99,'hard',NULL,TRUE,'H');

-- TT (20)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2',20,'hard',NULL,TRUE,'H'),
(98,'3',20,'hard',NULL,TRUE,'H'),
(98,'4',20,'hard',NULL,TRUE,'H'),
(98,'5',20,'hard',NULL,TRUE,'H'),
(98,'6',20,'hard',NULL,TRUE,'H'),
(98,'7',20,'hard',NULL,TRUE,'H'),
(98,'8',20,'hard',NULL,TRUE,'H'),
(98,'9',20,'hard',NULL,TRUE,'H'),
(98,'10',20,'hard',NULL,TRUE,'H'),
(98,'A',20,'hard',NULL,TRUE,'H');

-- AA (Spanish) encode as 12 + soft + pair; keep move 'H' as in your seed
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(98,'2', 12,'soft',NULL,TRUE,'H'),
(98,'3', 12,'soft',NULL,TRUE,'H'),
(98,'4', 12,'soft',NULL,TRUE,'H'),
(98,'5', 12,'soft',NULL,TRUE,'H'),
(98,'6', 12,'soft',NULL,TRUE,'H'),
(98,'7', 12,'soft',NULL,TRUE,'H'),
(98,'8', 12,'soft',NULL,TRUE,'H'),
(98,'9', 12,'soft',NULL,TRUE,'H'),
(98,'10',12,'soft',NULL,TRUE,'H'),
(98,'A', 12,'soft',NULL,TRUE,'H');

