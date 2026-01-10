-- Users Table (Doctors, Staff, Admin)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'STAFF', -- 'DOCTOR', 'ADMIN', 'FRONTDESK'
    specialization TEXT,
    department TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Patients Table
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id Serial NOT NULL, -- or TEXT unique
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE,
    age INTEGER,
    gender TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    address TEXT,
    blood_group TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id),
    doctor_id UUID REFERENCES users(id),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status TEXT DEFAULT 'SCHEDULED', -- 'COMPLETED', 'CANCELLED'
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- OPD Queues Table
CREATE TABLE IF NOT EXISTS opd_queues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id),
    doctor_id UUID REFERENCES users(id),
    appointment_id UUID REFERENCES appointments(id),
    token_number INTEGER NOT NULL,
    queue_order INTEGER NOT NULL,
    status TEXT DEFAULT 'WAITING', -- 'WAITING', 'IN_CONSULTATION', 'COMPLETED', 'MISSED'
    priority BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Patient Vitals Table
CREATE TABLE IF NOT EXISTS patient_vitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id),
    queue_id UUID REFERENCES opd_queues(id),
    bp TEXT, -- Blood Pressure (e.g. "120/80")
    pulse INTEGER, -- BPM
    temperature DECIMAL(4,1), -- Fahrenheit/Celsius
    weight DECIMAL(5,2), -- kg
    height DECIMAL(5,2), -- cm
    spo2 INTEGER, -- %
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_opd_queues_doctor_status ON opd_queues(doctor_id, status);
CREATE INDEX IF NOT EXISTS idx_opd_queues_created_at ON opd_queues(created_at);
CREATE INDEX IF NOT EXISTS idx_patients_search ON patients(phone, first_name, last_name);
