const pool = require("../../config/database");

exports.generateStudentReport = async (studentId) => {
  const student = await pool.query(
    "SELECT * FROM etudiant WHERE id_etudiant = $1",
    [studentId]
  );

  if (student.rows.length === 0) {
    throw new Error("Student not found");
  }

  const evaluations = await pool.query(
    "SELECT * FROM evaluation WHERE id_etudiant = $1 ORDER BY date_evaluation DESC",
    [studentId]
  );

  const projects = await pool.query(
    "SELECT * FROM projet WHERE id_etudiant = $1 ORDER BY date_creation DESC",
    [studentId]
  );

  const signals = await pool.query(
    "SELECT * FROM signal WHERE id_etudiant = $1 ORDER BY date_signal DESC",
    [studentId]
  );

  return {
    student: student.rows[0],
    evaluations: evaluations.rows,
    projects: projects.rows,
    signals: signals.rows,
    generatedAt: new Date(),
  };
};

exports.generateClassReport = async (classId) => {
  const classe = await pool.query(
    "SELECT * FROM classe WHERE id_classe = $1",
    [classId]
  );

  if (classe.rows.length === 0) {
    throw new Error("Class not found");
  }

  const students = await pool.query(
    "SELECT * FROM etudiant WHERE id_classe = $1",
    [classId]
  );

  const evaluations = await pool.query(
    `SELECT e.*, et.nom as etudiant_nom, et.prenom as etudiant_prenom 
     FROM evaluation e 
     JOIN etudiant et ON e.id_etudiant = et.id_etudiant 
     WHERE et.id_classe = $1 
     ORDER BY e.date_evaluation DESC`,
    [classId]
  );

  return {
    class: classe.rows[0],
    studentCount: students.rows.length,
    evaluations: evaluations.rows,
    generatedAt: new Date(),
  };
};

exports.generateEvaluationReport = async (evaluationId) => {
  const evaluation = await pool.query(
    `SELECT ev.*, e.nom as etudiant_nom, e.prenom as etudiant_prenom,
            p.nom as prof_nom, p.prenom as prof_prenom
     FROM evaluation ev
     JOIN etudiant e ON ev.id_etudiant = e.id_etudiant
     JOIN professeur p ON ev.id_professeur = p.id_professeur
     WHERE ev.id_evaluation = $1`,
    [evaluationId]
  );

  if (evaluation.rows.length === 0) {
    throw new Error("Evaluation not found");
  }

  return {
    evaluation: evaluation.rows[0],
    generatedAt: new Date(),
  };
};
