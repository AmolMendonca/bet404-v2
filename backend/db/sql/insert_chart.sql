-- Insert the 4-10 chart record for test_user1 with chart_id = 100
-- INSERT INTO charts (chart_id, user_id, mode)
-- VALUES
--   (100, 'test_user1', '4-10');



INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2', 7, 'hard', NULL, FALSE, 'H'),
(100, '3', 7, 'hard', NULL, FALSE, 'H'),
(100, '4', 7, 'hard', NULL, FALSE, 'H'),
(100, '5', 7, 'hard', NULL, FALSE, 'H'),
(100, '6', 7, 'hard', NULL, FALSE, 'H'),
(100, '7', 7, 'hard', NULL, FALSE, 'H'),
(100, '8', 7, 'hard', NULL, FALSE, 'H'),
(100, '9', 7, 'hard', NULL, FALSE, 'H'),
(100,'10', 7, 'hard', NULL, FALSE, 'H'),
(100, 'A', 7, 'hard', NULL, FALSE, 'H');

-- Hard 8
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2', 8, 'hard', NULL, FALSE, 'H'),
(100, '3', 8, 'hard', NULL, FALSE, 'H'),
(100, '4', 8, 'hard', NULL, FALSE, 'H'),
(100, '5', 8, 'hard', NULL, FALSE, 'H'),
(100, '6', 8, 'hard', NULL, FALSE, 'H'),
(100, '7', 8, 'hard', NULL, FALSE, 'D'),
(100, '8', 8, 'hard', NULL, FALSE, 'H'),
(100, '9', 8, 'hard', NULL, FALSE, 'H'),
(100,'10', 8, 'hard', NULL, FALSE, 'H'),
(100, 'A', 8, 'hard', NULL, FALSE, 'H');

-- Hard 9
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2', 9, 'hard', NULL, FALSE, 'H'),
(100, '3', 9, 'hard', NULL, FALSE, 'H'),
(100, '4', 9, 'hard', NULL, FALSE, 'D'),
(100, '5', 9, 'hard', NULL, FALSE, 'D'),
(100, '6', 9, 'hard', NULL, FALSE, 'D'),
(100, '7', 9, 'hard', NULL, FALSE, 'D'),
(100, '8', 9, 'hard', NULL, FALSE, 'D'),
(100, '9', 9, 'hard', NULL, FALSE, 'D'),
(100,'10', 9, 'hard', NULL, FALSE, 'H'),
(100, 'A', 9, 'hard', NULL, FALSE, 'H');

-- Hard 10
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',10, 'hard', NULL, FALSE, 'D'),
(100, '3',10, 'hard', NULL, FALSE, 'D'),
(100, '4',10, 'hard', NULL, FALSE, 'D'),
(100, '5',10, 'hard', NULL, FALSE, 'D'),
(100, '6',10, 'hard', NULL, FALSE, 'D'),
(100, '7',10, 'hard', NULL, FALSE, 'D'),
(100, '8',10, 'hard', NULL, FALSE, 'D'),
(100, '9',10, 'hard', NULL, FALSE, 'D'),
(100,'10',10, 'hard', NULL, FALSE, 'D'),
(100, 'A',10, 'hard', NULL, FALSE, 'H');

-- Hard 11
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',11, 'hard', NULL, FALSE, 'D'),
(100, '3',11, 'hard', NULL, FALSE, 'D'),
(100, '4',11, 'hard', NULL, FALSE, 'D'),
(100, '5',11, 'hard', NULL, FALSE, 'D'),
(100, '6',11, 'hard', NULL, FALSE, 'D'),
(100, '7',11, 'hard', NULL, FALSE, 'D'),
(100, '8',11, 'hard', NULL, FALSE, 'D'),
(100, '9',11, 'hard', NULL, FALSE, 'D'),
(100,'10',11, 'hard', NULL, FALSE, 'D'),
(100, 'A',11, 'hard', NULL, FALSE, 'H');

-- Hard 12
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',12, 'hard', NULL, FALSE, 'H'),
(100, '3',12, 'hard', NULL, FALSE, 'H'),
(100, '4',12, 'hard', NULL, FALSE, 'H'),
(100, '5',12, 'hard', NULL, FALSE, 'S'),
(100, '6',12, 'hard', NULL, FALSE, 'S'),
(100, '7',12, 'hard', NULL, FALSE, 'S'),
(100, '8',12, 'hard', NULL, FALSE, 'H'),
(100, '9',12, 'hard', NULL, FALSE, 'H'),
(100,'10',12, 'hard', NULL, FALSE, 'H'),
(100, 'A',12, 'hard', NULL, FALSE, 'H');

-- Hard 13
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',13, 'hard', NULL, FALSE, 'H'),
(100, '3',13, 'hard', NULL, FALSE, 'H'),
(100, '4',13, 'hard', NULL, FALSE, 'S'),
(100, '5',13, 'hard', NULL, FALSE, 'S'),
(100, '6',13, 'hard', NULL, FALSE, 'S'),
(100, '7',13, 'hard', NULL, FALSE, 'S'),
(100, '8',13, 'hard', NULL, FALSE, 'S'),
(100, '9',13, 'hard', NULL, FALSE, 'H'),
(100,'10',13, 'hard', NULL, FALSE, 'H'),
(100, 'A',13, 'hard', NULL, FALSE, 'H');

-- Hard 15
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',15, 'hard', NULL, FALSE, 'S'),
(100, '3',15, 'hard', NULL, FALSE, 'S'),
(100, '4',15, 'hard', NULL, FALSE, 'S'),
(100, '5',15, 'hard', NULL, FALSE, 'S'),
(100, '6',15, 'hard', NULL, FALSE, 'S'),
(100, '7',15, 'hard', NULL, FALSE, 'H'),
(100, '8',15, 'hard', NULL, FALSE, 'S'),
(100, '9',15, 'hard', NULL, FALSE, 'S'),
(100,'10',15, 'hard', NULL, FALSE, 'H'),
(100, 'A',15, 'hard', NULL, FALSE, 'RH/H');

-- Hard 16
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',16, 'hard', NULL, FALSE, 'S'),
(100, '3',16, 'hard', NULL, FALSE, 'S'),
(100, '4',16, 'hard', NULL, FALSE, 'S'),
(100, '5',16, 'hard', NULL, FALSE, 'S'),
(100, '6',16, 'hard', NULL, FALSE, 'S'),
(100, '7',16, 'hard', NULL, FALSE, 'S'),
(100, '8',16, 'hard', NULL, FALSE, 'S'),
(100, '9',16, 'hard', NULL, FALSE, 'S'),
(100,'10',16, 'hard', NULL, FALSE, 'H'),
(100, 'A',16, 'hard', NULL, FALSE, 'RH');

-- Hard 17
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',17, 'hard', NULL, FALSE, 'S'),
(100, '3',17, 'hard', NULL, FALSE, 'S'),
(100, '4',17, 'hard', NULL, FALSE, 'S'),
(100, '5',17, 'hard', NULL, FALSE, 'S'),
(100, '6',17, 'hard', NULL, FALSE, 'S'),
(100, '7',17, 'hard', NULL, FALSE, 'S'),
(100, '8',17, 'hard', NULL, FALSE, 'S'),
(100, '9',17, 'hard', NULL, FALSE, 'S'),
(100,'10',17, 'hard', NULL, FALSE, 'S'),
(100, 'A',17, 'hard', NULL, FALSE, 'RS');

-- Hard 18
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',18, 'hard', NULL, FALSE, 'S'),
(100, '3',18, 'hard', NULL, FALSE, 'S'),
(100, '4',18, 'hard', NULL, FALSE, 'S'),
(100, '5',18, 'hard', NULL, FALSE, 'S'),
(100, '6',18, 'hard', NULL, FALSE, 'S'),
(100, '7',18, 'hard', NULL, FALSE, 'S'),
(100, '8',18, 'hard', NULL, FALSE, 'S'),
(100, '9',18, 'hard', NULL, FALSE, 'S'),
(100,'10',18, 'hard', NULL, FALSE, 'S'),
(100, 'A',18, 'hard', NULL, FALSE, 'S');

-- ————————————————————————————————————————————————

-- S O F T   T O T A L S  (13–19)
-- Soft 13 (A2 is 13)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',13, 'soft', NULL, FALSE, 'H'),
(100, '3',13, 'soft', NULL, FALSE, 'H'),
(100, '4',13, 'soft', NULL, FALSE, 'H'),
(100, '5',13, 'soft', NULL, FALSE, 'H'),
(100, '6',13, 'soft', NULL, FALSE, 'D'),
(100, '7',13, 'soft', NULL, FALSE, 'D'),
(100, '8',13, 'soft', NULL, FALSE, 'H'),
(100, '9',13, 'soft', NULL, FALSE, 'H'),
(100,'10',13, 'soft', NULL, FALSE, 'H'),
(100, 'A',13, 'soft', NULL, FALSE, 'H');

-- Soft 14 (A3)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',14, 'soft', NULL, FALSE, 'H'),
(100, '3',14, 'soft', NULL, FALSE, 'H'),
(100, '4',14, 'soft', NULL, FALSE, 'H'),
(100, '5',14, 'soft', NULL, FALSE, 'H'),
(100, '6',14, 'soft', NULL, FALSE, 'D'),
(100, '7',14, 'soft', NULL, FALSE, 'D'),
(100, '8',14, 'soft', NULL, FALSE, 'D'),
(100, '9',14, 'soft', NULL, FALSE, 'H'),
(100,'10',14, 'soft', NULL, FALSE, 'H'),
(100, 'A',14, 'soft', NULL, FALSE, 'H');

-- Soft 15 (A4)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',15, 'soft', NULL, FALSE, 'H'),
(100, '3',15, 'soft', NULL, FALSE, 'H'),
(100, '4',15, 'soft', NULL, FALSE, 'H'),
(100, '5',15, 'soft', NULL, FALSE, 'H'),
(100, '6',15, 'soft', NULL, FALSE, 'D'),
(100, '7',15, 'soft', NULL, FALSE, 'D'),
(100, '8',15, 'soft', NULL, FALSE, 'D'),
(100, '9',15, 'soft', NULL, FALSE, 'H'),
(100,'10',15, 'soft', NULL, FALSE, 'H'),
(100, 'A',15, 'soft', NULL, FALSE, 'H');

-- Soft 16 (A5)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',16, 'soft', NULL, FALSE, 'H'),
(100, '3',16, 'soft', NULL, FALSE, 'H'),
(100, '4',16, 'soft', NULL, FALSE, 'H'),
(100, '5',16, 'soft', NULL, FALSE, 'D'),
(100, '6',16, 'soft', NULL, FALSE, 'D'),
(100, '7',16, 'soft', NULL, FALSE, 'D'),
(100, '8',16, 'soft', NULL, FALSE, 'D'),
(100, '9',16, 'soft', NULL, FALSE, 'H'),
(100,'10',16, 'soft', NULL, FALSE, 'H'),
(100, 'A',16, 'soft', NULL, FALSE, 'H');

-- Soft 17 (A6)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',17, 'soft', NULL, FALSE, 'H'),
(100, '3',17, 'soft', NULL, FALSE, 'H'),
(100, '4',17, 'soft', NULL, FALSE, 'H'),
(100, '5',17, 'soft', NULL, FALSE, 'D'),
(100, '6',17, 'soft', NULL, FALSE, 'D'),
(100, '7',17, 'soft', NULL, FALSE, 'D'),
(100, '8',17, 'soft', NULL, FALSE, 'D'),
(100, '9',17, 'soft', NULL, FALSE, 'D'),
(100,'10',17, 'soft', NULL, FALSE, 'H'),
(100, 'A',17, 'soft', NULL, FALSE, 'H');

-- Soft 18 (A7)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',18, 'soft', NULL, FALSE, 'S'),
(100, '3',18, 'soft', NULL, FALSE, 'S'),
(100, '4',18, 'soft', NULL, FALSE, 'DS'),
(100, '5',18, 'soft', NULL, FALSE, 'DS'),
(100, '6',18, 'soft', NULL, FALSE, 'DS'),
(100, '7',18, 'soft', NULL, FALSE, 'DS'),
(100, '8',18, 'soft', NULL, FALSE, 'DS'),
(100, '9',18, 'soft', NULL, FALSE, 'S'),
(100,'10',18, 'soft', NULL, FALSE, 'S'),
(100, 'A',18, 'soft', NULL, FALSE, 'H');

-- Soft 19 (A8)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2',19, 'soft', NULL, FALSE, 'S'),
(100, '3',19, 'soft', NULL, FALSE, 'S'),
(100, '4',19, 'soft', NULL, FALSE, 'S'),
(100, '5',19, 'soft', NULL, FALSE, 'S'),
(100, '6',19, 'soft', NULL, FALSE, 'DS'),
(100, '7',19, 'soft', NULL, FALSE, 'S'),
(100, '8',19, 'soft', NULL, FALSE, 'S'),
(100, '9',19, 'soft', NULL, FALSE, 'S'),
(100,'10',19, 'soft', NULL, FALSE, 'S'),
(100, 'A',19, 'soft', NULL, FALSE, 'S');

-- ————————————————————————————————————————————————

-- ==== Pair Splits for 4-10 Chart (chart_id = 100) ====

-- ==== Pair Splits for 4-10 Chart (chart_id = 100) with player_hand_type='hard' ====

-- Pair 2s (22)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2', 22, 'hard', NULL, TRUE, 'H'),
(100, '3', 22, 'hard', NULL, TRUE, 'H'),
(100, '4', 22, 'hard', NULL, TRUE, 'H'),
(100, '5', 22, 'hard', NULL, TRUE, 'P'),
(100, '6', 22, 'hard', NULL, TRUE, 'P'),
(100, '7', 22, 'hard', NULL, TRUE, 'P'),
(100, '8', 22, 'hard', NULL, TRUE, 'P'),
(100, '9', 22, 'hard', NULL, TRUE, 'P'),
(100,'10', 22, 'hard', NULL, TRUE, 'H'),
(100, 'A', 22, 'hard', NULL, TRUE, 'H');

-- Pair 3s (33)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2', 33, 'hard', NULL, TRUE, 'H'),
(100, '3', 33, 'hard', NULL, TRUE, 'H'),
(100, '4', 33, 'hard', NULL, TRUE, 'H'),
(100, '5', 33, 'hard', NULL, TRUE, 'P'),
(100, '6', 33, 'hard', NULL, TRUE, 'P'),
(100, '7', 33, 'hard', NULL, TRUE, 'P'),
(100, '8', 33, 'hard', NULL, TRUE, 'P'),
(100, '9', 33, 'hard', NULL, TRUE, 'P'),
(100,'10', 33, 'hard', NULL, TRUE, 'H'),
(100, 'A', 33, 'hard', NULL, TRUE, 'H');

-- Pair 4s (44)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2', 44, 'hard', NULL, TRUE, 'H'),
(100, '3', 44, 'hard', NULL, TRUE, 'H'),
(100, '4', 44, 'hard', NULL, TRUE, 'H'),
(100, '5', 44, 'hard', NULL, TRUE, 'H'),
(100, '6', 44, 'hard', NULL, TRUE, 'P'),
(100, '7', 44, 'hard', NULL, TRUE, 'P'),
(100, '8', 44, 'hard', NULL, TRUE, 'H'),
(100, '9', 44, 'hard', NULL, TRUE, 'H'),
(100,'10', 44, 'hard', NULL, TRUE, 'H'),
(100, 'A', 44, 'hard', NULL, TRUE, 'H');

-- Pair 5s (55)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2', 55, 'hard', NULL, TRUE, 'D'),
(100, '3', 55, 'hard', NULL, TRUE, 'D'),
(100, '4', 55, 'hard', NULL, TRUE, 'D'),
(100, '5', 55, 'hard', NULL, TRUE, 'D'),
(100, '6', 55, 'hard', NULL, TRUE, 'D'),
(100, '7', 55, 'hard', NULL, TRUE, 'D'),
(100, '8', 55, 'hard', NULL, TRUE, 'D'),
(100, '9', 55, 'hard', NULL, TRUE, 'D'),
(100,'10', 55, 'hard', NULL, TRUE, 'D'),
(100, 'A', 55, 'hard', NULL, TRUE, 'H');

-- Pair 6s (66)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2', 66, 'hard', NULL, TRUE, 'H'),
(100, '3', 66, 'hard', NULL, TRUE, 'H'),
(100, '4', 66, 'hard', NULL, TRUE, 'H'),
(100, '5', 66, 'hard', NULL, TRUE, 'P'),
(100, '6', 66, 'hard', NULL, TRUE, 'P'),
(100, '7', 66, 'hard', NULL, TRUE, 'P'),
(100, '8', 66, 'hard', NULL, TRUE, 'P'),
(100, '9', 66, 'hard', NULL, TRUE, 'P'),
(100,'10', 66, 'hard', NULL, TRUE, 'H'),
(100, 'A', 66, 'hard', NULL, TRUE, 'H');

-- Pair 7s (77)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2', 77, 'hard', NULL, TRUE, 'P'),
(100, '3', 77, 'hard', NULL, TRUE, 'P'),
(100, '4', 77, 'hard', NULL, TRUE, 'P'),
(100, '5', 77, 'hard', NULL, TRUE, 'P'),
(100, '6', 77, 'hard', NULL, TRUE, 'P'),
(100, '7', 77, 'hard', NULL, TRUE, 'P'),
(100, '8', 77, 'hard', NULL, TRUE, 'P'),
(100, '9', 77, 'hard', NULL, TRUE, 'P'),
(100,'10', 77, 'hard', NULL, TRUE, 'P'),
(100, 'A', 77, 'hard', NULL, TRUE, 'H');

-- Pair 8s (88)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2', 88, 'hard', NULL, TRUE, 'P'),
(100, '3', 88, 'hard', NULL, TRUE, 'P'),
(100, '4', 88, 'hard', NULL, TRUE, 'P'),
(100, '5', 88, 'hard', NULL, TRUE, 'P'),
(100, '6', 88, 'hard', NULL, TRUE, 'P'),
(100, '7', 88, 'hard', NULL, TRUE, 'P'),
(100, '8', 88, 'hard', NULL, TRUE, 'P'),
(100, '9', 88, 'hard', NULL, TRUE, 'P'),
(100,'10', 88, 'hard', NULL, TRUE, 'P'),
(100, 'A', 88, 'hard', NULL, TRUE, 'RH/PRH');

-- Pair 9s (99)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2', 99, 'hard', NULL, TRUE, 'S'),
(100, '3', 99, 'hard', NULL, TRUE, 'P'),
(100, '4', 99, 'hard', NULL, TRUE, 'P'),
(100, '5', 99, 'hard', NULL, TRUE, 'P'),
(100, '6', 99, 'hard', NULL, TRUE, 'P'),
(100, '7', 99, 'hard', NULL, TRUE, 'P'),
(100, '8', 99, 'hard', NULL, TRUE, 'P'),
(100, '9', 99, 'hard', NULL, TRUE, 'P'),
(100,'10', 99, 'hard', NULL, TRUE, 'P'),
(100, 'A', 99, 'hard', NULL, TRUE, 'P');

-- Pair Tens (TT) (player_val=20)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2', 20, 'hard', NULL, TRUE, 'S'),
(100, '3', 20, 'hard', NULL, TRUE, 'S'),
(100, '4', 20, 'hard', NULL, TRUE, 'S'),
(100, '5', 20, 'hard', NULL, TRUE, 'S'),
(100, '6', 20, 'hard', NULL, TRUE, 'S'),
(100, '7', 20, 'hard', NULL, TRUE, 'S'),
(100, '8', 20, 'hard', NULL, TRUE, 'S'),
(100, '9', 20, 'hard', NULL, TRUE, 'S'),
(100,'10', 20, 'hard', NULL, TRUE, 'S'),
(100, 'A', 20, 'hard', NULL, TRUE, 'S');

-- Pair Aces (AA) (player_val=22)
INSERT INTO chart_entries (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move) VALUES
(100, '2', 22, 'hard', NULL, TRUE, 'P'),
(100, '3', 22, 'hard', NULL, TRUE, 'P'),
(100, '4', 22, 'hard', NULL, TRUE, 'P'),
(100, '5', 22, 'hard', NULL, TRUE, 'P'),
(100, '6', 22, 'hard', NULL, TRUE, 'P'),
(100, '7', 22, 'hard', NULL, TRUE, 'P'),
(100, '8', 22, 'hard', NULL, TRUE, 'P'),
(100, '9', 22, 'hard', NULL, TRUE, 'P'),
(100,'10', 22, 'hard', NULL, TRUE, 'P'),
(100, 'A', 22, 'hard', NULL, TRUE, 'P');
