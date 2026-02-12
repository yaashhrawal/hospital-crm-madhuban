-- Add summary_type column to ipd_summaries table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'ipd_summaries'
        AND column_name = 'summary_type'
    ) THEN
        ALTER TABLE ipd_summaries
        ADD COLUMN summary_type TEXT;
    END IF;
END $$;
