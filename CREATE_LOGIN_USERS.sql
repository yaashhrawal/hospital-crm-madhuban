-- Create a user in the database to allow login
-- This inserts a user into the 'users' table with a hashed password

-- First, check if the users table exists
-- If it doesn't, uncomment the following lines:

/*
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'FRONTDESK',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
*/

-- Create an admin user
-- Password: admin123 (hashed with bcrypt)
-- NOTE: This is the bcrypt hash for "admin123" - $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

INSERT INTO users (email, password_hash, first_name, last_name, role, is_active)
VALUES (
    'admin@hospital.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'Admin',
    'User',
    'ADMIN',
    true
)
ON CONFLICT (email) DO UPDATE
SET password_hash = EXCLUDED.password_hash,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    is_active = EXCLUDED.is_active;

-- Create additional users as needed
-- Example: Frontdesk user
-- Password: frontdesk123 (hashed with bcrypt)

INSERT INTO users (email, password_hash, first_name, last_name, role, is_active)
VALUES (
    'frontdesk@hospital.com',
    '$2a$10$rO2P0QS7z.Y4Xg6aQj4pquKFqP0zzK.LqY3K8f1dQ0gZIa3xKxdPG',
    'Front',
    'Desk',
    'FRONTDESK',
    true
)
ON CONFLICT (email) DO UPDATE
SET password_hash = EXCLUDED.password_hash;

-- Verify the users were created
SELECT id, email, first_name, last_name, role, is_active, created_at
FROM users
WHERE email IN ('admin@hospital.com', 'frontdesk@hospital.com');
