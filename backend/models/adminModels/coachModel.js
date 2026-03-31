const pool = require("../../config/db");

exports.createCoach = async (id_user, name, cin, email, pass, field, note, role) => {
  try {
    const result = await pool.query(
      `INSERT INTO public.utilisateur (
         id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status
       ) VALUES ($1, $2, $3, $4, $5, $6, 'coach', NOW(), 'Mr', 'actif')`,
      [id_user, name.split(' ').slice(1).join(' '), name.split(' ')[0], cin, email, pass]
    );

    await pool.query(
      `INSERT INTO public.coach (
         id_utilisateur, coach_code, specialisation_domaine, description_domaine
       ) VALUES ($1, $2, $3, $4)`,
      [id_user, 'COACH' + Date.now(), field, note]
    );

    return result.rows[0];

  } catch (error) {
    console.error("Error inserting coach:", error);
    throw error;
  }
};

exports.getAllCoach = async () => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, u.date_creation, u.sexe, u.status,
              c.coach_code, c.specialisation_domaine, c.description_domaine
       FROM public.utilisateur u
       JOIN public.coach c ON u.id_utilisateur = c.id_utilisateur`
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching coaches:", error);
    throw error;
  }
};

exports.getCoachByCin = async (cin) => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, u.date_creation, u.sexe, u.status,
              c.coach_code, c.specialisation_domaine, c.description_domaine
       FROM public.utilisateur u
       JOIN public.coach c ON u.id_utilisateur = c.id_utilisateur
       WHERE u.cin = $1`,
      [cin]
    );

    if (!result || result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error retrieving coach by CIN:", error);
    throw error;
  }
};

exports.updateCoachById = async (id, fieldsToUpdate) => {
  try {
    const { nom, prenom, cin, email, specialisation_domaine, description_domaine } = fieldsToUpdate;
    
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

    if (specialisation_domaine || description_domaine) {
      const coachFields = [];
      const coachValues = [];
      let idx = coachValues.length + 1;
      
      if (specialisation_domaine) { coachFields.push(`specialisation_domaine = $${idx++}`); coachValues.push(specialisation_domaine); }
      if (description_domaine) { coachFields.push(`description_domaine = $${idx++}`); coachValues.push(description_domaine); }
      
      if (coachFields.length > 0) {
        coachValues.push(id);
        await pool.query(
          `UPDATE public.coach SET ${coachFields.join(', ')} WHERE id_utilisateur = $${coachValues.length}`,
          coachValues
        );
      }
    }

    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, u.date_creation, u.sexe, u.status,
              c.coach_code, c.specialisation_domaine, c.description_domaine
       FROM public.utilisateur u
       JOIN public.coach c ON u.id_utilisateur = c.id_utilisateur
       WHERE u.id_utilisateur = $1`,
      [id]
    );
    return result.rows[0];

  } catch (error) {
    console.error("Error updating coach:", error);
    throw error;
  }
};

exports.deleteCoachById = async (id) => {
  try {
    await pool.query("DELETE FROM public.coach WHERE id_utilisateur = $1", [id]);
    const result = await pool.query("DELETE FROM public.utilisateur WHERE id_utilisateur = $1", [id]);
    return result;
  } catch (error) {
    console.error("Error deleting coach:", error);
    throw error;
  }
};

exports.total = async () => {
  try {
    const result = await pool.query("SELECT COUNT(*) AS Total FROM public.coach");
    return result.rows[0];
  } catch (error) {
    console.error("Error retrieving coach count:", error);
    throw error;
  }
};

exports.getCoachById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT u.id_utilisateur, u.cin, u.nom, u.prenom, u.email, u.date_creation, u.sexe, u.status,
              c.coach_code, c.specialisation_domaine, c.description_domaine
       FROM public.utilisateur u
       JOIN public.coach c ON u.id_utilisateur = c.id_utilisateur
       WHERE u.id_utilisateur = $1`,
      [id]
    );

    if (!result || result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error retrieving coach by id:", error);
    throw error;
  }
};
