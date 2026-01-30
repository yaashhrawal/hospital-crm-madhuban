
// Script to verify full stack connectivity
import { readFileSync } from 'fs';
import { resolve } from 'path';

async function verifyStack() {
    console.log('🔍 Starting Full Stack Verification Check...');

    // 1. Check Frontend Config
    const envPath = resolve(process.cwd(), '.env');
    let apiUrl = '';
    try {
        const envContent = readFileSync(envPath, 'utf-8');
        // Split by lines and find the non-commented one
        const lines = envContent.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('VITE_API_URL=') && !trimmed.startsWith('#')) {
                apiUrl = trimmed.split('=')[1].trim();
                break;
            }
        }

        if (apiUrl) {
            console.log('✅ [Frontend] .env is configured properly.');
            console.log(`ℹ️  Backend URL found: ${apiUrl}`);
        } else {
            throw new Error('VITE_API_URL not found in .env (or all commented out)');
        }
    } catch (err) {
        console.error('❌ [Frontend] Failed to read .env configuration:', err.message);
        process.exit(1);
    }

    // 2. Check Backend Connectivity
    console.log('⏳ Ping Backend...');
    try {
        const response = await fetch(`${apiUrl}/api/health`);
        if (response.ok) {
            console.log('✅ [Backend] Backend is reachable (HTTP 200).');
        } else {
            throw new Error(`Backend returned status ${response.status}`);
        }

        const data = await response.json();

        // 3. Check Database Connection
        if (data.database === 'connected') {
            console.log('✅ [Database] Database connection confirmed.');
            console.log('🎉 FULL STACK SYNC CONFIRMED!');
            console.log('---------------------------------------------------');
            console.log('1. Frontend Config: OK');
            console.log('2. Backend Status:  OK');
            console.log('3. Database Link:   OK');
            console.log('---------------------------------------------------');
        } else {
            console.error('❌ [Database] Database reported disconnected:', data);
            process.exit(1);
        }

    } catch (err) {
        console.error('❌ [Backend] Failed to connect to Backend:', err.message);
        console.log('   Possible causes:');
        console.log('   - Vercel deployment is still building.');
        console.log('   - URL is incorrect.');
        process.exit(1);
    }
}

verifyStack();
