-- FIX DUPLICATE PATIENT_ID ERROR
-- Remove the unique constraint on patient_id since we're generating IDs client-side

-- Drop the unique constraint
ALTER TABLE patients DROP CONSTRAINT IF EXISTS patients_patient_id_key;

-- Also drop unique constraint on patient_id if it exists as an index
DROP INDEX IF EXISTS patients_patient_id_key;

-- Verify it's removed
SELECT conname 
FROM pg_constraint 
WHERE conrelid = 'patients'::regclass 
AND conname LIKE '%patient_id%';
