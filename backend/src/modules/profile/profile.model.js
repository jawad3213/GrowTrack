const pool = require("../../config/database");

exports.getProfile = async (userId, role) => {
  let table, idColumn;
  
  switch (role) {
    case "student":
      table = "etudiant";
      idColumn = "id_etudiant";
      break;
    case "professor":
      table = "professeur";
      idColumn = "id_professeur";
      break;
    case "supervisor":
      table = "superviseur";
      idColumn = "id_superviseur";
      break;
    case "coach":
      table = "coach";
      idColumn = "id_coach";
      break;
    default:
      table = "utilisateur";
      idColumn = "id_member";
  }

  const result = await pool.query(
    `SELECT * FROM ${table} WHERE ${idColumn} = $1`,
    [userId]
  );
  return result.rows[0];
};

exports.updateProfile = async (userId, role, data) => {
  let table, idColumn;
  
  switch (role) {
    case "student":
      table = "etudiant";
      idColumn = "id_etudiant";
      break;
    case "professor":
      table = "professeur";
      idColumn = "id_professeur";
      break;
    case "supervisor":
      table = "superviseur";
      idColumn = "id_superviseur";
      break;
    case "coach":
      table = "coach";
      idColumn = "id_coach";
      break;
    default:
      table = "utilisateur";
      idColumn = "id_member";
  }

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

  params.push(userId);
  const query = `UPDATE ${table} SET ${fields.join(", ")} WHERE ${idColumn} = $${paramIndex} RETURNING *`;
  
  const result = await pool.query(query, params);
  return result.rows[0];
};

exports.updatePassword = async (userId, hashedPassword) => {
  const result = await pool.query(
    "UPDATE utilisateur SET password = $1 WHERE id_member = $2 RETURNING id_member, email",
    [hashedPassword, userId]
  );
  return result.rows[0];
};
