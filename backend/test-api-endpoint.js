const axios = require('axios');

async function testAPI() {
  try {
    console.log('🧪 Testing Patient API Endpoint...\n');

    // Step 1: Login first to get a token
    console.log('Step 1: Logging in...');
    const loginResponse = await axios.post('http://localhost:3002/api/auth/login', {
      email: 'admin@indic.com',
      password: 'admin123'
    });

    if (!loginResponse.data.token) {
      console.error('❌ Login failed - no token received');
      return;
    }

    console.log('✅ Login successful');
    console.log('Token:', loginResponse.data.token.substring(0, 20) + '...');
    const token = loginResponse.data.token;

    // Step 2: Fetch patients with the token
    console.log('\nStep 2: Fetching patients...');
    const patientsResponse = await axios.get('http://localhost:3002/api/patients', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('✅ Patients API call successful!');
    console.log(`📊 Number of patients returned: ${patientsResponse.data.length}`);

    if (patientsResponse.data.length > 0) {
      console.log('\n📋 First patient:');
      const patient = patientsResponse.data[0];
      console.log('  ID:', patient.id);
      console.log('  Patient ID:', patient.patient_id);
      console.log('  Name:', patient.first_name, patient.last_name);
      console.log('  Age:', patient.age);
      console.log('  Gender:', patient.gender);
      console.log('  Created At:', patient.created_at);
    }

    console.log('\n✅ All tests passed! Backend API is working correctly.');

  } catch (error) {
    console.error('\n❌ API Test Failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data);
    } else if (error.request) {
      console.error('No response received from server');
      console.error('Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testAPI();
