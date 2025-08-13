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

CREATE TABLE chart_entries (
  entry_id         SERIAL PRIMARY KEY,
  chart_id         INT    NOT NULL REFERENCES charts(chart_id) ON DELETE CASCADE,
  dealer_val       TEXT   NOT NULL,
  player_val       INT    NOT NULL,
  player_hand_type TEXT   NOT NULL CHECK (player_hand_type IN ('hard','soft')),
  dealer_hand_type TEXT            CHECK (dealer_hand_type IN ('hard','soft')),
  player_pair      BOOLEAN NOT NULL,
  recommended_move TEXT    NOT NULL
);

CREATE TABLE perfect_entries (
  entry_id             SERIAL PRIMARY KEY,
  chart_id             INT  NOT NULL REFERENCES charts(chart_id) ON DELETE CASCADE,
  dealer_val           TEXT NOT NULL,
  hit_until_hard       TEXT NOT NULL,
  hit_until_soft       TEXT NOT NULL,
  double_hards         TEXT,
  double_softs         TEXT,
  splits               TEXT,
  late_surrender_hards TEXT,
  late_surrender_softs TEXT,
  forfeits             TEXT,
  UNIQUE (chart_id, dealer_val)
);