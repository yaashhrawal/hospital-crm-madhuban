-- 🔓 DISABLE ROW LEVEL SECURITY (RLS) TO FIX "NETWORK ERROR"
-- Supabase blocks all requests by default. We need to open it up.
-- Run this in Supabase Dashboard -> SQL Editor

-- 1. Disable RLS on 'patients' table (Allow everything)
ALTER TABLE patients DISABLE ROW LEVEL SECURITY;

-- 2. Grant permissions to authenticated and anon users (explicitly)
GRANT ALL ON patients TO anon;
GRANT ALL ON patients TO authenticated;
GRANT ALL ON patients TO service_role;

-- 3. Also fix the 'hospital_id' issue just in case
ALTER TABLE patients 
ADD COLUMN IF NOT EXISTS hospital_id UUID;

-- 4. Force reload
NOTIFY pgrst, 'reload config';
