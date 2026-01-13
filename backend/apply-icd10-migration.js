const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    host: process.env.AZURE_DB_HOST || 'sevasangraha.postgres.database.azure.com',
    port: process.env.AZURE_DB_PORT || 5432,
    database: process.env.AZURE_DB_NAME || 'postgres',
    user: process.env.AZURE_DB_USER || 'divyansh04',
    password: process.env.AZURE_DB_PASSWORD || 'Rawal@00',
    ssl: { rejectUnauthorized: false }
});

async function run() {
    try {
        const sqlPath = path.join(__dirname, 'migrations', '002_create_icd10.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        console.log('Running migration:', sqlPath);
        await pool.query(sql);
        console.log('Migration successful');
    } catch (err) {
        console.error('Migration failed', err);
    } finally {
        await pool.end();
    }
}

run();
