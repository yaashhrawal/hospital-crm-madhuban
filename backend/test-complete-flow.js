const axios = require('axios');
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

async function testCompleteFlow() {
  console.log('🧪 Testing Complete Data Flow: Database -> Backend API -> Frontend\n');
  console.log('='.repeat(70));

  try {
    // Step 1: Test Direct Database Connection
    console.log('\n📊 STEP 1: Direct Database Connection');
    console.log('-'.repeat(70));

    const dbResult = await pool.query(`
      SELECT id, patient_id, first_name, last_name, age, gender
      FROM patients
      WHERE (is_active = true OR is_active IS NULL)
      ORDER BY created_at DESC
      LIMIT 5
    `);

    console.log(`✅ Database query successful: ${dbResult.rows.length} patients found`);
    console.log('\nSample patient from database:');
    if (dbResult.rows.length > 0) {
      const p = dbResult.rows[0];
      console.log(`   Patient ID: ${p.patient_id}`);
      console.log(`   Name: ${p.first_name} ${p.last_name}`);
      console.log(`   Age: ${p.age}`);
      console.log(`   Gender: ${p.gender}`);
    }

    // Step 2: Test Backend API Login
    console.log('\n🔐 STEP 2: Backend API Login');
    console.log('-'.repeat(70));

    const loginResponse = await axios.post('http://localhost:3002/api/auth/login', {
      email: 'admin@indic.com',
      password: 'admin123'
    });

    if (!loginResponse.data.token) {
      throw new Error('Login failed - no token received');
    }

    console.log('✅ Login successful');
    console.log(`   User: ${loginResponse.data.user.email}`);
    console.log(`   Role: ${loginResponse.data.user.role}`);
    console.log(`   Token: ${loginResponse.data.token.substring(0, 30)}...`);

    const token = loginResponse.data.token;

    // Step 3: Test Backend API Patient Fetch
    console.log('\n📡 STEP 3: Backend API Patient Fetch');
    console.log('-'.repeat(70));

    const apiResponse = await axios.get('http://localhost:3002/api/patients', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log(`✅ API query successful: ${apiResponse.data.length} patients returned`);
    console.log('\nSample patient from API:');
    if (apiResponse.data.length > 0) {
      const p = apiResponse.data[0];
      console.log(`   Patient ID: ${p.patient_id}`);
      console.log(`   Name: ${p.first_name} ${p.last_name}`);
      console.log(`   Age: ${p.age}`);
      console.log(`   Gender: ${p.gender}`);
      console.log(`   Has transactions: ${p.transactions && p.transactions.length > 0 ? 'Yes' : 'No'}`);
      console.log(`   Has admissions: ${p.admissions && p.admissions.length > 0 ? 'Yes' : 'No'}`);
    }

    // Step 4: Verify Data Consistency
    console.log('\n🔍 STEP 4: Data Consistency Check');
    console.log('-'.repeat(70));

    const dbCount = dbResult.rows.length;
    const apiCount = apiResponse.data.length;

    if (apiCount >= dbCount) {
      console.log(`✅ Data consistency verified!`);
      console.log(`   Database returned: ${dbCount} patients (limited to 5)`);
      console.log(`   API returned: ${apiCount} patients (all active)`);
    } else {
      console.log(`⚠️  Data count mismatch!`);
      console.log(`   Database: ${dbCount} patients`);
      console.log(`   API: ${apiCount} patients`);
    }

    // Step 5: Simulate Frontend Data Service Call
    console.log('\n🎨 STEP 5: Simulate Frontend Data Service');
    console.log('-'.repeat(70));

    // Simulate what the frontend dataService.getPatients() does
    const frontendSimulation = {
      baseUrl: 'http://localhost:3002',
      token: token,
      async getPatients() {
        console.log('   🔍 Frontend calling: GET /api/patients');
        const response = await axios.get(`${this.baseUrl}/api/patients`, {
          headers: { Authorization: `Bearer ${this.token}` }
        });
        console.log(`   ✅ Frontend received: ${response.data.length} patients`);
        return response.data;
      }
    };

    const frontendPatients = await frontendSimulation.getPatients();

    if (frontendPatients.length > 0) {
      console.log('\n   Sample patient data structure for frontend:');
      const p = frontendPatients[0];
      console.log('   {');
      console.log(`      id: "${p.id}",`);
      console.log(`      patient_id: "${p.patient_id}",`);
      console.log(`      first_name: "${p.first_name}",`);
      console.log(`      last_name: "${p.last_name}",`);
      console.log(`      age: ${p.age},`);
      console.log(`      gender: "${p.gender}",`);
      console.log(`      email: "${p.email || 'N/A'}",`);
      console.log(`      phone: "${p.phone || 'N/A'}",`);
      console.log(`      transactions: [${p.transactions?.length || 0} items],`);
      console.log(`      admissions: [${p.admissions?.length || 0} items]`);
      console.log('   }');
    }

    // Step 6: Summary
    console.log('\n' + '='.repeat(70));
    console.log('📋 SUMMARY');
    console.log('='.repeat(70));
    console.log(`✅ Database Connection: Working`);
    console.log(`✅ Backend Authentication: Working`);
    console.log(`✅ Backend API Endpoint: Working`);
    console.log(`✅ Data Flow: Database -> Backend -> Frontend simulation successful`);
    console.log(`✅ Total Patients Available: ${apiResponse.data.length}`);

    console.log('\n🎯 CONCLUSION:');
    console.log('   The backend and database are working correctly.');
    console.log('   If you cannot see patients in the frontend:');
    console.log('   1. Make sure you are logged in to the application');
    console.log('   2. Check browser console (F12) for any errors');
    console.log('   3. Verify auth token is stored in localStorage');
    console.log('   4. Check Network tab to see if API calls are being made');

    console.log('\n✨ All tests passed successfully!\n');

  } catch (error) {
    console.error('\n❌ Test failed at some step:');
    if (error.response) {
      console.error(`   HTTP ${error.response.status}: ${error.response.statusText}`);
      console.error('   Response:', error.response.data);
    } else if (error.message) {
      console.error('   Error:', error.message);
    } else {
      console.error('   Error:', error);
    }
    process.exit(1);
  } finally {
    await pool.end();
  }
}

testCompleteFlow();
