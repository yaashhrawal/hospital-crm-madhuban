-- Create ipd_bills table
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search index for JSONB columns if needed (optional but good)
CREATE INDEX IF NOT EXISTS idx_ipd_bills_patient_id ON ipd_bills(patient_id);
CREATE INDEX IF NOT EXISTS idx_ipd_bills_bill_date ON ipd_bills(bill_date);

-- Force schema reload
NOTIFY pgrst, 'reload config';
