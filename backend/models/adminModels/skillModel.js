const pool = require("../../config/db");

exports.createSkill = async (skill_name, question1, question2, question3, description_skill, id_admin) => {
  try {
    const result = await pool.query(
      `INSERT INTO public.competence (
         nom_competence, question1, question2, question3, description_competence
       ) VALUES ($1, $2, $3, $4, $5)`,
      [skill_name, question1, question2, question3, description_skill]
    );

    return result.rows[0];

  } catch (error) {
    console.error("Error inserting skill:", error);
    throw error;
  }
};

exports.getAllSkills = async () => {
  try {
    const result = await pool.query(
      `SELECT id_competence, nom_competence, description_competence, question1, question2, question3
       FROM public.competence`
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};

exports.updateSkillById = async (skillName, fieldsToUpdate) => {
  try {
    const { nom_competence, description_competence, question1, question2, question3 } = fieldsToUpdate;
    
    const fields = [];
    const values = [];
    let idx = 1;
    
    if (nom_competence) { fields.push(`nom_competence = $${idx++}`); values.push(nom_competence); }
    if (description_competence) { fields.push(`description_competence = $${idx++}`); values.push(description_competence); }
    if (question1) { fields.push(`question1 = $${idx++}`); values.push(question1); }
    if (question2) { fields.push(`question2 = $${idx++}`); values.push(question2); }
    if (question3) { fields.push(`question3 = $${idx++}`); values.push(question3); }
    
    if (fields.length > 0) {
      values.push(skillName);
      const query = `UPDATE public.competence SET ${fields.join(', ')} WHERE nom_competence = $${idx} RETURNING *`;
      const result = await pool.query(query, values);
      return result.rows[0];
    }
    
    return null;
  } catch (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
};

exports.deleteSkillById = async (skillName) => {
  try {
    const result = await pool.query(
      "DELETE FROM public.competence WHERE nom_competence = $1",
      [skillName]
    );
    return result;
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
};

exports.total = async () => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS total FROM public.competence"
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error retrieving total skills:", error);
    throw error;
  }
};

exports.getSkillStats = async () => {
  try {
    const totalResult = await pool.query("SELECT COUNT(*) FROM public.competence");
    const total = parseInt(totalResult.rows[0].count);

    const evaluationResult = await pool.query("SELECT COUNT(*) FROM public.skill_evaluation");
    const totalEvaluations = parseInt(evaluationResult.rows[0].count);

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const thisMonthResult = await pool.query(
      `SELECT COUNT(*) FROM public.skill_evaluation 
       WHERE EXTRACT(MONTH FROM date_add) = $1 AND EXTRACT(YEAR FROM date_add) = $2`,
      [currentMonth, currentYear]
    );
    const thisMonthEvaluations = parseInt(thisMonthResult.rows[0].count);

    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const lastMonthResult = await pool.query(
      `SELECT COUNT(*) FROM public.skill_evaluation 
       WHERE EXTRACT(MONTH FROM date_add) = $1 AND EXTRACT(YEAR FROM date_add) = $2`,
      [lastMonth, lastMonthYear]
    );
    const lastMonthEvaluations = parseInt(lastMonthResult.rows[0].count);

    const growthRate = lastMonthEvaluations === 0 ? (thisMonthEvaluations > 0 ? 100 : 0) : 
      parseFloat(((thisMonthEvaluations - lastMonthEvaluations) / lastMonthEvaluations * 100).toFixed(1));

    const pairResult = await pool.query(
      "SELECT COUNT(*) FROM public.skill_evaluation WHERE type_evaluation = 'Pair'"
    );
    const pairCount = parseInt(pairResult.rows[0].count);

    const selfResult = await pool.query(
      "SELECT COUNT(*) FROM public.skill_evaluation WHERE type_evaluation = 'Self'"
    );
    const selfCount = parseInt(selfResult.rows[0].count);

    const supervisorResult = await pool.query(
      "SELECT COUNT(*) FROM public.skill_evaluation WHERE type_evaluation = 'Supervisor'"
    );
    const supervisorCount = parseInt(supervisorResult.rows[0].count);

    const professorResult = await pool.query(
      "SELECT COUNT(*) FROM public.skill_evaluation WHERE type_evaluation = 'Professor'"
    );
    const professorCount = parseInt(professorResult.rows[0].count);

    return {
      totalSkills: total,
      totalEvaluations,
      thisMonthEvaluations,
      growthRate,
      pairCount,
      selfCount,
      supervisorCount,
      professorCount
    };
  } catch (error) {
    console.error("Error getting skill stats:", error);
    throw error;
  }
};

exports.getEvaluationStats = async () => {
  try {
    const totalResult = await pool.query("SELECT COUNT(*) FROM public.evaluation");
    const total = parseInt(totalResult.rows[0].count);

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const thisMonthResult = await pool.query(
      `SELECT COUNT(*) FROM public.evaluation 
       WHERE EXTRACT(MONTH FROM date_soumis) = $1 AND EXTRACT(YEAR FROM date_soumis) = $2`,
      [currentMonth, currentYear]
    );
    const thisMonth = parseInt(thisMonthResult.rows[0].count);

    const submittedResult = await pool.query(
      "SELECT COUNT(*) FROM public.evaluation WHERE etat = 'soumis'"
    );
    const submitted = parseInt(submittedResult.rows[0].count);

    const draftResult = await pool.query(
      "SELECT COUNT(*) FROM public.evaluation WHERE etat = 'brouillon'"
    );
    const draft = parseInt(draftResult.rows[0].count);

    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const lastMonthResult = await pool.query(
      `SELECT COUNT(*) FROM public.evaluation 
       WHERE EXTRACT(MONTH FROM date_soumis) = $1 AND EXTRACT(YEAR FROM date_soumis) = $2`,
      [lastMonth, lastMonthYear]
    );
    const lastMonthCount = parseInt(lastMonthResult.rows[0].count);

    const growthRate = lastMonthCount === 0 ? (thisMonth > 0 ? 100 : 0) : 
      parseFloat(((thisMonth - lastMonthCount) / lastMonthCount * 100).toFixed(1));

    const byTypeResult = await pool.query(
      `SELECT type, COUNT(*) as count FROM public.evaluation GROUP BY type`
    );
    const byType = byTypeResult.rows;

    return {
      total,
      thisMonth,
      submitted,
      draft,
      growthRate,
      byType
    };
  } catch (error) {
    console.error("Error getting evaluation stats:", error);
    throw error;
  }
};

exports.getSignalStats = async () => {
  try {
    const totalResult = await pool.query("SELECT COUNT(*) FROM public.signal");
    const total = parseInt(totalResult.rows[0].count);

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const thisMonthResult = await pool.query(
      `SELECT COUNT(*) FROM public.signal 
       WHERE EXTRACT(MONTH FROM date_add_signal) = $1 AND EXTRACT(YEAR FROM date_add_signal) = $2`,
      [currentMonth, currentYear]
    );
    const thisMonth = parseInt(thisMonthResult.rows[0].count);

    const resolvedResult = await pool.query(
      "SELECT COUNT(*) FROM public.signal WHERE etat = 'traite'"
    );
    const resolved = parseInt(resolvedResult.rows[0].count);

    const pendingResult = await pool.query(
      "SELECT COUNT(*) FROM public.signal WHERE etat = 'non_traite'"
    );
    const pending = parseInt(pendingResult.rows[0].count);

    const byTypeResult = await pool.query(
      `SELECT type_signal, COUNT(*) as count FROM public.signal GROUP BY type_signal`
    );
    const byType = byTypeResult.rows;

    return {
      total,
      thisMonth,
      resolved,
      pending,
      byType
    };
  } catch (error) {
    console.error("Error getting signal stats:", error);
    throw error;
  }
};
