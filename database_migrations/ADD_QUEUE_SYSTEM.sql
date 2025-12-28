-- Migration to add queue system to patients table
-- Queue number resets daily and shows current position in queue

-- Add queue_no column to patients table
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS queue_no INTEGER;

-- Add queue_status column to patients table
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS queue_status VARCHAR(20) DEFAULT 'waiting';

-- Add queue_date column to track which day the queue number was assigned
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS queue_date DATE;

-- Add comments to document the columns
COMMENT ON COLUMN patients.queue_no IS 'Daily queue number - resets each day';
COMMENT ON COLUMN patients.queue_status IS 'Queue status: waiting, called, completed';
COMMENT ON COLUMN patients.queue_date IS 'Date when queue number was assigned';

-- Create index for faster queue lookups
CREATE INDEX IF NOT EXISTS idx_patients_queue_date ON patients(queue_date) WHERE queue_date IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_patients_queue_status ON patients(queue_status) WHERE queue_status IS NOT NULL;

-- Verify the columns were added successfully
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'patients'
    AND column_name = 'queue_no'
  ) THEN
    RAISE NOTICE 'Column queue_no successfully added to patients table';
  ELSE
    RAISE EXCEPTION 'Failed to add queue_no column to patients table';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'patients'
    AND column_name = 'queue_status'
  ) THEN
    RAISE NOTICE 'Column queue_status successfully added to patients table';
  ELSE
    RAISE EXCEPTION 'Failed to add queue_status column to patients table';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'patients'
    AND column_name = 'queue_date'
  ) THEN
    RAISE NOTICE 'Column queue_date successfully added to patients table';
  ELSE
    RAISE EXCEPTION 'Failed to add queue_date column to patients table';
  END IF;
END $$;
