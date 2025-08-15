-- Create the Spanish-21 perfect chart record
INSERT INTO charts (chart_id, user_id, mode)
VALUES (97, 'test_user1', 'Spanish_perfect');

-- Seed perfect_entries (chart_id = 97)
-- Columns:
--   chart_id, dealer_val, hit_until_hard, hit_until_soft,
--   double_hards, double_softs, splits,
--   late_surrender_hards, late_surrender_softs

-- 20
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'20','20','20',NULL,NULL,'A','77,88,12-16',NULL);

-- 19
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'19','19','19',NULL,NULL,'A9','88,16-17',NULL);

-- 18
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'18','18','19','10-11',NULL,'A89',NULL,NULL);

-- 17
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'17','17','18','10-11',NULL,'A78',NULL,NULL);

-- 16
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'16','12','18','7-11','A2-A9','A2346789T',NULL,NULL);

-- 15
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'15','12','18','7-11','A2-A9','A2346789T',NULL,NULL);

-- 14
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'14','12','18','8-11','A2-A8','A2346789',NULL,NULL);

-- 13
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'13','12','18','9-11','A2-A8','A2346789',NULL,NULL);

-- 12
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'12','13','18','9-11','A3-A7','A2346789',NULL,NULL);

-- 11
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'11','17','19',NULL,NULL,'A','88,15-16',NULL);

-- 10
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'10','17','19',NULL,NULL,'A','88,16',NULL);

-- 9
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'9','17','19','11',NULL,'A89',NULL,NULL);

-- 8
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'8','17','18','10-11',NULL,'A89',NULL,NULL);

-- 7
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'7','17','18','10-11',NULL,'A378',NULL,NULL);

-- 6
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'6','13','18','9-11','A4-A7','A2346789',NULL,NULL);

-- 5
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'5','14','18','10-11','A5-A7','A236789',NULL,NULL);

-- 4
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'4','14','18','10-11','A6-A7','A23789/A236789',NULL,NULL);

-- A6
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'A6','17','18','10-11/11',NULL,'A78/A8',NULL,NULL);

-- A5
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'A5','15/14','18/19','10-11',NULL,'A78',NULL,NULL);

-- A4
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'A4','16/15','18/19','10-11',NULL,'A8',NULL,NULL);

-- A3
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'A3','17/16','18/19','11-11',NULL,'A8','none/77',NULL);

-- A2
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'A2','17','19','11-11',NULL,'A8','77/77,16',NULL);

-- AA
INSERT INTO perfect_entries
(chart_id, dealer_val, hit_until_hard, hit_until_soft, double_hards, double_softs, splits, late_surrender_hards, late_surrender_softs)
VALUES
(97,'AA','17','19','11',NULL,'A8/A','77/77,88,16',NULL);
