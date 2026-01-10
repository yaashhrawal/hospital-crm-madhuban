-- Migration: Add has_pending_appointment column to patients table
-- Date: 2026-01-11
-- Description: Adds flag to hide patients with pending appointments from patient list

-- Add has_pending_appointment column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'patients' 
        AND column_name = 'has_pending_appointment'
    ) THEN
        ALTER TABLE patients ADD COLUMN has_pending_appointment BOOLEAN DEFAULT false;
        RAISE NOTICE 'Column has_pending_appointment added to patients table';
    ELSE
        RAISE NOTICE 'Column has_pending_appointment already exists in patients table';
    END IF;
END $$;

-- Set default value for existing patients (they should all be visible)
UPDATE patients SET has_pending_appointment = false WHERE has_pending_appointment IS NULL;

-- Verify the column was added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'patients' AND column_name = 'has_pending_appointment';
