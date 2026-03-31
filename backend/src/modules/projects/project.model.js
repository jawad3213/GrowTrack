const pool = require("../../config/database");

exports.findAll = async (filters = {}) => {
  let query = `SELECT p.*, e.nom as etudiant_nom, e.prenom as etudiant_prenom,
               prof.nom as prof_nom, prof.prenom as prof_prenom
               FROM projet p
               LEFT JOIN etudiant e ON p.id_etudiant = e.id_etudiant
               LEFT JOIN professeur prof ON p.id_professeur = prof.id_professeur
               WHERE 1=1`;
  const params = [];

  if (filters.id_etudiant) {
    params.push(filters.id_etudiant);
    query += ` AND p.id_etudiant = $${params.length}`;
  }

  if (filters.id_professeur) {
    params.push(filters.id_professeur);
    query += ` AND p.id_professeur = $${params.length}`;
  }

  if (filters.status) {
    params.push(filters.status);
    query += ` AND p.status = $${params.length}`;
  }

  query += " ORDER BY p.date_creation DESC";
  
  if (filters.limit) {
    params.push(filters.limit);
    query += ` LIMIT $${params.length}`;
  }

  const result = await pool.query(query, params);
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM projet WHERE id_projet = $1",
    [id]
  );
  return result.rows[0];
};

exports.create = async (data) => {
  const { id_etudiant, id_professeur, titre, description, date_debut, date_fin, status } = data;
  const result = await pool.query(
    `INSERT INTO projet (id_etudiant, id_professeur, titre, description, date_debut, date_fin, status) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [id_etudiant, id_professeur, titre, description, date_debut, date_fin, status || 'en_cours']
  );
  return result.rows[0];
};

exports.update = async (id, data) => {
  const fields = [];
  const params = [];
  let paramIndex = 1;

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = $${paramIndex}`);
      params.push(value);
      paramIndex++;
    }
  });

  if (fields.length === 0) return null;

  params.push(id);
  const query = `UPDATE projet SET ${fields.join(", ")} WHERE id_projet = $${paramIndex} RETURNING *`;
  
  const result = await pool.query(query, params);
  return result.rows[0];
};

exports.delete = async (id) => {
  const result = await pool.query(
    "DELETE FROM projet WHERE id_projet = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

exports.count = async (filters = {}) => {
  let query = "SELECT COUNT(*) as total FROM projet WHERE 1=1";
  const params = [];

  if (filters.status) {
    params.push(filters.status);
    query += ` AND status = $${params.length}`;
  }

  const result = await pool.query(query, params);
  return parseInt(result.rows[0].total);
};
