const pool = require('./config/db');

async function testSelect() {
  try {
    const query = `
      SELECT u.id_utilisateur AS id_member, u.cin, 
             u.nom || ' ' || u.prenom AS full_name, 
             p.code, u.email, p.departement AS department, 
             c.nom_classe AS id_class, 
             u.date_creation AS date_add, 
             u.photo_profile AS profile_picture
      FROM public.utilisateur u
      JOIN public.professeur p ON u.id_utilisateur = p.id_utilisateur
      LEFT JOIN public.enseigne e ON p.id_utilisateur = e.id_utilisateur
      LEFT JOIN public.classe c ON e.id_classe = c.id_classe
      WHERE u.my_role = 'prof'
    `;
    const res = await pool.query(query);
    console.log(res.rows);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

testSelect();
