-- Create ipd_summaries table for IPD Summary Module
CREATE TABLE IF NOT EXISTS ipd_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL,
    summary_reference VARCHAR(50),
    services JSONB DEFAULT '[]', -- Stores array of services {id, service, qty, amount}
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    payment_mode VARCHAR(50),
    notes TEXT,
    hospital_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    
    CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_ipd_summaries_patient_id ON ipd_summaries(patient_id);
CREATE INDEX IF NOT EXISTS idx_ipd_summaries_created_at ON ipd_summaries(created_at);

-- Force schema cache reload
NOTIFY pgrst, 'reload config';

COMMENT ON TABLE ipd_summaries IS 'Stores generated IPD billing summaries';
