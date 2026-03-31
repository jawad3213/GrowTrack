const fs = require('fs');
const bcrypt = require('bcrypt');

async function generateSQL() {
    const saltRounds = 10;
    const defaultPassword = 'password123';
    // Hashing once to reuse for speed in dummy data generation
    const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);

    let sql = `
-- ==========================================
-- GROWTRACK MASSIVE DUMMY DATA SEED SQL
-- ==========================================

-- Clear existing data (optional, skipping for safety, relying on ON CONFLICT DO NOTHING)

`;

    function escapeString(str) {
        return str.replace(/'/g, "''");
    }

    // 1 Super Admin
    sql += `-- --- 1. SUPER ADMIN ---\n`;
    sql += `INSERT INTO public.utilisateur (id_utilisateur, nom, prenom, cin, sexe, my_role, email, mot_de_passe, status, numero_de_telephone) VALUES ('usr_sa_1', 'Admin', 'Super', 'SA1111', 'Mr', 'admin', 'superadmin@growtrack.com', '${hashedPassword}', 'actif', '0600000000') ON CONFLICT DO NOTHING;\n`;
    sql += `INSERT INTO public.admin (id_utilisateur, service, fonction) VALUES ('usr_sa_1', 'Direction Générale', 'Superviseur Principal') ON CONFLICT DO NOTHING;\n\n`;

    // 2 Normal Admins (Directors)
    sql += `-- --- 2. NORMAL ADMINS (DIRECTORS) ---\n`;
    for(let i=1; i<=2; i++) {
        const id = `usr_dir_${i}`;
        sql += `INSERT INTO public.utilisateur (id_utilisateur, nom, prenom, cin, sexe, my_role, email, mot_de_passe, status, numero_de_telephone) VALUES ('${id}', 'Director', 'Sub${i}', 'DIR${i}00', 'Mme', 'admin', 'director${i}@growtrack.com', '${hashedPassword}', 'actif', '060000000${i}') ON CONFLICT DO NOTHING;\n`;
        sql += `INSERT INTO public.admin (id_utilisateur, service, fonction) VALUES ('${id}', 'Administration Scolaire', 'Directeur Pédagogique') ON CONFLICT DO NOTHING;\n`;
    }
    sql += `\n`;

    // 50 Professors
    sql += `-- --- 3. PROFESSORS ---\n`;
    const depts = ['Computer Science', 'Mathematics', 'Physics', 'Literature', 'Economics'];
    for(let i=1; i<=50; i++) {
        const id = `usr_prof_${i}`;
        const sex = i % 2 === 0 ? 'Mme' : 'Mr';
        const dept = depts[i % depts.length];
        sql += `INSERT INTO public.utilisateur (id_utilisateur, nom, prenom, cin, sexe, my_role, email, mot_de_passe, status, numero_de_telephone) VALUES ('${id}', 'ProfNom${i}', 'ProfPrenom${i}', 'PR${1000+i}', '${sex}', 'prof', 'prof${i}@growtrack.com', '${hashedPassword}', 'actif', '0610000${i.toString().padStart(2, '0')}') ON CONFLICT DO NOTHING;\n`;
        sql += `INSERT INTO public.professeur (id_utilisateur, code, departement, status_contrat) VALUES ('${id}', 'CODEP${i}', '${dept}', 'titulaire') ON CONFLICT DO NOTHING;\n`;
    }
    sql += `\n`;

    // 200 Students
    sql += `-- --- 4. STUDENTS ---\n`;
    for(let i=1; i<=200; i++) {
        const id = `usr_stud_${i}`;
        const sex = i % 2 === 0 ? 'Mme' : 'Mr';
        sql += `INSERT INTO public.utilisateur (id_utilisateur, nom, prenom, cin, sexe, my_role, email, mot_de_passe, status, numero_de_telephone) VALUES ('${id}', 'StudNom${i}', 'StudPrenom${i}', 'ST${1000+i}', '${sex}', 'etudiant', 'student${i}@growtrack.com', '${hashedPassword}', 'actif', '0620000${i.toString().padStart(3, '0')}') ON CONFLICT DO NOTHING;\n`;
        sql += `INSERT INTO public.etudiant (id_utilisateur, code_apogee, date_inscription) VALUES ('${id}', 'APO${2000+i}', CURRENT_DATE) ON CONFLICT DO NOTHING;\n`;
    }
    sql += `\n`;

    fs.writeFileSync('massive_seed.sql', sql);
    console.log("SQL seed file 'massive_seed.sql' generated successfully!");
}

generateSQL().catch(console.error);
