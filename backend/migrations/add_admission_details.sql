-- Add new columns for enhanced patient admission details

-- Admission Type
ALTER TABLE patient_admissions 
ADD COLUMN IF NOT EXISTS admission_type VARCHAR(50);

-- Attendant Information
ALTER TABLE patient_admissions 
ADD COLUMN IF NOT EXISTS attendant_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS attendant_relation VARCHAR(100),
ADD COLUMN IF NOT EXISTS attendant_phone VARCHAR(50);

-- Insurance Details
ALTER TABLE patient_admissions 
ADD COLUMN IF NOT EXISTS insurance_provider VARCHAR(255),
ADD COLUMN IF NOT EXISTS policy_number VARCHAR(100);

-- Add comments for documentation
COMMENT ON COLUMN patient_admissions.admission_type IS 'Type of admission: Emergency, Planned, Daycare, Transfer, etc.';
COMMENT ON COLUMN patient_admissions.attendant_name IS 'Name of the primary attendant/guardian';
COMMENT ON COLUMN patient_admissions.insurance_provider IS 'Name of the insurance provider or TPA';
