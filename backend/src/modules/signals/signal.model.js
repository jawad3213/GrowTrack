const pool = require("../../config/database");

exports.findAll = async (filters = {}) => {
  let query = `SELECT s.*, e.nom as etudiant_nom, e.prenom as etudiant_prenom 
               FROM signal s 
               LEFT JOIN etudiant e ON s.id_etudiant = e.id_etudiant 
               WHERE 1=1`;
  const params = [];

  if (filters.status) {
    params.push(filters.status);
    query += ` AND s.status = $${params.length}`;
  }

  if (filters.id_etudiant) {
    params.push(filters.id_etudiant);
    query += ` AND s.id_etudiant = $${params.length}`;
  }

  query += " ORDER BY s.date_signal DESC";
  
  if (filters.limit) {
    params.push(filters.limit);
    query += ` LIMIT $${params.length}`;
  }

  const result = await pool.query(query, params);
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM signal WHERE id_signal = $1",
    [id]
  );
  return result.rows[0];
};

exports.create = async (data) => {
  const { id_etudiant, id_professeur, type_signal, description, priorite } = data;
  const result = await pool.query(
    `INSERT INTO signal (id_etudiant, id_professeur, type_signal, description, priorite, status) 
     VALUES ($1, $2, $3, $4, $5, 'en_attente') RETURNING *`,
    [id_etudiant, id_professeur, type_signal, description, priorite]
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
  const query = `UPDATE signal SET ${fields.join(", ")} WHERE id_signal = $${paramIndex} RETURNING *`;
  
  const result = await pool.query(query, params);
  return result.rows[0];
};

exports.resolve = async (id, resolution) => {
  const result = await pool.query(
    `UPDATE signal SET status = 'resolu', resolution = $1, date_resolution = NOW() 
     WHERE id_signal = $2 RETURNING *`,
    [resolution, id]
  );
  return result.rows[0];
};

exports.count = async (filters = {}) => {
  let query = "SELECT COUNT(*) as total FROM signal WHERE 1=1";
  const params = [];

  if (filters.status) {
    params.push(filters.status);
    query += ` AND status = $${params.length}`;
  }

  const result = await pool.query(query, params);
  return parseInt(result.rows[0].total);
};
