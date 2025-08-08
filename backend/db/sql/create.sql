
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
                    CHECK (hole_card IN ('4-10','2-3','perfect')),
  surrender_allowed BOOLEAN    NOT NULL,
  soft17_hit       BOOLEAN    NOT NULL,
  decks_count      INT        NOT NULL,
  double_first_two TEXT       NOT NULL
                    CHECK (double_first_two IN ('any','10-11','9-11'))
);

-- 3) User Stats
CREATE TABLE IF NOT EXISTS user_stats (
  user_id             TEXT PRIMARY KEY REFERENCES users(user_id),
  total_4to10_hands   INT  NOT NULL DEFAULT 0,
  errors_4to10_hands  INT  NOT NULL DEFAULT 0,
  total_2to3_hands    INT  NOT NULL DEFAULT 0,
  errors_2to3_hands   INT  NOT NULL DEFAULT 0,
  total_perfect_hands INT  NOT NULL DEFAULT 0,
  errors_perfect_hands INT NOT NULL DEFAULT 0
);

-- 4) Charts
CREATE TABLE IF NOT EXISTS charts (
  chart_id SERIAL PRIMARY KEY,
  user_id  TEXT   REFERENCES users(user_id),
  mode     TEXT   NOT NULL
             CHECK (mode IN ('4-10','2-3','perfect')),
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
