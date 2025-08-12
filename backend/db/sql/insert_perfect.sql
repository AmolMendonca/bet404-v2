-- Create the perfect chart record
INSERT INTO charts (chart_id, user_id, mode)
VALUES (102, 'test_user1', 'perfect');

-- Seed perfect_entries (chart_id = 102)
-- Columns: chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs

-- 20
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '20', '17', '20', NULL, NULL, NULL, 'All but 10,11,20,A2,A3', NULL);

-- 19
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '19', '17', '19', NULL, NULL, '9', '13-17,T8', NULL);

-- 18
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '18', '17', '18', NULL, NULL, '89', 'Hard 17', NULL);

-- 17
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '17', '18', '18', NULL, NULL, 'A23678', NULL, NULL);

-- 16
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '16', '12', '18', '4-11', 'A2-AT', 'A2346789T', NULL, NULL);

-- 15
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '15', '12', '18', '4-11', 'A2-AT', 'A2346789T', NULL, NULL);

-- 14
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '14', '12', '18', '5-11', 'A2-A9', 'A2346789T', NULL, NULL);

-- 13
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '13', '12', '18', '7-11', 'A2-A9', 'A2346789T', NULL, NULL);

-- 12
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '12', '12', '18', '8-11', 'A2-A8', 'A2346789', NULL, NULL);

-- 11
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '11', '15', '18', NULL, NULL, 'A', 'Hard 13-16', NULL);

-- 10
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '10', '17', '19', '11-11', NULL, 'A', 'Hard 14-16', NULL);

-- 9
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '9', '17', '19', '10-11', NULL, 'A89', 'T6, 97', NULL);

-- 8
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '8', '17', '18', '10-11', NULL, 'A389', NULL, NULL);

-- 7
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '7', '18', '18', '10-11', NULL, 'A2378', NULL, NULL);

-- 6
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '6', '12', '18', '9-11', 'A2-A7/A2-A8', 'A2346789', NULL, NULL);

-- 5
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '5', '12', '18', '9-11', 'A2-A7/A2-A8', 'A2346789', NULL, NULL);

-- 4
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, '4', '12', '18', '9-11', 'A4-A7', 'A236789', NULL, NULL);

-- A6
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, 'A6', '17', '18', '10-11/None', NULL, 'A78/A23678', NULL, NULL);

-- A5
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, 'A5', '12/13', '19/18', '10-11', 'A7', 'A236789', NULL, NULL);

-- A4
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, 'A4', '13/14', '18', '10-11', NULL, 'A6789/A789', NULL, NULL);

-- A3
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, 'A3', '13/14', '19/18', '10-11', NULL, 'A89/A78', NULL, NULL);

-- A2
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, 'A2', '14/15', '19/18', '10-11', NULL, 'A8', NULL, NULL);

-- AA
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(102, 'AA', '15/16', '19/18', '10-11/11', NULL, 'A8', 'None/Hard 16', NULL);
