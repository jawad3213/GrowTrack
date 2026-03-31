const pool = require('./config/db');
const bcrypt = require('bcrypt');

async function test() {
  const result = await pool.query("SELECT email, mot_de_passe FROM public.utilisateur WHERE my_role='admin'");
  for (const u of result.rows) {
    const hash = u.mot_de_passe.startsWith('$2b$') ? u.mot_de_passe : '$2a$' + u.mot_de_passe.slice(4);
    const isValid = await bcrypt.compare('admin', hash);
    console.log(u.email, 'admin valid?', isValid);
  }
  pool.end();
}

test();