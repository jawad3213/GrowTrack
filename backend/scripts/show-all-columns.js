const pool = require('./config/db');

async function showAllCols() {
  try {
    const res = await pool.query(`
      SELECT table_name, column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_schema='public' 
      ORDER BY table_name, ordinal_position;
    `);
    
    let currentTable = '';
    for (const row of res.rows) {
      if (row.table_name !== currentTable) {
        currentTable = row.table_name;
        console.log(`\n=== ${currentTable} ===`);
      }
      console.log(`  ${row.column_name} (${row.data_type}) ${row.is_nullable === 'NO' ? 'NOT NULL' : ''} ${row.column_default ? 'DEFAULT ' + row.column_default : ''}`);
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

showAllCols();
