
-- 1) Users
CREATE TABLE IF NOT EXISTS users (
  user_id    TEXT    PRIMARY KEY,
  email      TEXT    UNIQUE NOT NULL,
  password   TEXT    NOT NULL,
  created_at TIMESTAMP
);

-- 2) User Settings
CREATE TABLE IF NOT EXISTS user_settings (
  user_id          TEXT       PRIMARY KEY REFERENCES users(user_id),
  hole_card        TEXT       NOT NULL
                    CHECK (hole_card IN ('4-10','2-3','perfect', 'A-9DAS', 'A-9NoDAS')),
  surrender_allowed BOOLEAN    NOT NULL,
  soft17_hit       BOOLEAN    NOT NULL,
  decks_count      INT        NOT NULL,
  double_first_two TEXT       NOT NULL
                    CHECK (double_first_two IN ('any','10-11','9-11'))
);

-- 3) User Stats
CREATE TABLE user_stats (
  user_id                  TEXT PRIMARY KEY REFERENCES users(user_id),
  total_4to10_hands        INT  NOT NULL DEFAULT 0,
  errors_4to10_hands       INT  NOT NULL DEFAULT 0,
  total_2to3_hands         INT  NOT NULL DEFAULT 0,
  errors_2to3_hands        INT  NOT NULL DEFAULT 0,
  total_perfect_hands      INT  NOT NULL DEFAULT 0,
  errors_perfect_hands     INT  NOT NULL DEFAULT 0,
  total_a9das_hands        INT  NOT NULL DEFAULT 0,
  errors_a9das_hands       INT  NOT NULL DEFAULT 0,
  total_a9nodas_hands      INT  NOT NULL DEFAULT 0,
  errors_a9nodas_hands     INT  NOT NULL DEFAULT 0
);

-- 4) Charts
CREATE TABLE charts (
  chart_id SERIAL PRIMARY KEY,
  user_id  TEXT REFERENCES users(user_id),
  mode     TEXT NOT NULL
           CHECK (mode IN (
             '4-10','2-3','perfect',
             'A-9DAS','A-9NoDAS',
             'Spanish_perfect','Spanish_2to3','Spanish_4to9'
           )),
  UNIQUE (user_id, mode)
);

-- 5) Chart Entries
CREATE TABLE IF NOT EXISTS chart_entries (
  entry_id         SERIAL PRIMARY KEY,
  chart_id         INT    REFERENCES charts(chart_id) ON DELETE CASCADE,
  dealer_val       INT    NOT NULL,
  player_val       INT    NOT NULL,
  player_hand_type TEXT   NOT NULL
                     CHECK (player_hand_type IN ('hard','soft')),
  dealer_hand_type TEXT
                     CHECK (dealer_hand_type IN ('hard','soft')),
  player_pair      BOOLEAN NOT NULL,
  recommended_move TEXT    NOT NULL
);

-- Compact “Perfect” chart table: one row per dealer two-card state with string-encoded rules
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
  UNIQUE (chart_id, dealer_val)
);

CREATE INDEX IF NOT EXISTS idx_perfect_entries_chart ON perfect_entries (chart_id);
