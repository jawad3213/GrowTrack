const pool = require("../../config/db");

exports.createProfessor = async (id_user, name, cin, email, pass, departement, courses, code, classes, note, role, imagePath) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const result = await client.query(
      `INSERT INTO public.utilisateur (
         id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status
       ) VALUES ($1, $2, $3, $4, $5, $6, 'prof', NOW(), 'Mr', 'actif')`,
      [id_user, name.split(' ').slice(1).join(' '), name.split(' ')[0], cin, email, pass]
    );

    await client.query(
      `INSERT INTO public.professeur (
         id_utilisateur, code, departement, status_contrat
       ) VALUES ($1, $2, $3, 'titulaire')`,
      [id_user, code, departement]
    );

    for (let i = 0; i < classes.length; i++) {
      await client.query(
        `INSERT INTO public.enseigne (
           id_utilisateur, id_classe, matiere
         ) VALUES ($1, $2, $3)`,
        [id_user, classes[i], courses[i]]
      );
    }

    await client.query('COMMIT');
    return result.rows[0];

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error inserting professor:", error);
    throw error;
  } finally {
    client.release();
  }
};

exports.getAllProfessor = async () => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, u.date_creation, u.sexe, u.status,
              p.code, p.departement, p.status_contrat
       FROM public.utilisateur u
       JOIN public.professeur p ON u.id_utilisateur = p.id_utilisateur`
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching professors:", error);
    throw error;
  }
};

exports.getProfessorByCin = async (cin) => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, u.date_creation, u.sexe, u.status,
              p.code, p.departement, p.status_contrat
       FROM public.utilisateur u
       JOIN public.professeur p ON u.id_utilisateur = p.id_utilisateur
       WHERE u.cin = $1`,
      [cin]
    );

    if (!result || result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error retrieving professor:", error);
    throw error;
  }
};

exports.getProfessorById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, u.date_creation, u.sexe, u.status,
              p.code, p.departement, p.status_contrat
       FROM public.utilisateur u
       JOIN public.professeur p ON u.id_utilisateur = p.id_utilisateur
       WHERE u.id_utilisateur = $1`,
      [id]
    );

    if (!result || result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error retrieving professor:", error);
    throw error;
  }
};

exports.updateProfessorById = async (id, fieldsToUpdate) => {
  try {
    const { nom, prenom, cin, email, departement, code, status_contrat } = fieldsToUpdate;
    
    if (nom || prenom || cin || email) {
      const memberFields = [];
      const memberValues = [];
      let idx = 1;
      
      if (nom) { memberFields.push(`nom = $${idx++}`); memberValues.push(nom); }
      if (prenom) { memberFields.push(`prenom = $${idx++}`); memberValues.push(prenom); }
      if (cin) { memberFields.push(`cin = $${idx++}`); memberValues.push(cin); }
      if (email) { memberFields.push(`email = $${idx++}`); memberValues.push(email); }
      
      if (memberFields.length > 0) {
        memberValues.push(id);
        await pool.query(
          `UPDATE public.utilisateur SET ${memberFields.join(', ')} WHERE id_utilisateur = $${idx}`,
          memberValues
        );
      }
    }

    if (departement || code || status_contrat) {
      const profFields = [];
      const profValues = [];
      let idx = 1;
      
      if (departement) { profFields.push(`departement = $${idx++}`); profValues.push(departement); }
      if (code) { profFields.push(`code = $${idx++}`); profValues.push(code); }
      if (status_contrat) { profFields.push(`status_contrat = $${idx++}`); profValues.push(status_contrat); }
      
      if (profFields.length > 0) {
        profValues.push(id);
        await pool.query(
          `UPDATE public.professeur SET ${profFields.join(', ')} WHERE id_utilisateur = $${idx}`,
          profValues
        );
      }
    }

    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, u.date_creation, u.sexe, u.status,
              p.code, p.departement, p.status_contrat
       FROM public.utilisateur u
       JOIN public.professeur p ON u.id_utilisateur = p.id_utilisateur
       WHERE u.id_utilisateur = $1`,
      [id]
    );
    return result.rows[0];

  } catch (error) {
    console.error("Error updating professor:", error);
    throw error;
  }
};

exports.deleteProfessorById = async (id) => {
  try {
    await pool.query("DELETE FROM public.enseigne WHERE id_utilisateur = $1", [id]);
    await pool.query("DELETE FROM public.professeur WHERE id_utilisateur = $1", [id]);
    const result = await pool.query("DELETE FROM public.utilisateur WHERE id_utilisateur = $1", [id]);
    return result;
  } catch (error) {
    console.error("Error deleting professor:", error);
    throw error;
  }
};

exports.total = async () => {
  try {
    const result = await pool.query("SELECT COUNT(*) AS Total FROM public.professeur");
    return result.rows[0];
  } catch (error) {
    console.error("Error retrieving total professors:", error);
    throw error;
  }
};

exports.getProfessorsByClass = async (classe) => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, p.code, p.departement
       FROM public.utilisateur u
       JOIN public.professeur p ON u.id_utilisateur = p.id_utilisateur
       JOIN public.enseigne e ON u.id_utilisateur = e.id_utilisateur
       WHERE e.id_classe = $1`,
      [classe]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving professors by class:", error);
    throw error;
  }
};

exports.getStudentsBySector = async (sector) => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, p.code, p.departement
       FROM public.utilisateur u
       JOIN public.professeur p ON u.id_utilisateur = p.id_utilisateur
       JOIN public.enseigne e ON u.id_utilisateur = e.id_utilisateur
       JOIN public.classe c ON e.id_classe = c.id_classe
       WHERE c.id_filiere = $1`,
      [sector]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving professors by sector:", error);
    throw error;
  }
};

exports.getProfessorsBySector = async (sector) => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, p.code, p.departement
       FROM public.utilisateur u
       JOIN public.professeur p ON u.id_utilisateur = p.id_utilisateur
       JOIN public.enseigne e ON u.id_utilisateur = e.id_utilisateur
       JOIN public.classe c ON e.id_classe = c.id_classe
       WHERE c.id_filiere = $1`,
      [sector]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving professors by sector:", error);
    throw error;
  }
};

exports.uniqueDepartments = async () => {
  try {
    const result = await pool.query(
      `SELECT COUNT(DISTINCT departement) AS count FROM public.professeur`
    );
    return result.rows[0].count;
  } catch (error) {
    console.error("Error counting unique departments:", error);
    throw error;
  }
};

exports.activeThisMonth = async () => {
  try {
    const result = await pool.query(
      `SELECT COUNT(*) AS count FROM public.utilisateur 
       WHERE my_role = 'prof' 
       AND date_creation >= date_trunc('month', CURRENT_DATE)`
    );
    return result.rows[0].count;
  } catch (error) {
    console.error("Error counting active professors this month:", error);
    throw error;
  }
};

exports.contractCount = async () => {
  try {
    const result = await pool.query(
      `SELECT COUNT(*) AS count FROM public.professeur WHERE status_contrat = 'titulaire'`
    );
    return result.rows[0].count;
  } catch (error) {
    console.error("Error counting contract professors:", error);
    throw error;
  }
};

exports.getProfessorStats = async () => {
  try {
    const totalResult = await pool.query("SELECT COUNT(*) FROM public.professeur");
    const total = parseInt(totalResult.rows[0].count);

    const activeResult = await pool.query(
      "SELECT COUNT(*) FROM public.professeur p JOIN public.utilisateur u ON p.id_utilisateur = u.id_utilisateur WHERE u.status = 'actif'"
    );
    const active = parseInt(activeResult.rows[0].count);

    const inactiveResult = await pool.query(
      "SELECT COUNT(*) FROM public.professeur p JOIN public.utilisateur u ON p.id_utilisateur = u.id_utilisateur WHERE u.status != 'actif'"
    );
    const inactive = parseInt(inactiveResult.rows[0].count);

    const deptResult = await pool.query("SELECT COUNT(DISTINCT departement) as count FROM public.professeur");
    const departments = parseInt(deptResult.rows[0].count);

    const contractResult = await pool.query("SELECT COUNT(*) FROM public.professeur WHERE status_contrat = 'titulaire'");
    const contractCount = parseInt(contractResult.rows[0].count);

    const vacataireResult = await pool.query("SELECT COUNT(*) FROM public.professeur WHERE status_contrat = 'vacataire'");
    const vacataireCount = parseInt(vacataireResult.rows[0].count);

    const coursesResult = await pool.query("SELECT COUNT(DISTINCT matiere) as count FROM public.enseigne");
    const coursesTaught = parseInt(coursesResult.rows[0].count);

    const classesResult = await pool.query("SELECT COUNT(DISTINCT id_classe) as count FROM public.enseigne");
    const classesAssigned = parseInt(classesResult.rows[0].count);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const recentResult = await pool.query(
      `SELECT COUNT(*) FROM public.utilisateur 
       WHERE my_role = 'prof' 
       AND EXTRACT(YEAR FROM date_creation) = $1
       AND EXTRACT(MONTH FROM date_creation) = $2`,
      [currentYear, currentMonth]
    );
    const thisMonth = parseInt(recentResult.rows[0].count);

    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const lastMonthResult = await pool.query(
      `SELECT COUNT(*) FROM public.utilisateur 
       WHERE my_role = 'prof' 
       AND EXTRACT(YEAR FROM date_creation) = $1
       AND EXTRACT(MONTH FROM date_creation) = $2`,
      [lastMonthYear, lastMonth]
    );
    const lastMonthCount = parseInt(lastMonthResult.rows[0].count);

    const growthRate = lastMonthCount === 0 ? (thisMonth > 0 ? 100 : 0) : 
      parseFloat(((thisMonth - lastMonthCount) / lastMonthCount * 100).toFixed(1));

    return {
      total,
      active,
      inactive,
      departments,
      contractCount,
      vacataireCount,
      coursesTaught,
      classesAssigned,
      thisMonth,
      growthRate
    };
  } catch (error) {
    console.error("Error getting professor stats:", error);
    throw error;
  }
};

exports.getProfessorsByDepartment = async () => {
  try {
    const result = await pool.query(
      `SELECT departement, COUNT(*) as professor_count
       FROM public.professeur
       GROUP BY departement
       ORDER BY professor_count DESC`
    );
    return result.rows;
  } catch (error) {
    console.error("Error getting professors by department:", error);
    throw error;
  }
};

exports.getProfessorsWorkload = async () => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.nom, u.prenom, p.departement,
              COUNT(DISTINCT e.id_classe) as classes_count,
              COUNT(DISTINCT e.matiere) as courses_count
       FROM public.utilisateur u
       JOIN public.professeur p ON u.id_utilisateur = p.id_utilisateur
       LEFT JOIN public.enseigne e ON u.id_utilisateur = e.id_utilisateur
       GROUP BY u.id_utilisateur, u.nom, u.prenom, p.departement
       ORDER BY classes_count DESC`
    );
    return result.rows;
  } catch (error) {
    console.error("Error getting professors workload:", error);
    throw error;
  }
};
