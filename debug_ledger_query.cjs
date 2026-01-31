const { Pool } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables from backend/.env
const envPath = path.resolve(__dirname, 'backend/.env');
console.log('📂 Loading env from:', envPath);
dotenv.config({ path: envPath });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

async function testLedgerQuery() {
    console.log('🔌 Connecting to database...');
    try {
        const start_date = new Date().toISOString().split('T')[0];
        const end_date = start_date;

        console.log(`🔍 Testing ledger query for date: ${start_date}`);

        // The exact query from server.js
        // INSERT TEST TRANSACTION
        console.log('📝 Inserting test transaction with type entry_fee...');
        const insertRes = await pool.query(`
      INSERT INTO patient_transactions (
        patient_id, transaction_type, amount, payment_mode,
        doctor_name, department, description,
        transaction_date, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `, [
            'a129e2b5-3cae-417e-8b42-c400c9e216ce', // Use the patient_id found in previous query
            'entry_fee',
            500,
            'cash',
            'Test Doc',
            'GENERAL',
            'Test Entry Fee',
            new Date().toISOString(),
            '5b8e8042-ec46-4635-8436-72f3d8e01bd7'
        ]);
        console.log('✅ Inserted transaction:', insertRes.rows[0].id);

        const query = `
      SELECT
        t.*,
        json_build_object(
          'id', p.id,
          'patient_id', p.patient_id,
          'first_name', p.first_name,
          'last_name', p.last_name,
          'age', p.age,
          'gender', p.gender,
          'phone', p.phone,
          'patient_tag', p.patient_tag,
          'assigned_doctor', p.assigned_doctor,
          'assigned_department', p.assigned_department,
          'date_of_entry', p.date_of_entry
        ) as patient
      FROM patient_transactions t
      LEFT JOIN patients p ON t.patient_id = p.id
      WHERE (
        (t.transaction_date IS NOT NULL AND t.transaction_date >= $1 AND t.transaction_date <= $2)
        OR
        (t.transaction_date IS NULL AND DATE(t.created_at) >= $1 AND DATE(t.created_at) <= $2)
      )
      ORDER BY t.created_at DESC
      LIMIT 5
    `;

        console.log('📝 Executing query...');
        const result = await pool.query(query, [start_date, end_date]);
        console.log('✅ Query successful!');
        console.log(`📊 Found ${result.rows.length} rows`);
        if (result.rows.length > 0) {
            console.log('📄 Sample row:', JSON.stringify(result.rows[0], null, 2));
        }

    } catch (error) {
        console.error('❌ Query FAILED:', error.message);
        if (error.code) {
            console.error('Error Code:', error.code);
        }

        // Check specific columns if query failed
        await checkColumns();
    } finally {
        pool.end();
    }
}

async function checkColumns() {
    console.log('\n🕵️ Checking columns in patients table...');
    try {
        const res = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'patients'
    `);
        console.log('📋 Patients Columns:', res.rows.map(r => `${r.column_name} (${r.data_type})`).join(', '));

        const res2 = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'patient_transactions'
    `);
        console.log('📋 Transactions Columns:', res2.rows.map(r => `${r.column_name} (${r.data_type})`).join(', '));

    } catch (e) {
        console.error('Error checking columns:', e);
    }
}

testLedgerQuery();
