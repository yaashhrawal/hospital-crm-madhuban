-- CONSOLIDATED IPD BILLING FIX MIGRATION
-- Run this script in your Supabase SQL Editor to apply all necessary schema changes.

BEGIN;

-- 1. Add missing columns to 'patients' table
ALTER TABLE patients 
ADD COLUMN IF NOT EXISTS ipd_bed_number VARCHAR(50),
ADD COLUMN IF NOT EXISTS ipd_number VARCHAR(50),
ADD COLUMN IF NOT EXISTS admission_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS room_type VARCHAR(50);

COMMENT ON COLUMN patients.ipd_bed_number IS 'Current bed number IF admitted';
COMMENT ON COLUMN patients.ipd_number IS 'Current IPD number IF admitted';

-- 2. Add missing columns to 'patient_admissions' table
ALTER TABLE patient_admissions 
ADD COLUMN IF NOT EXISTS ipd_number VARCHAR(50),
ADD COLUMN IF NOT EXISTS doctor_name VARCHAR(255);

COMMENT ON COLUMN patient_admissions.ipd_number IS 'Unique IPD Number for the admission';
COMMENT ON COLUMN patient_admissions.doctor_name IS 'Name of the doctor (denormalized/legacy)';

-- 3. Add 'status' column to 'patient_transactions' table
ALTER TABLE patient_transactions 
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'COMPLETED';

COMMENT ON COLUMN patient_transactions.status IS 'Transaction status: COMPLETED, PENDING, CANCELLED, DELETED';

-- 4. Fix Foreign Key Relationship between patients and patient_admissions
-- First ensure any existing incorrect constraint is gone
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'patient_admissions_patient_id_fkey') THEN
        ALTER TABLE patient_admissions DROP CONSTRAINT patient_admissions_patient_id_fkey;
    END IF;
END $$;

-- Re-add the constraint explicitly to ensure visibility
ALTER TABLE patient_admissions
ADD CONSTRAINT patient_admissions_patient_id_fkey
FOREIGN KEY (patient_id)
REFERENCES patients(id);

COMMIT;

-- 5. Refresh PostgREST Schema Cache (Must be outside transaction block in some environments, but usually fine here)
NOTIFY pgrst, 'reload config';
