const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkBeds() {
    const client = await pool.connect();
    try {
        console.log('🔍 Checking for duplicate beds...');

        // Get all beds
        const res = await client.query('SELECT id, bed_number, status, patient_id FROM beds ORDER BY bed_number');

        console.log(`Total beds found: ${res.rows.length}`);

        const bedsByNumber = {};
        res.rows.forEach(bed => {
            if (!bedsByNumber[bed.bed_number]) {
                bedsByNumber[bed.bed_number] = [];
            }
            bedsByNumber[bed.bed_number].push(bed);
        });

        let duplicatesFound = false;
        Object.keys(bedsByNumber).forEach(num => {
            if (bedsByNumber[num].length > 1) {
                duplicatesFound = true;
                console.log(`\n⚠️ Duplicate found for Bed ${num}: ${bedsByNumber[num].length} entries`);
                bedsByNumber[num].forEach(b => {
                    console.log(`   - ID: ${b.id}, Status: ${b.status}, Patient: ${b.patient_id || 'None'}`);
                });
            }
        });

        if (!duplicatesFound) {
            console.log('✅ No duplicate bed numbers found.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        pool.end();
    }
}

checkBeds();
