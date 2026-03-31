const pool = require("../../../config/database");

exports.findAll = async (filters = {}) => {
  let query = "SELECT * FROM etudiant WHERE 1=1";
  const params = [];

  if (filters.search) {
    params.push(`%${filters.search}%`);
    query += ` AND (nom LIKE $${params.length} OR prenom LIKE $${params.length})`;
  }

  if (filters.id_classe) {
    params.push(filters.id_classe);
    query += ` AND id_classe = $${params.length}`;
  }

  query += " ORDER BY id_etudiant DESC";
  
  if (filters.limit) {
    params.push(filters.limit);
    query += ` LIMIT $${params.length}`;
  }

  const result = await pool.query(query, params);
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM etudiant WHERE id_etudiant = $1",
    [id]
  );
  return result.rows[0];
};

exports.findByCin = async (cin) => {
  const result = await pool.query(
    "SELECT * FROM etudiant WHERE cin = $1",
    [cin]
  );
  return result.rows[0];
};

exports.create = async (data) => {
  const { nom, prenom, email, id_classe, telephone, date_naissance } = data;
  const result = await pool.query(
    `INSERT INTO etudiant (nom, prenom, email, id_classe, telephone, date_naissance) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [nom, prenom, email, id_classe, telephone, date_naissance]
  );
  return result.rows[0];
};

exports.update = async (id, data) => {
  const fieldMap = {
    full_name: 'nom',
    cin: 'cin',
    cne: 'cne',
    email: 'email',
    pass: 'pass',
    id_sector: 'id_classe',
    telephone: 'telephone',
    date_naissance: 'date_naissance'
  };

  const fields = [];
  const params = [];
  let paramIndex = 1;

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && key !== 'id_etudiant') {
      const dbField = fieldMap[key] || key;
      fields.push(`${dbField} = $${paramIndex}`);
      params.push(value);
      paramIndex++;
    }
  });

  if (fields.length === 0) return null;

  let student;
  if (isNaN(id)) {
    student = await exports.findByCin(id);
  } else {
    student = await exports.findById(id);
  }
  
  if (!student) return null;

  params.push(student.id_etudiant);
  const query = `UPDATE etudiant SET ${fields.join(", ")} WHERE id_etudiant = $${paramIndex} RETURNING *`;
  
  const result = await pool.query(query, params);
  return result.rows[0];
};

exports.delete = async (id) => {
  let student;
  if (isNaN(id)) {
    student = await exports.findByCin(id);
  } else {
    student = await exports.findById(id);
  }
  
  if (!student) return null;
  
  const result = await pool.query(
    "DELETE FROM etudiant WHERE id_etudiant = $1 RETURNING *",
    [student.id_etudiant]
  );
  return result.rows[0];
};

exports.count = async () => {
  const result = await pool.query("SELECT COUNT(*) as total FROM etudiant");
  return parseInt(result.rows[0].total);
};
