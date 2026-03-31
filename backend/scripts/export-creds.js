const fs = require('fs');
const pool = require('./config/db');

async function exportCreds() {
  try {
    const res = await pool.query(`
      SELECT DISTINCT ON (my_role) 
        my_role, 
        nom, 
        prenom, 
        email, 
        mot_de_passe 
      FROM public.utilisateur 
      WHERE my_role IS NOT NULL
      ORDER BY my_role, date_creation DESC
    `);
    
    fs.writeFileSync('creds_output.json', JSON.stringify(res.rows, null, 2));
    console.log("Credentials saved to creds_output.json");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

exportCreds();
