-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ==========================================
-- 1. USERS TABLE
-- ==========================================
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'staff', -- 'admin', 'doctor', 'staff', 'nurse'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Admin User (Password: admin123)
INSERT INTO users (email, password_hash, first_name, last_name, role, is_active)
VALUES (
    'admin@hospital.com',
    crypt('admin123', gen_salt('bf')), -- Uses pgcrypto to generate bcrypt hash
    'Admin',
    'User',
    'admin',
    true
);

-- ==========================================
-- 2. PATIENTS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    uhid VARCHAR(50) UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    age INTEGER,
    gender VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(20),
    blood_group VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 3. APPOINTMENTS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id),
    doctor_id UUID REFERENCES users(id),
    appointment_date DATE,
    appointment_time TIME,
    status VARCHAR(50) DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled'
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 4. OTHER TABLES (Minimal Schema)
-- ==========================================
CREATE TABLE IF NOT EXISTS patient_admissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id),
    admission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS discharge_summary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admission_id UUID REFERENCES patient_admissions(id),
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS opd_bills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id),
    total_amount DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ipd_bills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admission_id UUID REFERENCES patient_admissions(id),
    total_amount DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- UHID Config
CREATE TABLE IF NOT EXISTS uhid_config (
    id SERIAL PRIMARY KEY,
    prefix VARCHAR(20) DEFAULT 'HOSP',
    year_format VARCHAR(20) DEFAULT 'YY',
    current_sequence INTEGER DEFAULT 0,
    hospital_id UUID
);
INSERT INTO uhid_config (prefix, current_sequence) VALUES ('MAG', 0) ON CONFLICT DO NOTHING;

