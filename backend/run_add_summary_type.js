require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    host: process.env.AZURE_DB_HOST,
    port: parseInt(process.env.AZURE_DB_PORT || '5432'),
    database: process.env.AZURE_DB_NAME,
    user: process.env.AZURE_DB_USER,
    password: process.env.AZURE_DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
});

async function runMigration() {
    const client = await pool.connect();
    try {
        console.log('🔌 Connected to database');

        const sqlPath = path.join(__dirname, 'migrations', 'add_summary_type_to_ipd_summaries.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('🚀 Executing migration: add_summary_type_to_ipd_summaries.sql');
        await client.query(sql);

        console.log('✅ Migration completed successfully');
    } catch (err) {
        console.error('❌ Migration failed:', err);
    } finally {
        client.release();
        pool.end();
    }
}

runMigration();
