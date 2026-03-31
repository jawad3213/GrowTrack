const pool = require("../../config/db");

exports.createStudent = async (id_user, full_name, cin, cne, email, pass, field, note, role, imagePath) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const result = await client.query(
      `INSERT INTO public.utilisateur (
         id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status
       ) VALUES ($1, $2, $3, $4, $5, $6, 'etudiant', NOW(), 'Mr', 'actif')`,
      [id_user, full_name.split(' ').slice(1).join(' '), full_name.split(' ')[0], cin, email, pass]
    );

    await client.query(
      `INSERT INTO public.etudiant (
         id_utilisateur, code_apogee
       ) VALUES ($1, $2)`,
      [id_user, cne]
    );

    await client.query('COMMIT');
    return result.rows[0];

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error inserting student:", error);
    throw error;
  } finally {
    client.release();
  }
};

exports.getAllStudents = async () => { 
  try { 
    const result = await pool.query(
      `SELECT u.id_utilisateur, 
              e.code_apogee AS code_apogee, 
              u.prenom || ' ' || u.nom AS full_name, 
              u.cin, 
              u.email, 
              u.date_creation,
              u.sexe,
              u.status
       FROM public.utilisateur u 
       JOIN public.etudiant e ON u.id_utilisateur = e.id_utilisateur
       WHERE u.my_role = 'etudiant'`
    );
    return result.rows;
  } catch(error) { 
    console.error("Error fetching students:", error); 
    throw error; 
  } 
}

exports.getStudentByCin = async (cin) => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, 
              e.code_apogee AS code_apogee, 
              u.prenom || ' ' || u.nom AS full_name, 
              u.cin, 
              u.email, 
              u.date_creation,
              u.sexe,
              u.status
       FROM public.utilisateur u 
       JOIN public.etudiant e ON u.id_utilisateur = e.id_utilisateur
       WHERE u.cin = $1`,
      [cin]
    );

    if (!result || result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error retrieving student:", error);
    throw error;
  }
};

exports.updateStudentById = async (id, fieldsToUpdate) => {
  try {
    const { nom, prenom, cin, email, code_apogee } = fieldsToUpdate;
    
    if (nom || prenom || cin || email) {
      const userFields = [];
      const userValues = [];
      let idx = 1;
      
      if (nom) { userFields.push(`nom = $${idx++}`); userValues.push(nom); }
      if (prenom) { userFields.push(`prenom = $${idx++}`); userValues.push(prenom); }
      if (cin) { userFields.push(`cin = $${idx++}`); userValues.push(cin); }
      if (email) { userFields.push(`email = $${idx++}`); userValues.push(email); }
      
      if (userFields.length > 0) {
        userValues.push(id);
        await pool.query(
          `UPDATE public.utilisateur SET ${userFields.join(', ')} WHERE id_utilisateur = $${idx}`,
          userValues
        );
      }
    }

    if (code_apogee) {
      await pool.query(
        "UPDATE public.etudiant SET code_apogee = $1 WHERE id_utilisateur = $2",
        [code_apogee, id]
      );
    }

    const result = await pool.query(
      `SELECT u.id_utilisateur, e.code_apogee, u.prenom || ' ' || u.nom AS full_name, u.cin, u.email, u.date_creation, u.sexe, u.status
       FROM public.utilisateur u 
       JOIN public.etudiant e ON u.id_utilisateur = e.id_utilisateur
       WHERE u.id_utilisateur = $1`,
      [id]
    );
    return result.rows[0];

  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

exports.total = async () => {
  try{
    const result = await pool.query(
      "SELECT COUNT(*) AS Total FROM public.etudiant"
    )
    return result.rows[0];
  }catch(error){
    console.error("Error counting students:", error);
    throw error;
  }
}

exports.getStudentsByClass = async (classe) => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, 
              e.code_apogee AS code_apogee, 
              u.prenom || ' ' || u.nom AS full_name, 
              u.cin, 
              u.email, 
              u.date_creation,
              u.sexe,
              u.status
       FROM public.utilisateur u 
       JOIN public.etudiant e ON u.id_utilisateur = e.id_utilisateur
       WHERE e.id_niveau = $1`,
      [classe]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving students by class:", error);
    throw error;
  }
};

exports.getStudentsBySector = async (sector) => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, 
              e.code_apogee AS code_apogee, 
              u.prenom || ' ' || u.nom AS full_name, 
              u.cin, 
              u.email, 
              u.date_creation,
              u.sexe,
              u.status
       FROM public.utilisateur u 
       JOIN public.etudiant e ON u.id_utilisateur = e.id_utilisateur
       WHERE e.id_niveau = $1`,
      [sector]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving students by sector:", error);
    throw error;
  }
};

exports.deleteStudentById = async (id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM public.etudiant WHERE id_utilisateur = $1", [id]);
    const result = await client.query("DELETE FROM public.utilisateur WHERE id_utilisateur = $1 RETURNING *", [id]);

    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting student:", error);
    throw error;
  } finally {
    client.release();
  }
};

exports.activeThisMonth = async () => {
  try {
    const result = await pool.query(
      `SELECT COUNT(*) AS count FROM public.utilisateur 
       WHERE my_role = 'etudiant' 
       AND date_creation >= date_trunc('month', CURRENT_DATE)`
    );
    return result.rows[0].count;
  } catch (error) {
    console.error("Error counting active students this month:", error);
    throw error;
  }
};

exports.registeredToday = async () => {
  try {
    const result = await pool.query(
      `SELECT COUNT(*) AS count FROM public.utilisateur 
       WHERE my_role = 'etudiant' 
       AND date_creation >= CURRENT_DATE`
    );
    return result.rows[0].count;
  } catch (error) {
    console.error("Error counting students registered today:", error);
    throw error;
  }
};

exports.growthRate = async () => {
  try {
    const thisMonthResult = await pool.query(
      `SELECT COUNT(*) AS count FROM public.utilisateur 
       WHERE my_role = 'etudiant' 
       AND date_creation >= date_trunc('month', CURRENT_DATE)`
    );

    const lastMonthResult = await pool.query(
      `SELECT COUNT(*) AS count FROM public.utilisateur 
       WHERE my_role = 'etudiant' 
       AND date_creation >= date_trunc('month', CURRENT_DATE - INTERVAL '1 month')
       AND date_creation < date_trunc('month', CURRENT_DATE)`
    );

    const thisMonth = parseInt(thisMonthResult.rows[0].count);
    const lastMonth = parseInt(lastMonthResult.rows[0].count);

    if (lastMonth === 0) return thisMonth > 0 ? 100 : 0;
    return ((thisMonth - lastMonth) / lastMonth * 100).toFixed(1);
  } catch (error) {
    console.error("Error calculating growth rate:", error);
    throw error;
  }
};

exports.getStudentStats = async () => {
  try {
    // Try new table names (utilisateur, professeur)
    try {
      const totalResult = await pool.query("SELECT COUNT(*) FROM public.utilisateur WHERE my_role = 'etudiant'");
      const total = parseInt(totalResult.rows[0]?.count || 0);

      const activeResult = await pool.query(
        "SELECT COUNT(*) FROM public.utilisateur WHERE my_role = 'etudiant' AND status = 'actif'"
      );
      const active = parseInt(activeResult.rows[0]?.count || 0);

      const inactiveResult = await pool.query(
        "SELECT COUNT(*) FROM public.utilisateur WHERE my_role = 'etudiant' AND status != 'actif'"
      );
      const inactive = parseInt(inactiveResult.rows[0]?.count || 0);

      const maleResult = await pool.query(
        "SELECT COUNT(*) FROM public.utilisateur WHERE my_role = 'etudiant' AND sexe = 'Mr'"
      );
      const male = parseInt(maleResult.rows[0]?.count || 0);

      const femaleResult = await pool.query(
        "SELECT COUNT(*) FROM public.utilisateur WHERE my_role = 'etudiant' AND sexe = 'Mme'"
      );
      const female = parseInt(femaleResult.rows[0]?.count || 0);

      return {
        total, active, inactive, male, female,
        withInternship: 0, withoutInternship: 0,
        growthRate: 0
      };
    } catch (e) {
      console.log('Using fallback student stats');
      return { total: 0, active: 0, inactive: 0, male: 0, female: 0, withInternship: 0, withoutInternship: 0, growthRate: 0 };
    }
  } catch (error) {
    console.error("Error fetching student stats:", error);
    return { total: 0, active: 0, inactive: 0, male: 0, female: 0, withInternship: 0, withoutInternship: 0, growthRate: 0 };
  }
};

exports.getStudentsByClassStats = async () => {
  try {
    const result = await pool.query(
      `SELECT c.id_classe, c.nom_classe, s.id_sector, s.description as sector_name,
              COUNT(DISTINCT e.id_utilisateur) as student_count
       FROM public.class c
       JOIN public.sector s ON c.sector_id = s.id_sector
       LEFT JOIN public.etudiant e ON c.id_classe = e.id_niveau
       GROUP BY c.id_classe, c.nom_classe, s.id_sector, s.description
       ORDER BY student_count DESC`
    );
    return result.rows;
  } catch (error) {
    console.error("Error getting students by class stats:", error);
    throw error;
  }
};

exports.getStudentsBySectorStats = async () => {
  try {
    const result = await pool.query(
      `SELECT s.id_sector, s.description as sector_name,
              COUNT(DISTINCT e.id_utilisateur) as student_count,
              COUNT(DISTINCT c.id_class) as class_count
       FROM public.sector s
       LEFT JOIN public.class c ON s.id_sector = c.sector_id
       LEFT JOIN public.etudiant e ON c.id_classe = e.id_niveau
       GROUP BY s.id_sector, s.description
       ORDER BY student_count DESC`
    );
    return result.rows;
  } catch (error) {
    console.error("Error getting students by sector stats:", error);
    throw error;
  }
};
