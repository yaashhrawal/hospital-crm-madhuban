-- Refresh PostgREST schema cache
NOTIFY pgrst, 'reload config';

-- Re-establish the foreign key to ensure it's picked up
-- First drop it if it exists by a specific name (guessing the default name or just generically)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'patient_admissions_patient_id_fkey') THEN
        ALTER TABLE patient_admissions DROP CONSTRAINT patient_admissions_patient_id_fkey;
    END IF;
END $$;

-- Add it back explicitly
ALTER TABLE patient_admissions
ADD CONSTRAINT patient_admissions_patient_id_fkey
FOREIGN KEY (patient_id)
REFERENCES patients(id);

-- Add a comment to force schema update detection
COMMENT ON CONSTRAINT patient_admissions_patient_id_fkey ON patient_admissions IS 'Links admissions to patients';

-- Verify column types match (common issue)
-- patients.id is UUID, patient_admissions.patient_id should be UUID
