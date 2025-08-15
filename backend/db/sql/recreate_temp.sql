BEGIN;

-- 1) Find (chart_id, dealer_val) groups that have duplicate 22-pair rows
WITH groups AS (
  SELECT chart_id, dealer_val
  FROM chart_entries
  WHERE player_pair = TRUE AND player_val = 22
  GROUP BY chart_id, dealer_val
  HAVING COUNT(*) >= 2
),
ranked AS (
  SELECT
    ce.entry_id,
    ROW_NUMBER() OVER (PARTITION BY ce.chart_id, ce.dealer_val ORDER BY ce.entry_id DESC) AS rn
  FROM chart_entries ce
  JOIN groups g
    ON g.chart_id = ce.chart_id AND g.dealer_val = ce.dealer_val
  WHERE ce.player_pair = TRUE AND ce.player_val = 22
)
-- 2) Convert the "second copy" to AA encoding: 12 + soft
UPDATE chart_entries e
SET player_val = 12,
    player_hand_type = 'soft'
FROM ranked r
WHERE e.entry_id = r.entry_id
  AND r.rn = 1;   -- choose the newest row to become AA

-- 3) Make sure remaining 22-pair rows (2-2) are marked as hard
UPDATE chart_entries
SET player_hand_type = 'hard'
WHERE player_pair = TRUE
  AND player_val = 22
  AND player_hand_type IS DISTINCT FROM 'hard';

COMMIT;
