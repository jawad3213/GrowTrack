const pool = require('./config/db');

async function showCols() {
  try {
    const res = await pool.query("SELECT table_name, column_name FROM information_schema.columns WHERE table_schema='public' AND table_name IN ('enseigne', 'classe');");
    console.log(res.rows);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

showCols();
