CREATE TABLE IF NOT EXISTS perfect_entries (
  entry_id             SERIAL PRIMARY KEY,
  chart_id             INT NOT NULL REFERENCES charts(chart_id) ON DELETE CASCADE,
  dealer_val           TEXT NOT NULL,
  hit_until_hard       TEXT NOT NULL,
  hit_until_soft       TEXT NOT NULL,
  double_hards         TEXT,
  double_softs         TEXT,
  splits               TEXT,
  late_surrender_hards TEXT,
  late_surrender_softs TEXT,
  UNIQUE (chart_id, dealer_val),
  FOREIGN KEY (chart_id) REFERENCES charts (chart_id)
);
