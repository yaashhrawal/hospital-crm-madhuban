const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function runMigration() {
    const config = {
        host: process.env.AZURE_DB_HOST,
        port: process.env.AZURE_DB_PORT,
        database: process.env.AZURE_DB_NAME,
        user: process.env.AZURE_DB_USER,
        password: process.env.AZURE_DB_PASSWORD,
        ssl: { rejectUnauthorized: false }
    };

    const client = new Client(config);

    try {
        await client.connect();
        console.log('Connected to DB');

        const sqlPath = path.join(__dirname, 'migrations', 'refresh_schema_cache.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Running SQL...');
        await client.query(sql);
        console.log('✅ SQL executed successfully');

    } catch (error) {
        console.error('❌ Error executing SQL:', error);
    } finally {
        await client.end();
    }
}

runMigration();
