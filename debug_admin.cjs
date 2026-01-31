const { Pool } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const bcrypt = require(path.resolve(__dirname, 'backend/node_modules/bcryptjs'));

// Load env
const envPath = path.resolve(__dirname, 'backend/.env');
dotenv.config({ path: envPath });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

async function debugAdmin() {
    console.log('🔌 Connecting to DB...');
    try {
        const res = await pool.query("SELECT * FROM users WHERE email = 'admin@hospital.com'");
        if (res.rows.length === 0) {
            console.log('❌ Admin user NOT found.');
            // Create it
            console.log('🆕 Creating admin user...');
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash('admin123', salt);
            await pool.query(`
        INSERT INTO users (email, password_hash, first_name, last_name, role, is_active)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, ['admin@hospital.com', hash, 'Admin', 'User', 'ADMIN', true]);
            console.log('✅ Admin user created.');
        } else {
            const user = res.rows[0];
            console.log('👤 Admin user found:', {
                id: user.id,
                email: user.email,
                role: user.role,
                is_active: user.is_active
            });

            // Force reset password and active status
            console.log('🔄 Resetting password to admin123 and is_active=true...');
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash('admin123', salt);

            await pool.query(`
        UPDATE users 
        SET password_hash = $1, is_active = true, role = 'ADMIN' 
        WHERE email = 'admin@hospital.com'
      `, [hash]);
            console.log('✅ Admin reset successfully.');
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        pool.end();
    }
}

debugAdmin();
