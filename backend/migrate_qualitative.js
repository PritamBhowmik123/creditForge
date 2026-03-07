/**
 * Migration Script: Add qualitativeNotes and primaryInsights columns
 * Run once: node migrate_qualitative.js
 */
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL ||
        'postgresql://neondb_owner:npg_5aiwAl4PvdyJ@ep-rough-water-a1f60bcx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    ssl: { rejectUnauthorized: false },
});

(async () => {
    const client = await pool.connect();
    console.log('Running migration...');
    try {
        await client.query(
            `ALTER TABLE applications ADD COLUMN IF NOT EXISTS "qualitativeNotes" TEXT`
        );
        console.log('[OK] applications.qualitativeNotes column added (or already exists)');

        await client.query(
            `ALTER TABLE cam_reports ADD COLUMN IF NOT EXISTS "primaryInsights" TEXT`
        );
        console.log('[OK] cam_reports.primaryInsights column added (or already exists)');

        console.log('\nMigration complete.');
    } catch (err) {
        console.error('[FAILED] Migration error:', err.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
})();
