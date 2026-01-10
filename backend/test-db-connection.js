const { Pool } = require('pg');
require('dotenv').config();

// Azure PostgreSQL connection
const pool = new Pool({
  host: process.env.AZURE_DB_HOST || 'sevasangraha.postgres.database.azure.com',
  port: process.env.AZURE_DB_PORT || 5432,
  database: process.env.AZURE_DB_NAME || 'postgres',
  user: process.env.AZURE_DB_USER || 'divyansh04',
  password: process.env.AZURE_DB_PASSWORD || 'Rawal@00',
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    console.log('Testing Azure PostgreSQL connection...');
    console.log('Host:', process.env.AZURE_DB_HOST || 'sevasangraha.postgres.database.azure.com');
    console.log('Database:', process.env.AZURE_DB_NAME || 'postgres');
    console.log('User:', process.env.AZURE_DB_USER || 'divyansh04');

    // Test basic connection
    const client = await pool.connect();
    console.log('✅ Connected to Azure PostgreSQL database');

    // Check if patients table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'patients'
      );
    `);

    if (tableCheck.rows[0].exists) {
      console.log('✅ Patients table exists');

      // Count total patients
      const countResult = await client.query('SELECT COUNT(*) as count FROM patients');
      console.log(`📊 Total patients in database: ${countResult.rows[0].count}`);

      // Get sample patients
      const sampleResult = await client.query(`
        SELECT id, patient_id, first_name, last_name, age, gender, created_at
        FROM patients
        ORDER BY created_at DESC
        LIMIT 5
      `);

      console.log('\n📋 Sample patients:');
      sampleResult.rows.forEach((p, i) => {
        console.log(`${i + 1}. ${p.patient_id} - ${p.first_name} ${p.last_name} (${p.age}${p.gender ? ', ' + p.gender : ''})`);
      });

      // Test the actual query used by the API
      console.log('\n🔍 Testing API query...');
      const apiResult = await client.query(`
        SELECT
          p.*,
          COALESCE(
            (SELECT json_agg(row_to_json(pt.*))
             FROM patient_transactions pt
             WHERE pt.patient_id = p.id),
            '[]'::json
          ) as transactions,
          COALESCE(
            (SELECT json_agg(row_to_json(pa.*))
             FROM patient_admissions pa
             WHERE pa.patient_id = p.id),
            '[]'::json
          ) as admissions
        FROM patients p
        WHERE (p.is_active = true OR p.is_active IS NULL)
        ORDER BY p.created_at DESC
        LIMIT 5
      `);

      console.log(`✅ API query successful! Returned ${apiResult.rows.length} patients`);

    } else {
      console.log('❌ Patients table does not exist!');
    }

    client.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

testConnection();
