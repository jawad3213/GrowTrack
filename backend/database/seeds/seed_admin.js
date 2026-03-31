require('dotenv').config();
const pool = require('../../src/config/database');
const { hashPassword } = require('../../src/shared/utils/password');

const adminUser = {
  email: 'admin@growtrack.com',
  password: 'Admin123!',
  nom: 'Admin',
  prenom: 'GrowTrack',
  role: 'admin'
};

async function seedAdmin() {
  try {
    const hashedPassword = await hashPassword(adminUser.password);

    const result = await pool.query(
      `INSERT INTO utilisateur (email, mot_de_passe, nom, prenom, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING
       RETURNING id_utilisateur`,
      [adminUser.email, hashedPassword, adminUser.nom, adminUser.prenom, adminUser.role]
    );

    if (result.rows.length > 0) {
      console.log('✅ Admin user created successfully');
      console.log(`   Email: ${adminUser.email}`);
      console.log(`   Password: ${adminUser.password}`);
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
