-- Add status column to patient_transactions for filtering
ALTER TABLE patient_transactions 
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'COMPLETED';

-- Force schema cache reload
NOTIFY pgrst, 'reload config';

COMMENT ON COLUMN patient_transactions.status IS 'Transaction status: COMPLETED, PENDING, CANCELLED, DELETED';
