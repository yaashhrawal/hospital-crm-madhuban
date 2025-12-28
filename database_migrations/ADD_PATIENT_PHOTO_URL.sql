-- Migration to add photo_url column to patients table
-- This migration adds support for patient profile photos

-- Add photo_url column to patients table
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Add comment to document the column
COMMENT ON COLUMN patients.photo_url IS 'URL or base64-encoded data URI for patient profile photo';

-- Create index for faster queries when filtering by photos
CREATE INDEX IF NOT EXISTS idx_patients_photo_url ON patients(photo_url) WHERE photo_url IS NOT NULL;

-- Verify the column was added successfully
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'patients'
    AND column_name = 'photo_url'
  ) THEN
    RAISE NOTICE 'Column photo_url successfully added to patients table';
  ELSE
    RAISE EXCEPTION 'Failed to add photo_url column to patients table';
  END IF;
END $$;
