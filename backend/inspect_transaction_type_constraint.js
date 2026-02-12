const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function inspectConstraint() {
    try {
        const res = await pool.query(`
      SELECT 
        conname AS constraint_name,
        pg_get_constraintdef(oid) AS constraint_definition
      FROM pg_constraint
      WHERE conrelid = 'patient_transactions'::regclass
      AND conname LIKE '%transaction_type%';
    `);
        console.log('Transaction type constraint:', res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

inspectConstraint();
