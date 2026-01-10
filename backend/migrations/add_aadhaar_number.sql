-- Migration: Add Aadhaar Number column to patients table
-- Date: 2026-01-11
-- Description: Adds aadhaar_number column for patient Aadhaar identification

-- Add aadhaar_number column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'patients' 
        AND column_name = 'aadhaar_number'
    ) THEN
        ALTER TABLE patients ADD COLUMN aadhaar_number VARCHAR(12);
        RAISE NOTICE 'Column aadhaar_number added to patients table';
    ELSE
        RAISE NOTICE 'Column aadhaar_number already exists in patients table';
    END IF;
END $$;

-- Add index for faster lookups (optional, for search functionality)
CREATE INDEX IF NOT EXISTS idx_patients_aadhaar_number ON patients(aadhaar_number);

-- Verify the column was added
SELECT column_name, data_type, character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'patients' AND column_name = 'aadhaar_number';
