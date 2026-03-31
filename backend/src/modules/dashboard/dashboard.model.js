const pool = require("../../config/database");

exports.getAdminStats = async () => {
  const studentCount = await pool.query("SELECT COUNT(*) as count FROM etudiant");
  const professorCount = await pool.query("SELECT COUNT(*) as count FROM professeur");
  const coachCount = await pool.query("SELECT COUNT(*) as count FROM coach");
  const supervisorCount = await pool.query("SELECT COUNT(*) as count FROM superviseur");
  const skillCount = await pool.query("SELECT COUNT(*) as count FROM competence");
  const evaluationCount = await pool.query("SELECT COUNT(*) as count FROM evaluation");
  const signalCount = await pool.query("SELECT COUNT(*) as count FROM signal WHERE status = 'en_attente'");
  const projectCount = await pool.query("SELECT COUNT(*) as count FROM projet WHERE status = 'en_cours'");

  return {
    students: parseInt(studentCount.rows[0].count),
    professors: parseInt(professorCount.rows[0].count),
    coaches: parseInt(coachCount.rows[0].count),
    supervisors: parseInt(supervisorCount.rows[0].count),
    skills: parseInt(skillCount.rows[0].count),
    evaluations: parseInt(evaluationCount.rows[0].count),
    pendingSignals: parseInt(signalCount.rows[0].count),
    activeProjects: parseInt(projectCount.rows[0].count),
  };
};

exports.getProfessorStats = async (professorId) => {
  const studentCount = await pool.query(
    "SELECT COUNT(DISTINCT e.id_etudiant) as count FROM etudiant e JOIN evaluation ev ON e.id_etudiant = ev.id_etudiant WHERE ev.id_professeur = $1",
    [professorId]
  );
  const evaluationCount = await pool.query(
    "SELECT COUNT(*) as count FROM evaluation WHERE id_professeur = $1",
    [professorId]
  );
  const projectCount = await pool.query(
    "SELECT COUNT(*) as count FROM projet WHERE id_professeur = $1 AND status = 'en_cours'",
    [professorId]
  );
  const signalCount = await pool.query(
    "SELECT COUNT(*) as count FROM signal WHERE id_professeur = $1 AND status = 'en_attente'",
    [professorId]
  );

  return {
    students: parseInt(studentCount.rows[0].count),
    evaluations: parseInt(evaluationCount.rows[0].count),
    activeProjects: parseInt(projectCount.rows[0].count),
    pendingSignals: parseInt(signalCount.rows[0].count),
  };
};

exports.getStudentStats = async (studentId) => {
  const evaluationCount = await pool.query(
    "SELECT COUNT(*) as count FROM evaluation WHERE id_etudiant = $1",
    [studentId]
  );
  const projectCount = await pool.query(
    "SELECT COUNT(*) as count FROM projet WHERE id_etudiant = $1 AND status = 'en_cours'",
    [studentId]
  );
  const signalCount = await pool.query(
    "SELECT COUNT(*) as count FROM signal WHERE id_etudiant = $1 AND status != 'resolu'",
    [studentId]
  );

  return {
    evaluations: parseInt(evaluationCount.rows[0].count),
    activeProjects: parseInt(projectCount.rows[0].count),
    activeSignals: parseInt(signalCount.rows[0].count),
  };
};

exports.getRecentActivities = async (activityLimit = 10) => {
  const evaluations = await pool.query(
    `SELECT ev.date_evaluation as date, 'evaluation' as type, e.nom, e.prenom 
     FROM evaluation ev 
     JOIN etudiant e ON ev.id_etudiant = e.id_etudiant 
     ORDER BY ev.date_evaluation DESC LIMIT $1`,
    [activityLimit]
  );

  const signals = await pool.query(
    `SELECT s.date_signal as date, 'signal' as type, e.nom, e.prenom 
     FROM signal s 
     JOIN etudiant e ON s.id_etudiant = e.id_etudiant 
     ORDER BY s.date_signal DESC LIMIT $1`,
    [activityLimit]
  );

  return [...evaluations.rows, ...signals.rows].sort((a, b) => new Date(b.date) - new Date(a.date));
};
