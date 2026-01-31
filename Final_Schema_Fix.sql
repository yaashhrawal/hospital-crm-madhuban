-- 🛠️ FINAL FIX FOR ALL MISSING COLUMNS
-- This script ensures the 'patients' table has EVERY column the app needs.
-- Run this in Supabase Dashboard -> SQL Editor

ALTER TABLE patients 
ADD COLUMN IF NOT EXISTS hospital_id UUID,  -- Fixes 'hospital_id' error
ADD COLUMN IF NOT EXISTS patient_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS prefix VARCHAR(20),
ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS last_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS gender VARCHAR(20),
ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS email VARCHAR(100),
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS emergency_contact_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS medical_history TEXT,
ADD COLUMN IF NOT EXISTS allergies TEXT,
ADD COLUMN IF NOT EXISTS current_medications TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS date_of_entry TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS age VARCHAR(10), -- Keeping as string to match input
ADD COLUMN IF NOT EXISTS photo_url TEXT,
ADD COLUMN IF NOT EXISTS patient_tag VARCHAR(50),
ADD COLUMN IF NOT EXISTS abha_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS aadhaar_number VARCHAR(20),
ADD COLUMN IF NOT EXISTS assigned_doctor VARCHAR(100),
ADD COLUMN IF NOT EXISTS assigned_department VARCHAR(100),
ADD COLUMN IF NOT EXISTS has_reference BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS reference_details TEXT,
ADD COLUMN IF NOT EXISTS created_by UUID,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS queue_no INTEGER,
ADD COLUMN IF NOT EXISTS queue_status VARCHAR(50) DEFAULT 'waiting',
ADD COLUMN IF NOT EXISTS queue_date DATE,
ADD COLUMN IF NOT EXISTS has_pending_appointment BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS blood_group VARCHAR(10);

-- Enable Realtime for this table (optional but good for dashboard)
ALTER PUBLICATION supabase_realtime ADD TABLE patients;

-- Force Schema Cache Refresh
NOTIFY pgrst, 'reload config';
