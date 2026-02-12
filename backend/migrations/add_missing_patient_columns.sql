-- Add missing IPD columns to patients table for billing compatibility

ALTER TABLE patients 
ADD COLUMN IF NOT EXISTS ipd_bed_number VARCHAR(50),
ADD COLUMN IF NOT EXISTS ipd_number VARCHAR(50),
ADD COLUMN IF NOT EXISTS admission_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS room_type VARCHAR(50);

-- Force schema cache reload
NOTIFY pgrst, 'reload config';

-- Comments
COMMENT ON COLUMN patients.ipd_bed_number IS 'Current bed number IF admitted';
COMMENT ON COLUMN patients.ipd_number IS 'Current IPD number IF admitted';
