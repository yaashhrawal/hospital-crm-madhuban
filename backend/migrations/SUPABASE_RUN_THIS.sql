-- =====================================================
-- CRITICAL: RUN THIS ENTIRE SCRIPT IN SUPABASE SQL EDITOR
-- This fixes all schema issues for IPD billing and deposits
-- =====================================================

BEGIN;

-- 1. Create ipd_bills table (if not exists)
CREATE TABLE IF NOT EXISTS ipd_bills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bill_id VARCHAR(50) NOT NULL,
  patient_id UUID NOT NULL REFERENCES patients(id),
  patient_name VARCHAR(255),
  admission_date TIMESTAMP WITH TIME ZONE,
  discharge_date TIMESTAMP WITH TIME ZONE,
  admission_charges DECIMAL(10, 2) DEFAULT 0,
  stay_segments JSONB DEFAULT '[]'::jsonb,
  services JSONB DEFAULT '[]'::jsonb,
  total_stay_charges DECIMAL(10, 2) DEFAULT 0,
  total_service_charges DECIMAL(10, 2) DEFAULT 0,
  discount DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'PENDING',
  payment_mode VARCHAR(50),
  bill_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  hospital_id UUID,
  transaction_reference VARCHAR(100),
  department VARCHAR(100)
);

-- Indexes for ipd_bills
CREATE INDEX IF NOT EXISTS idx_ipd_bills_patient_id ON ipd_bills(patient_id);
CREATE INDEX IF NOT EXISTS idx_ipd_bills_bill_date ON ipd_bills(bill_date);

-- 2. Add missing columns to patient_transactions
ALTER TABLE patient_transactions 
ADD COLUMN IF NOT EXISTS hospital_id UUID,
ADD COLUMN IF NOT EXISTS transaction_reference VARCHAR(100),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 3. CRITICAL: Make department column nullable
ALTER TABLE patient_transactions ALTER COLUMN department DROP NOT NULL;

-- 4. CRITICAL: Drop and recreate payment_mode constraint to allow both cases
ALTER TABLE patient_transactions DROP CONSTRAINT IF EXISTS patient_transactions_payment_mode_check;
ALTER TABLE patient_transactions ADD CONSTRAINT patient_transactions_payment_mode_check 
  CHECK (payment_mode IN ('cash', 'online', 'card', 'upi', 'insurance', 'adjustment', 'rghs', 'cheque', 'bank_transfer', 'neft', 'rtgs', 'CASH', 'ONLINE', 'CARD', 'UPI', 'INSURANCE', 'CREDIT', 'DEBIT'));

-- 5. Add missing columns to other tables
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS hospital_id UUID;

ALTER TABLE patient_admissions
ADD COLUMN IF NOT EXISTS hospital_id UUID;

COMMIT;

-- 5. Refresh PostgREST Schema Cache
NOTIFY pgrst, 'reload config';

-- =====================================================
-- VERIFICATION QUERIES (run these after the above)
-- =====================================================

-- Check patient_transactions columns
SELECT column_name, is_nullable, data_type 
FROM information_schema.columns 
WHERE table_name = 'patient_transactions' 
AND column_name IN ('department', 'hospital_id', 'transaction_reference', 'updated_at')
ORDER BY column_name;

-- Check ipd_bills table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'ipd_bills';
