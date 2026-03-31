const pool = require('./config/db');

async function createAdmin() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    await client.query(`
      INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status)
      VALUES ('admin_001', 'Admin', 'Super', 'A123456', 'admin@growtrack.com', 'admin123', 'admin', NOW(), 'Mr', 'actif')`);
    
    await client.query(`
      INSERT INTO admin (id_utilisateur, service, fonction)
      VALUES ('admin_001', 'IT', 'Super Admin')`);
    
    await client.query('COMMIT');
    console.log('Admin created successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

createAdmin();
