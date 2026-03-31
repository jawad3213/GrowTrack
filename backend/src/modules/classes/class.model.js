const pool = require("../../config/database");

exports.findAll = async (filters = {}) => {
  let query = "SELECT * FROM classe WHERE 1=1";
  const params = [];

  if (filters.search) {
    params.push(`%${filters.search}%`);
    query += ` AND (nom LIKE $${params.length} OR filiere LIKE $${params.length})`;
  }

  if (filters.filiere) {
    params.push(filters.filiere);
    query += ` AND filiere = $${params.length}`;
  }

  query += " ORDER BY id_classe DESC";
  
  if (filters.limit) {
    params.push(filters.limit);
    query += ` LIMIT $${params.length}`;
  }

  const result = await pool.query(query, params);
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM classe WHERE id_classe = $1",
    [id]
  );
  return result.rows[0];
};

exports.create = async (data) => {
  const { nom, filiere, niveau, annee_scolaire } = data;
  const result = await pool.query(
    `INSERT INTO classe (nom, filiere, niveau, annee_scolaire) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [nom, filiere, niveau, annee_scolaire]
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
  const query = `UPDATE classe SET ${fields.join(", ")} WHERE id_classe = $${paramIndex} RETURNING *`;
  
  const result = await pool.query(query, params);
  return result.rows[0];
};

exports.delete = async (id) => {
  const result = await pool.query(
    "DELETE FROM classe WHERE id_classe = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

exports.count = async () => {
  const result = await pool.query("SELECT COUNT(*) as total FROM classe");
  return parseInt(result.rows[0].total);
};
