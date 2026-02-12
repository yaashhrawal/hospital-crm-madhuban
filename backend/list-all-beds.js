const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function listAllBeds() {
    const client = await pool.connect();
    try {
        console.log('🔍 Listing all beds...');

        const res = await client.query('SELECT id, bed_number, room_type, department, status FROM beds ORDER BY bed_number');

        console.log(`Found ${res.rows.length} beds:`);
        res.rows.forEach(bed => {
            console.log(`[${bed.id}] Number: "${bed.bed_number}" | Room: ${bed.room_type} | Dept: ${bed.department} | Status: ${bed.status}`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        pool.end();
    }
}

listAllBeds();
