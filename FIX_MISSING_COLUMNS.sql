-- FIX MISSING COLUMNS IN PATIENTS TABLE
-- Run this in Supabase SQL Editor to fix the "Could not find column" error

ALTER TABLE patients 
ADD COLUMN IF NOT EXISTS prefix VARCHAR(20),
ADD COLUMN IF NOT EXISTS emergency_contact_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS emergency_contact_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS medical_history TEXT,
ADD COLUMN IF NOT EXISTS allergies TEXT,
ADD COLUMN IF NOT EXISTS current_medications TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
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
ADD COLUMN IF NOT EXISTS has_pending_appointment BOOLEAN DEFAULT false;

-- Explicitly force a schema cache reload (PostgREST sometimes needs this)
NOTIFY pgrst, 'reload config';
