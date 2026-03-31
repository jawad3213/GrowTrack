const pool = require('./config/db');

async function checkSup() {
  try {
    const res = await pool.query("SELECT email FROM public.utilisateur WHERE my_role = 'superviseur' LIMIT 1");
    if (res.rows.length > 0) {
      const email = res.rows[0].email;
      const hash = '$2b$10$GS/sTOUixM8uBO8../Trxegb6/lLKWG.TWrwxxScH4NGEnYBsZ38ba';
      await pool.query('UPDATE public.utilisateur SET mot_de_passe = $1 WHERE email = $2', [hash, email]);
      console.log(`SUPERVISEUR: email=${email}, password=password123`);
    } else {
      console.log('No superviseur found.');
    }
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
checkSup();
