-- =====================================================
-- DISCHARGE ALL CURRENTLY ADMITTED IPD PATIENTS
-- This will clear the 4 occupied beds and discharge patients
-- Run this in Supabase SQL Editor
-- =====================================================

BEGIN;

-- 1. Get all currently occupied beds and their patient IDs
-- (This is just for verification - you can see the patient IDs before discharge)

-- 2. Discharge all currently admitted patients by updating their admission records
UPDATE patient_admissions 
SET 
  discharge_date = NOW(),
  status = 'discharged',
  updated_at = NOW()
WHERE status = 'admitted' OR discharge_date IS NULL;

-- 3. Clear all bed occupancy - make all beds vacant
UPDATE beds 
SET 
  status = 'available',
  patient_id = NULL,
  updated_at = NOW()
WHERE status = 'occupied';

COMMIT;

-- =====================================================
-- VERIFICATION QUERIES (run these after the above)
-- =====================================================

-- Check bed status (all should be available now)
SELECT status, COUNT(*) as count 
FROM beds 
GROUP BY status;

-- Check recent admissions (should all show as discharged)
SELECT 
  patient_id,
  admission_date,
  discharge_date,
  status
FROM patient_admissions 
ORDER BY admission_date DESC 
LIMIT 10;

-- Check if any beds are still occupied (should be 0)
SELECT COUNT(*) as occupied_beds_count 
FROM beds 
WHERE status = 'occupied';
