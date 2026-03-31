const pool = require("../../../config/database");

exports.findAll = async (filters = {}) => {
  let query = "SELECT * FROM professeur WHERE 1=1";
  const params = [];

  if (filters.search) {
    params.push(`%${filters.search}%`);
    query += ` AND (nom LIKE $${params.length} OR prenom LIKE $${params.length})`;
  }

  query += " ORDER BY id_professeur DESC";
  
  if (filters.limit) {
    params.push(filters.limit);
    query += ` LIMIT $${params.length}`;
  }

  const result = await pool.query(query, params);
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM professeur WHERE id_professeur = $1",
    [id]
  );
  return result.rows[0];
};

exports.create = async (data) => {
  const { nom, prenom, email, specialite, telephone } = data;
  const result = await pool.query(
    `INSERT INTO professeur (nom, prenom, email, specialite, telephone) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [nom, prenom, email, specialite, telephone]
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
  const query = `UPDATE professeur SET ${fields.join(", ")} WHERE id_professeur = $${paramIndex} RETURNING *`;
  
  const result = await pool.query(query, params);
  return result.rows[0];
};

exports.delete = async (id) => {
  const result = await pool.query(
    "DELETE FROM professeur WHERE id_professeur = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

exports.count = async () => {
  const result = await pool.query("SELECT COUNT(*) as total FROM professeur");
  return parseInt(result.rows[0].total);
};
