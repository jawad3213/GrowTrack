const pool = require('./config/db');

async function fixPasswords() {
  const hash = '$2b$10$GS/sTOUixM8uBO8../Trxegb6/lLKWG.TWrwxxScH4NGEnYBsZ38ba'; // hash for 'password123'
  const emails = [
    'admin@growtrack.com', 
    'wafa.fassi@growtrack.com', 
    'ali.alami825@student.ac.ma',
    'prof50@growtrack.com' // Just unifying everything to 'password123'
  ];
  
  try {
    for (const email of emails) {
      await pool.query('UPDATE public.utilisateur SET mot_de_passe = $1 WHERE email = $2', [hash, email]);
      console.log(`Updated password for ${email} to 'password123'`);
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixPasswords();
