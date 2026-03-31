const pool = require("../../config/database");

exports.findAll = async (filters = {}) => {
  let query = `SELECT ev.*, e.nom as etudiant_nom, e.prenom as etudiant_prenom,
               p.nom as prof_nom, p.prenom as prof_prenom
               FROM evaluation ev
               LEFT JOIN etudiant e ON ev.id_etudiant = e.id_etudiant
               LEFT JOIN professeur p ON ev.id_professeur = p.id_professeur
               WHERE 1=1`;
  const params = [];

  if (filters.id_etudiant) {
    params.push(filters.id_etudiant);
    query += ` AND ev.id_etudiant = $${params.length}`;
  }

  if (filters.id_professeur) {
    params.push(filters.id_professeur);
    query += ` AND ev.id_professeur = $${params.length}`;
  }

  if (filters.id_classe) {
    params.push(filters.id_classe);
    query += ` AND ev.id_classe = $${params.length}`;
  }

  query += " ORDER BY ev.date_evaluation DESC";
  
  if (filters.limit) {
    params.push(filters.limit);
    query += ` LIMIT $${params.length}`;
  }

  const result = await pool.query(query, params);
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM evaluation WHERE id_evaluation = $1",
    [id]
  );
  return result.rows[0];
};

exports.create = async (data) => {
  const { id_etudiant, id_professeur, id_classe, type_evaluation, note, competences, commentaire, date_evaluation } = data;
  const result = await pool.query(
    `INSERT INTO evaluation (id_etudiant, id_professeur, id_classe, type_evaluation, note, competences, commentaire, date_evaluation) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [id_etudiant, id_professeur, id_classe, type_evaluation, note, JSON.stringify(competences), commentaire, date_evaluation]
  );
  return result.rows[0];
};

exports.update = async (id, data) => {
  const fields = [];
  const params = [];
  let paramIndex = 1;

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      if (key === 'competences') {
        fields.push(`${key} = $${paramIndex}`);
        params.push(JSON.stringify(value));
      } else {
        fields.push(`${key} = $${paramIndex}`);
        params.push(value);
      }
      paramIndex++;
    }
  });

  if (fields.length === 0) return null;

  params.push(id);
  const query = `UPDATE evaluation SET ${fields.join(", ")} WHERE id_evaluation = $${paramIndex} RETURNING *`;
  
  const result = await pool.query(query, params);
  return result.rows[0];
};

exports.count = async (filters = {}) => {
  let query = "SELECT COUNT(*) as total FROM evaluation WHERE 1=1";
  const params = [];

  if (filters.id_classe) {
    params.push(filters.id_classe);
    query += ` AND id_classe = $${params.length}`;
  }

  const result = await pool.query(query, params);
  return parseInt(result.rows[0].total);
};
