-- Migration to clean up and update Doctors and Departments
-- Goal: Keep only 'KNEE' and 'SPORTS' departments, and 'DR. HEMANT KHAJJA' as the doctor.

-- 1. Departments Table
-- Ensure table exists (if not already)
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clear existing data
DELETE FROM departments;

-- Insert new departments
INSERT INTO departments (name, description, is_active) VALUES 
('KNEE', 'Knee Surgery and Care', true),
('SPORTS', 'Sports Medicine and Rehabilitation', true);

-- 2. Doctors Table
-- Ensure table exists
CREATE TABLE IF NOT EXISTS doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    department TEXT NOT NULL, -- Storing department name as per current frontend logic
    specialization TEXT,
    fee DECIMAL(10,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clear existing data
DELETE FROM doctors;

-- Insert Doctor Records (Two entries as requested: one for each department)
INSERT INTO doctors (name, department, specialization, fee, is_active) VALUES
('DR. HEMANT KHAJJA', 'KNEE', 'Knee Specialist', 800, true),
('DR. HEMANT KHAJJA', 'SPORTS', 'Sports Medicine', 800, true);

-- Verification
SELECT * FROM departments;
SELECT * FROM doctors;
