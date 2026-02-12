const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const API_URL = 'http://localhost:3002/api/beds';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin_secret_key_123'; // Fallback to common dev secret if env missing

// Create a dummy token for authentication
const token = jwt.sign(
    { id: 'test-admin', role: 'admin', username: 'admin' },
    process.env.JWT_SECRET || 'sevasangraha_secret_key_2024',
    { expiresIn: '1h' }
);

async function checkApiBeds() {
    try {
        console.log('🔍 Fetching beds from API:', API_URL);
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const beds = response.data;
        console.log(`Received ${beds.length} beds from API.`);

        const bedsByNumber = {};
        beds.forEach(bed => {
            const num = bed.bed_number;
            if (!bedsByNumber[num]) {
                bedsByNumber[num] = [];
            }
            bedsByNumber[num].push(bed);
        });

        let duplicates = false;
        Object.keys(bedsByNumber).forEach(num => {
            if (bedsByNumber[num].length > 1) {
                duplicates = true;
                console.log(`⚠️ Duplicate found for Bed from API: ${num} (${bedsByNumber[num].length} times)`);
            }
        });

        if (!duplicates) {
            console.log('✅ No duplicates found in API response.');
        }

    } catch (error) {
        console.error('❌ Error fetching from API:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

checkApiBeds();
