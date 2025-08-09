
BEGIN;

INSERT INTO users (user_id, email, password, created_at)
VALUES
  ('test_user1',
   'test_user1@example.com',
   'hashed_pw_12345',       
   NOW()
  );

-- 2) Give them default settings
INSERT INTO user_settings (
  user_id,
  hole_card,
  surrender_allowed,
  soft17_hit,
  decks_count,
  double_first_two
)
VALUES
  ('test_user1',
   'perfect',    -- hole_card mode
   TRUE,         -- surrender_allowed
   FALSE,        -- soft17_hit
   6,            -- decks_count
   'any'         -- double_first_two
  );

-- 3) Seed some random stats
INSERT INTO user_stats (
  user_id,
  total_4to10_hands, errors_4to10_hands,
  total_2to3_hands,  errors_2to3_hands,
  total_perfect_hands, errors_perfect_hands
)
VALUES
  ('test_user1',
   10, 2,
   8,  1,
   15, 3
  );

COMMIT;
