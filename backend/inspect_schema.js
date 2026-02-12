const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.AZURE_DB_HOST,
    port: process.env.AZURE_DB_PORT,
    database: process.env.AZURE_DB_NAME,
    user: process.env.AZURE_DB_USER,
    password: process.env.AZURE_DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
});

async function inspectTable(tableName) {
    try {
        const res = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = $1
      ORDER BY ordinal_position;
    `, [tableName]);
        console.log(`\nColumns in ${tableName}:`);
        res.rows.forEach(row => {
            console.log(`- ${row.column_name} (${row.data_type}) ${row.is_nullable === 'YES' ? '' : '[NOT NULL]'}`);
        });

        const fks = await pool.query(`
      SELECT
          kcu.column_name, 
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name 
      FROM 
          information_schema.table_constraints AS tc 
          JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            AND tc.table_schema = kcu.table_schema
          JOIN information_schema.constraint_column_usage AS ccu
            ON ccu.constraint_name = tc.constraint_name
            AND ccu.table_schema = tc.table_schema
      WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = $1;
    `, [tableName]);
        if (fks.rows.length > 0) {
            console.log(`Foreign keys in ${tableName}:`);
            fks.rows.forEach(row => {
                console.log(`- ${row.column_name} -> ${row.foreign_table_name}(${row.foreign_column_name})`);
            });
        }

    } catch (err) {
        console.error(`Error inspecting table ${tableName}:`, err);
    }
}

async function run() {
    await inspectTable('patient_admissions');
    await inspectTable('bookings');
    await inspectTable('beds');
    await inspectTable('patients');
    await inspectTable('users');
    await pool.end();
}

run();
