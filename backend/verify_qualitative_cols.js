const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_5aiwAl4PvdyJ@ep-rough-water-a1f60bcx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    ssl: { rejectUnauthorized: false },
});
(async () => {
    const { rows } = await pool.query(
        `SELECT table_name, column_name, data_type 
     FROM information_schema.columns 
     WHERE table_name IN ('applications', 'cam_reports') 
       AND column_name IN ('qualitativeNotes', 'primaryInsights') 
     ORDER BY table_name, column_name`
    );
    console.log('DB Columns verified:');
    console.table(rows);
    await pool.end();
})().catch(e => { console.error(e.message); process.exit(1); });
