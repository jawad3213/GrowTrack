const pool = require("../../config/db");

exports.createSupervisor = async (id_user, name, cin_supervisor, email, pass, company, number, position, cin_student, date_start, date_done, subject, note, role, imagePath) => {
  try {
    const result = await pool.query(
      `INSERT INTO public.utilisateur (
         id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status
       ) VALUES ($1, $2, $3, $4, $5, $6, 'superviseur', NOW(), 'Mr', 'actif')`,
      [id_user, name.split(' ').slice(1).join(' '), name.split(' ')[0], cin_supervisor, email, pass]
    );

    const internship = await pool.query(
      `INSERT INTO public.stage (
         debut_stage, fin_stage, sujet_stage
      ) VALUES ($1, $2, $3) RETURNING id_stage`,
      [date_start, date_done, subject]
    );

    await pool.query(
      `INSERT INTO public.superviseur (
         id_utilisateur, numero_de_matricule, nom_de_entreprise, my_position, id_stage
      ) VALUES ($1, $2, $3, $4, $5)`,
      [id_user, number, company, position, internship.rows[0].id_stage]
    );

    return result.rows[0];

  } catch (error) {
    console.error("Error inserting supervisor:", error);
    throw error;
  }
};

exports.getAllSupervisors = async () => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, u.date_creation, u.sexe, u.status,
              s.numero_de_matricule, s.nom_de_entreprise, s.my_position, s.id_stage,
              st.debut_stage, st.fin_stage, st.sujet_stage
       FROM public.utilisateur u
       JOIN public.superviseur s ON u.id_utilisateur = s.id_utilisateur
       LEFT JOIN public.stage st ON s.id_stage = st.id_stage`
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching supervisors:", error);
    throw error;
  }
};

exports.getSupervisorByCin = async (cin) => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, u.date_creation, u.sexe, u.status,
              s.numero_de_matricule, s.nom_de_entreprise, s.my_position, s.id_stage,
              st.debut_stage, st.fin_stage, st.sujet_stage
       FROM public.utilisateur u
       JOIN public.superviseur s ON u.id_utilisateur = s.id_utilisateur
       LEFT JOIN public.stage st ON s.id_stage = st.id_stage
       WHERE u.cin = $1`,
      [cin]
    );

    if (!result || result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error retrieving supervisor:", error);
    throw error;
  }
};

exports.getSupervisorById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, u.date_creation, u.sexe, u.status,
              s.numero_de_matricule, s.nom_de_entreprise, s.my_position, s.id_stage,
              st.debut_stage, st.fin_stage, st.sujet_stage
       FROM public.utilisateur u
       JOIN public.superviseur s ON u.id_utilisateur = s.id_utilisateur
       LEFT JOIN public.stage st ON s.id_stage = st.id_stage
       WHERE u.id_utilisateur = $1`,
      [id]
    );

    if (!result || result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error retrieving supervisor:", error);
    throw error;
  }
};

exports.updateSupervisorById = async (id, fieldsToUpdate) => {
  try {
    const { nom, prenom, cin, email, numero_de_matricule, nom_de_entreprise, my_position, debut_stage, fin_stage, sujet_stage } = fieldsToUpdate;
    
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

    if (numero_de_matricule || nom_de_entreprise || my_position) {
      const supervFields = [];
      const supervValues = [];
      let idx = 1;
      
      if (numero_de_matricule) { supervFields.push(`numero_de_matricule = $${idx++}`); supervValues.push(numero_de_matricule); }
      if (nom_de_entreprise) { supervFields.push(`nom_de_entreprise = $${idx++}`); supervValues.push(nom_de_entreprise); }
      if (my_position) { supervFields.push(`my_position = $${idx++}`); supervValues.push(my_position); }
      
      if (supervFields.length > 0) {
        supervValues.push(id);
        await pool.query(
          `UPDATE public.superviseur SET ${supervFields.join(', ')} WHERE id_utilisateur = $${idx}`,
          supervValues
        );
      }
    }

    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, u.date_creation, u.sexe, u.status,
              s.numero_de_matricule, s.nom_de_entreprise, s.my_position, s.id_stage
       FROM public.utilisateur u
       JOIN public.superviseur s ON u.id_utilisateur = s.id_utilisateur
       WHERE u.id_utilisateur = $1`,
      [id]
    );
    return result.rows[0];

  } catch (error) {
    console.error("Error updating supervisor:", error);
    throw error;
  }
};

exports.deleteSupervisorById = async (id) => {
  try {
    const superviseur = await pool.query("SELECT id_stage FROM public.superviseur WHERE id_utilisateur = $1", [id]);
    const id_stage = superviseur.rows[0]?.id_stage;
    
    await pool.query("DELETE FROM public.superviseur WHERE id_utilisateur = $1", [id]);
    await pool.query("DELETE FROM public.utilisateur WHERE id_utilisateur = $1", [id]);
    
    if (id_stage) {
      await pool.query("DELETE FROM public.stage WHERE id_stage = $1", [id_stage]);
    }
    
    return { rowCount: 1 };
  } catch (error) {
    console.error("Error deleting supervisor:", error);
    throw error;
  }
};

exports.total = async () => {
  try {
    const result = await pool.query("SELECT COUNT(*) AS total FROM public.superviseur");
    return result.rows[0];
  } catch (error) {
    console.error("Error retrieving total supervisors:", error);
    throw error;
  }
};

exports.getSupervisorsByPosition = async (position) => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, u.date_creation, u.sexe, u.status,
              s.numero_de_matricule, s.nom_de_entreprise, s.my_position
       FROM public.utilisateur u
       JOIN public.superviseur s ON u.id_utilisateur = s.id_utilisateur
       WHERE s.my_position = $1`,
      [position]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving supervisors by position:", error);
    throw error;
  }
};

exports.getSupervisorsByCompany = async (company) => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, u.date_creation, u.sexe, u.status,
              s.numero_de_matricule, s.nom_de_entreprise, s.my_position
       FROM public.utilisateur u
       JOIN public.superviseur s ON u.id_utilisateur = s.id_utilisateur
       WHERE s.nom_de_entreprise = $1`,
      [company]
    );
    return result.rows;
  } catch (error) {
    console.error("Error retrieving supervisors by company:", error);
    throw error;
  }
};

exports.uniqueCompanies = async () => {
  try {
    const result = await pool.query(
      `SELECT COUNT(DISTINCT nom_de_entreprise) AS count FROM public.superviseur`
    );
    return result.rows[0].count;
  } catch (error) {
    console.error("Error counting unique companies:", error);
    throw error;
  }
};

exports.uniquePositions = async () => {
  try {
    const result = await pool.query(
      `SELECT COUNT(DISTINCT my_position) AS count FROM public.superviseur`
    );
    return result.rows[0].count;
  } catch (error) {
    console.error("Error counting unique positions:", error);
    throw error;
  }
};

exports.addedThisMonth = async () => {
  try {
    const result = await pool.query(
      `SELECT COUNT(*) AS count FROM public.utilisateur 
       WHERE my_role = 'superviseur' 
       AND date_creation >= date_trunc('month', CURRENT_DATE)`
    );
    return result.rows[0].count;
  } catch (error) {
    console.error("Error counting supervisors added this month:", error);
    throw error;
  }
};

exports.getSupervisorStats = async () => {
  try {
    const totalResult = await pool.query("SELECT COUNT(*) FROM public.superviseur");
    const total = parseInt(totalResult.rows[0].count);

    const activeResult = await pool.query(
      "SELECT COUNT(*) FROM public.superviseur s JOIN public.utilisateur u ON s.id_utilisateur = u.id_utilisateur WHERE u.status = 'actif'"
    );
    const active = parseInt(activeResult.rows[0].count);

    const inactiveResult = await pool.query(
      "SELECT COUNT(*) FROM public.superviseur s JOIN public.utilisateur u ON s.id_utilisateur = u.id_utilisateur WHERE u.status != 'actif'"
    );
    const inactive = parseInt(inactiveResult.rows[0].count);

    const companyResult = await pool.query("SELECT COUNT(DISTINCT nom_de_entreprise) as count FROM public.superviseur");
    const companies = parseInt(companyResult.rows[0].count);

    const positionResult = await pool.query("SELECT COUNT(DISTINCT my_position) as count FROM public.superviseur");
    const positions = parseInt(positionResult.rows[0].count);

    const studentsResult = await pool.query("SELECT COUNT(DISTINCT id_etudiant) as count FROM public.stage");
    const supervisedStudents = parseInt(studentsResult.rows[0].count);

    const activeStagesResult = await pool.query(
      `SELECT COUNT(*) FROM public.stage 
       WHERE debut_stage <= CURRENT_DATE 
       AND (fin_stage IS NULL OR fin_stage >= CURRENT_DATE)`
    );
    const activeInternships = parseInt(activeStagesResult.rows[0].count);

    const completedStagesResult = await pool.query(
      `SELECT COUNT(*) FROM public.stage 
       WHERE fin_stage < CURRENT_DATE`
    );
    const completedInternships = parseInt(completedStagesResult.rows[0].count);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const recentResult = await pool.query(
      `SELECT COUNT(*) FROM public.utilisateur 
       WHERE my_role = 'superviseur' 
       AND EXTRACT(YEAR FROM date_creation) = $1
       AND EXTRACT(MONTH FROM date_creation) = $2`,
      [currentYear, currentMonth]
    );
    const thisMonth = parseInt(recentResult.rows[0].count);

    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const lastMonthResult = await pool.query(
      `SELECT COUNT(*) FROM public.utilisateur 
       WHERE my_role = 'superviseur' 
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
      companies,
      positions,
      supervisedStudents,
      activeInternships,
      completedInternships,
      thisMonth,
      growthRate
    };
  } catch (error) {
    console.error("Error getting supervisor stats:", error);
    throw error;
  }
};

exports.getSupervisorsByCompany = async () => {
  try {
    const result = await pool.query(
      `SELECT nom_de_entreprise, COUNT(*) as supervisor_count,
              COUNT(DISTINCT my_position) as position_count
       FROM public.superviseur
       GROUP BY nom_de_entreprise
       ORDER BY supervisor_count DESC`
    );
    return result.rows;
  } catch (error) {
    console.error("Error getting supervisors by company:", error);
    throw error;
  }
};

exports.getSupervisorsByPosition = async () => {
  try {
    const result = await pool.query(
      `SELECT my_position, COUNT(*) as supervisor_count,
              COUNT(DISTINCT nom_de_entreprise) as company_count
       FROM public.superviseur
       GROUP BY my_position
       ORDER BY supervisor_count DESC`
    );
    return result.rows;
  } catch (error) {
    console.error("Error getting supervisors by position:", error);
    throw error;
  }
};

exports.getInternshipStats = async () => {
  try {
    const totalResult = await pool.query("SELECT COUNT(*) FROM public.stage");
    const total = parseInt(totalResult.rows[0].count);

    const activeResult = await pool.query(
      `SELECT COUNT(*) FROM public.stage 
       WHERE debut_stage <= CURRENT_DATE 
       AND (fin_stage IS NULL OR fin_stage >= CURRENT_DATE)`
    );
    const active = parseInt(activeResult.rows[0].count);

    const completedResult = await pool.query(
      `SELECT COUNT(*) FROM public.stage WHERE fin_stage < CURRENT_DATE`
    );
    const completed = parseInt(completedResult.rows[0].count);

    const upcomingResult = await pool.query(
      `SELECT COUNT(*) FROM public.stage WHERE debut_stage > CURRENT_DATE`
    );
    const upcoming = parseInt(upcomingResult.rows[0].count);

    const currentYear = new Date().getFullYear();
    const thisYearResult = await pool.query(
      `SELECT COUNT(*) FROM public.stage WHERE EXTRACT(YEAR FROM debut_stage) = $1`,
      [currentYear]
    );
    const thisYear = parseInt(thisYearResult.rows[0].count);

    return {
      total,
      active,
      completed,
      upcoming,
      thisYear
    };
  } catch (error) {
    console.error("Error getting internship stats:", error);
    throw error;
  }
};
