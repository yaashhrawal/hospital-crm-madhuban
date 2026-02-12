const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function inspectSchema() {
    try {
        const res = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'ipd_bills';
    `);
        console.log('Columns in ipd_bills:', res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

inspectSchema();
