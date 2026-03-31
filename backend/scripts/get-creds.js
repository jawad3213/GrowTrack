const pool = require('./config/db');

async function getCreds() {
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
    
    console.log("=== APPLICATION CREDENTIALS ===");
    res.rows.forEach(user => {
      console.log(`\nRole:      ${user.my_role}`);
      console.log(`Name:      ${user.prenom} ${user.nom}`);
      console.log(`Email:     ${user.email}`);
      console.log(`Hash:      ${user.mot_de_passe}`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

getCreds();
