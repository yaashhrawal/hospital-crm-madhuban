-- Migration to add abha_id column to patients table
-- ABHA (Ayushman Bharat Health Account) is India's unique health ID

-- Add abha_id column to patients table
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS abha_id VARCHAR(20);

-- Add comment to document the column
COMMENT ON COLUMN patients.abha_id IS 'Ayushman Bharat Health Account ID - 14 digit unique health ID';

-- Create index for faster ABHA ID lookups
CREATE INDEX IF NOT EXISTS idx_patients_abha_id ON patients(abha_id) WHERE abha_id IS NOT NULL;

-- Verify the column was added successfully
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'patients'
    AND column_name = 'abha_id'
  ) THEN
    RAISE NOTICE 'Column abha_id successfully added to patients table';
  ELSE
    RAISE EXCEPTION 'Failed to add abha_id column to patients table';
  END IF;
END $$;
