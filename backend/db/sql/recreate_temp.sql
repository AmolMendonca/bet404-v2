-- find & drop existing CHECK(s) on charts
DO $$
DECLARE c record;
BEGIN
  FOR c IN
    SELECT conname
    FROM pg_constraint
    WHERE conrelid = 'public.charts'::regclass
      AND contype = 'c'
  LOOP
    EXECUTE format('ALTER TABLE public.charts DROP CONSTRAINT %I', c.conname);
  END LOOP;
END$$;

-- add new flexible check
ALTER TABLE charts
  ADD CONSTRAINT charts_mode_check
  CHECK (mode IN (
    '4-10','2-3','perfect',
    'A-9DAS','A-9NoDAS',
    'Spanish_perfect','Spanish_2to3','Spanish_4to9'
  ));
