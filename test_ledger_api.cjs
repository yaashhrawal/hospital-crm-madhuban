const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'backend/.env') });

const PORT = 3002; // Configured in backend/.env
// process.env.PORT might be set but we assume 5000 for local dev if not present.

const BASE_URL = `http://localhost:${PORT}`;

async function testApi() {
    try {
        console.log(`📡 Connecting to ${BASE_URL}...`);

        // 1. Login
        console.log('🔑 Logging in as admin...');
        const loginRes = await axios.post(`${BASE_URL}/api/auth/login`, {
            email: 'admin@hospital.com',
            password: 'admin123'
        });

        const token = loginRes.data.token;
        console.log('✅ Login successful. Token received.');

        // 2. Get Ledger
        const today = new Date().toISOString().split('T')[0];
        console.log(`🔍 Fetching ledger for ${today}...`);

        const ledgerRes = await axios.get(`${BASE_URL}/api/transactions/for-ledger`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                start_date: today,
                end_date: today
            }
        });

        console.log(`✅ Ledger loaded successfully! Status: ${ledgerRes.status}`);
        console.log(`📊 Found ${ledgerRes.data.length} transactions.`);

        if (ledgerRes.data.length > 0) {
            console.log('📄 Sample transaction:', JSON.stringify(ledgerRes.data[0], null, 2));
        } else {
            console.log('⚠️ No transactions found (but API worked).');
        }

    } catch (error) {
        console.error('❌ API Test FAILED');
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
            if (error.code) console.error('Code:', error.code);
        }
    }
}

testApi();
