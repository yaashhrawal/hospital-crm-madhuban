-- Add missing columns for IPD Billing compatibility

ALTER TABLE patient_admissions 
ADD COLUMN IF NOT EXISTS ipd_number VARCHAR(50),
ADD COLUMN IF NOT EXISTS doctor_name VARCHAR(255);

-- Force schema cache reload just in case
NOTIFY pgrst, 'reload config';

-- Comment helpful info
COMMENT ON COLUMN patient_admissions.ipd_number IS 'Unique IPD Number for the admission';
COMMENT ON COLUMN patient_admissions.doctor_name IS 'Name of the doctor (denormalized/legacy)';
