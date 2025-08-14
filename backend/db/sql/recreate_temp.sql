DROP TABLE IF EXISTS user_stats;

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
