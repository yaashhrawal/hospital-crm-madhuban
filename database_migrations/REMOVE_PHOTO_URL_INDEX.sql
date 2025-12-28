-- Remove the index on photo_url column to fix "index row too large" error
-- Base64 images can be very large and exceed PostgreSQL's 8KB index limit

-- Drop the index if it exists
DROP INDEX IF EXISTS idx_patients_photo_url;

-- Verify the index was dropped
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_indexes
    WHERE tablename = 'patients'
    AND indexname = 'idx_patients_photo_url'
  ) THEN
    RAISE NOTICE 'Index idx_patients_photo_url successfully removed';
  ELSE
    RAISE NOTICE 'Index idx_patients_photo_url still exists - manual removal required';
  END IF;
END $$;
