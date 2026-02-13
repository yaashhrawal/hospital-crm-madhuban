-- =====================================================
-- CLEAR ALL IPD DATA FOR FRESH START
-- WARNING: This will delete all IPD patient data
-- Run this in Supabase SQL Editor
-- =====================================================

BEGIN;

-- 1. Clear IPD bills
DELETE FROM ipd_bills;

-- 2. Clear patient admissions (IPD records)
DELETE FROM patient_admissions;

-- 3. Clear patient transactions (deposits, payments)
DELETE FROM patient_transactions;

-- 4. Reset bed occupancy - make all beds vacant
UPDATE beds SET 
  status = 'available',
  patient_id = NULL,
  updated_at = NOW();

-- 5. Optional: Clear patients table if you want to remove all patient records
-- UNCOMMENT the line below ONLY if you want to delete ALL patients (not just IPD)
-- DELETE FROM patients;

COMMIT;

-- =====================================================
-- VERIFICATION QUERIES (run these after the above)
-- =====================================================

-- Check IPD bills count (should be 0)
SELECT COUNT(*) as ipd_bills_count FROM ipd_bills;

-- Check admissions count (should be 0)
SELECT COUNT(*) as admissions_count FROM patient_admissions;

-- Check transactions count (should be 0)
SELECT COUNT(*) as transactions_count FROM patient_transactions;

-- Check bed status (all should be available)
SELECT status, COUNT(*) as count 
FROM beds 
GROUP BY status;

-- Check patients count (will show remaining patients if you didn't delete them)
SELECT COUNT(*) as patients_count FROM patients;
