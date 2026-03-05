const { Client } = require('pg');
require('dotenv').config();

const connectionString = 'postgresql://neondb_owner:npg_5aiwAl4PvdyJ@ep-rough-water-a1f60bcx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function test() {
    console.log('Connecting via PG client...');
    const client = new Client({ connectionString });
    try {
        await client.connect();
        console.log('SUCCESS: Connected directly via PG client');
        const res = await client.query('SELECT 1 as result');
        console.log('Query Result:', res.rows[0]);
        await client.end();
        process.exit(0);
    } catch (err) {
        console.error('FAILED: PG connection error:', err.message);
        process.exit(1);
    }
}

test();
