const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function applyMigration() {
    console.log('🔄 Connecting to database...');
    const client = await pool.connect();

    try {
        console.log('📄 Reading migration file...');
        const migrationPath = path.join(__dirname, 'migrations', 'add_admission_details.sql');
        const migrationSql = fs.readFileSync(migrationPath, 'utf8');

        console.log('🚀 Applying migration...');
        await client.query('BEGIN');
        await client.query(migrationSql);
        await client.query('COMMIT');

        console.log('✅ Migration applied successfully!');

        // Verify columns
        console.log('🔍 Verifying new columns...');
        const result = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'patient_admissions'
      AND column_name IN (
        'admission_type', 
        'attendant_name', 
        'attendant_relation', 
        'attendant_phone',
        'insurance_provider', 
        'policy_number'
      );
    `);

        console.log('📋 Found columns:', result.rows.map(r => r.column_name));

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error applying migration:', error);
    } finally {
        client.release();
        pool.end();
    }
}

applyMigration();
