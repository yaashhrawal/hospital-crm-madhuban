
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixDatabaseTriggers() {
    console.log('🔧 Starting database trigger fix...');

    try {
        // 1. Drop the trigger
        console.log('1️⃣  Dropping trigger: trigger_set_transaction_date...');
        const dropTriggerResult = await supabase.rpc('sql', {
            query: `DROP TRIGGER IF EXISTS trigger_set_transaction_date ON patient_transactions;`
        });

        if (dropTriggerResult.error) {
            console.error('❌ Error dropping trigger:', dropTriggerResult.error);
            // Fallback to direct query if RPC fails (though RPC is standard for this setup)
        } else {
            console.log('✅ Trigger dropped successfully (if it existed).');
        }

        // 2. Drop the function
        console.log('2️⃣  Dropping function: set_transaction_date_from_patient...');
        const dropFunctionResult = await supabase.rpc('sql', {
            query: `DROP FUNCTION IF EXISTS set_transaction_date_from_patient;`
        });

        if (dropFunctionResult.error) {
            console.error('❌ Error dropping function:', dropFunctionResult.error);
        } else {
            console.log('✅ Function dropped successfully (if it existed).');
        }

        console.log('🎉 Database fix completed!');

    } catch (error) {
        console.error('🚨 Unexpected error:', error);
    }
}

fixDatabaseTriggers();
