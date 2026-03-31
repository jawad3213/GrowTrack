const pool = require("../../config/database");

exports.findAll = async (filters = {}) => {
  let query = "SELECT * FROM notification WHERE 1=1";
  const params = [];

  if (filters.id_user) {
    params.push(filters.id_user);
    query += ` AND id_user = $${params.length}`;
  }

  if (filters.type) {
    params.push(filters.type);
    query += ` AND type = $${params.length}`;
  }

  if (filters.lu === "true") {
    query += " AND lu = true";
  }

  query += " ORDER BY date_creation DESC";
  
  if (filters.limit) {
    params.push(filters.limit);
    query += ` LIMIT $${params.length}`;
  }

  const result = await pool.query(query, params);
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM notification WHERE id_notification = $1",
    [id]
  );
  return result.rows[0];
};

exports.create = async (data) => {
  const { id_user, type, titre, message, lien } = data;
  const result = await pool.query(
    `INSERT INTO notification (id_user, type, titre, message, lien) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [id_user, type, titre, message, lien]
  );
  return result.rows[0];
};

exports.markAsRead = async (id) => {
  const result = await pool.query(
    "UPDATE notification SET lu = true WHERE id_notification = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

exports.markAllAsRead = async (userId) => {
  const result = await pool.query(
    "UPDATE notification SET lu = true WHERE id_user = $1 RETURNING *",
    [userId]
  );
  return result.rows;
};

exports.countUnread = async (userId) => {
  const result = await pool.query(
    "SELECT COUNT(*) as count FROM notification WHERE id_user = $1 AND lu = false",
    [userId]
  );
  return parseInt(result.rows[0].count);
};
