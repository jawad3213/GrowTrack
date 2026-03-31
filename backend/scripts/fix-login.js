const bcrypt = require('bcrypt');
const pool = require('./config/db');

async function fixLogin() {
  try {
    const rawPassword = 'password123';
    console.log(`Hashing password '${rawPassword}'...`);
    const newHash = await bcrypt.hash(rawPassword, 10);
    console.log(`Generated Hash: ${newHash}`);

    const emails = [
      'admin@growtrack.com', 
      'wafa.fassi@growtrack.com', 
      'ali.alami825@student.ac.ma',
      'prof50@growtrack.com'
    ];
    
    for (const email of emails) {
      await pool.query('UPDATE public.utilisateur SET mot_de_passe = $1, status = $2 WHERE email = $3', [newHash, 'actif', email]);
      console.log(`✅ Fixed credentials for: ${email}`);
    }

    // Verify one of them to make 100% sure it works with bcrypt.compare
    const res = await pool.query('SELECT mot_de_passe FROM public.utilisateur WHERE email = $1', ['admin@growtrack.com']);
    const savedHash = res.rows[0].mot_de_passe;
    
    let hashPass = /^\\$2y\\$/.test(savedHash) ? '$2a$' + savedHash.slice(4) : savedHash;
    const isValid = await bcrypt.compare(rawPassword, hashPass);
    
    console.log(`\nVerification Check:`);
    console.log(`DB Hash: ${savedHash}`);
    console.log(`Validates against 'password123': ${isValid ? 'YES' : 'NO'}`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixLogin();
