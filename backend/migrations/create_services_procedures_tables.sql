-- =====================================================
-- CREATE SERVICES AND PROCEDURES TABLES
-- This script creates tables for predefined services and procedures
-- Run this in Supabase SQL Editor
-- =====================================================

-- 1. Create hospital_services table
CREATE TABLE IF NOT EXISTS hospital_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_code VARCHAR(50) UNIQUE NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  rate DECIMAL(10, 2) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  hospital_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create hospital_procedures table
CREATE TABLE IF NOT EXISTS hospital_procedures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  procedure_code VARCHAR(50) UNIQUE NOT NULL,
  procedure_name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  rate DECIMAL(10, 2) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  hospital_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Insert common hospital services
INSERT INTO hospital_services (service_code, service_name, category, rate, description) VALUES
-- General Services
('SVC-001', 'Nursing Care (per day)', 'General', 500.00, 'Daily nursing care charges'),
('SVC-002', 'Doctor Visit', 'General', 300.00, 'Doctor consultation during IPD stay'),
('SVC-003', 'ICU Charges (per day)', 'Critical Care', 2500.00, 'Intensive Care Unit daily charges'),
('SVC-004', 'Ventilator (per day)', 'Critical Care', 1500.00, 'Ventilator usage charges per day'),
('SVC-005', 'Oxygen (per hour)', 'General', 50.00, 'Oxygen supply per hour'),
('SVC-006', 'ECG', 'Diagnostic', 200.00, 'Electrocardiogram test'),
('SVC-007', 'X-Ray (Chest)', 'Radiology', 400.00, 'Chest X-Ray'),
('SVC-008', 'X-Ray (Other)', 'Radiology', 350.00, 'Other X-Ray examinations'),
('SVC-009', 'Ultrasound', 'Radiology', 800.00, 'Ultrasound examination'),
('SVC-010', 'CT Scan', 'Radiology', 3500.00, 'CT Scan examination'),
('SVC-011', 'MRI Scan', 'Radiology', 6000.00, 'MRI Scan examination'),
('SVC-012', 'Blood Test (Complete)', 'Laboratory', 500.00, 'Complete blood count and basic tests'),
('SVC-013', 'Urine Test', 'Laboratory', 150.00, 'Urine analysis'),
('SVC-014', 'Stool Test', 'Laboratory', 150.00, 'Stool examination'),
('SVC-015', 'Dressing (Simple)', 'General', 200.00, 'Simple wound dressing'),
('SVC-016', 'Dressing (Complex)', 'General', 500.00, 'Complex wound dressing'),
('SVC-017', 'IV Cannulation', 'General', 150.00, 'Intravenous cannula insertion'),
('SVC-018', 'Catheterization', 'General', 300.00, 'Urinary catheter insertion'),
('SVC-019', 'Nebulization', 'General', 100.00, 'Nebulization therapy'),
('SVC-020', 'Physiotherapy Session', 'Therapy', 400.00, 'Physiotherapy session'),
('SVC-021', 'Ambulance Service', 'Transport', 1000.00, 'Ambulance transportation'),
('SVC-022', 'Dietician Consultation', 'Consultation', 300.00, 'Dietician consultation'),
('SVC-023', 'Blood Transfusion', 'General', 1500.00, 'Blood transfusion service'),
('SVC-024', 'Dialysis', 'Critical Care', 3000.00, 'Dialysis session'),
('SVC-025', 'Injection (IM/IV)', 'General', 50.00, 'Injection administration')
ON CONFLICT (service_code) DO NOTHING;

-- 4. Insert common hospital procedures
INSERT INTO hospital_procedures (procedure_code, procedure_name, category, rate, description) VALUES
-- Surgical Procedures
('PROC-001', 'Appendectomy', 'General Surgery', 35000.00, 'Appendix removal surgery'),
('PROC-002', 'Hernia Repair', 'General Surgery', 30000.00, 'Hernia repair surgery'),
('PROC-003', 'Cholecystectomy', 'General Surgery', 45000.00, 'Gallbladder removal'),
('PROC-004', 'Cesarean Section', 'Obstetrics', 40000.00, 'C-section delivery'),
('PROC-005', 'Normal Delivery', 'Obstetrics', 20000.00, 'Normal vaginal delivery'),
('PROC-006', 'Hysterectomy', 'Gynecology', 50000.00, 'Uterus removal surgery'),
('PROC-007', 'Cataract Surgery', 'Ophthalmology', 25000.00, 'Cataract removal with lens implant'),
('PROC-008', 'Tonsillectomy', 'ENT', 20000.00, 'Tonsil removal surgery'),
('PROC-009', 'Adenoidectomy', 'ENT', 18000.00, 'Adenoid removal surgery'),
('PROC-010', 'Fracture Fixation (Simple)', 'Orthopedics', 30000.00, 'Simple fracture fixation'),
('PROC-011', 'Fracture Fixation (Complex)', 'Orthopedics', 60000.00, 'Complex fracture fixation'),
('PROC-012', 'Joint Replacement (Knee)', 'Orthopedics', 150000.00, 'Knee replacement surgery'),
('PROC-013', 'Joint Replacement (Hip)', 'Orthopedics', 180000.00, 'Hip replacement surgery'),
('PROC-014', 'Angioplasty', 'Cardiology', 120000.00, 'Coronary angioplasty'),
('PROC-015', 'Pacemaker Implantation', 'Cardiology', 200000.00, 'Pacemaker implantation'),
('PROC-016', 'Laparoscopic Surgery', 'General Surgery', 40000.00, 'Laparoscopic surgical procedure'),
('PROC-017', 'Endoscopy', 'Gastroenterology', 5000.00, 'Endoscopic examination'),
('PROC-018', 'Colonoscopy', 'Gastroenterology', 6000.00, 'Colonoscopy examination'),
('PROC-019', 'Biopsy', 'General', 3000.00, 'Tissue biopsy'),
('PROC-020', 'Suturing (Minor)', 'General', 1500.00, 'Minor wound suturing'),
('PROC-021', 'Suturing (Major)', 'General', 5000.00, 'Major wound suturing'),
('PROC-022', 'Abscess Drainage', 'General Surgery', 3000.00, 'Abscess incision and drainage'),
('PROC-023', 'Circumcision', 'Urology', 8000.00, 'Circumcision procedure'),
('PROC-024', 'Dental Extraction', 'Dental', 500.00, 'Tooth extraction'),
('PROC-025', 'Root Canal Treatment', 'Dental', 3000.00, 'Root canal therapy')
ON CONFLICT (procedure_code) DO NOTHING;

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_category ON hospital_services(category);
CREATE INDEX IF NOT EXISTS idx_services_active ON hospital_services(is_active);
CREATE INDEX IF NOT EXISTS idx_procedures_category ON hospital_procedures(category);
CREATE INDEX IF NOT EXISTS idx_procedures_active ON hospital_procedures(is_active);

-- 6. Add RLS policies (if needed)
ALTER TABLE hospital_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_procedures ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to read services" ON hospital_services;
DROP POLICY IF EXISTS "Allow authenticated users to read procedures" ON hospital_procedures;
DROP POLICY IF EXISTS "Allow authenticated users to manage services" ON hospital_services;
DROP POLICY IF EXISTS "Allow authenticated users to manage procedures" ON hospital_procedures;

-- Allow authenticated users to read services and procedures
CREATE POLICY "Allow authenticated users to read services"
  ON hospital_services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read procedures"
  ON hospital_procedures FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert/update services and procedures
CREATE POLICY "Allow authenticated users to manage services"
  ON hospital_services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage procedures"
  ON hospital_procedures FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check services count
SELECT COUNT(*) as services_count FROM hospital_services;

-- Check procedures count
SELECT COUNT(*) as procedures_count FROM hospital_procedures;

-- View all services
SELECT service_code, service_name, category, rate FROM hospital_services ORDER BY category, service_name;

-- View all procedures
SELECT procedure_code, procedure_name, category, rate FROM hospital_procedures ORDER BY category, procedure_name;
