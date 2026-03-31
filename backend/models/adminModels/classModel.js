const pool = require("../../config/db");


exports.createClass = async (field, description, classes, id_admin) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Insertion dans la table sector
    await client.query(
      `INSERT INTO public.sector (id_sector, description, id_admin) VALUES ($1, $2, $3)`,
      [field, description, id_admin]
    );

    // 2. Insertion de chaque classe dans la table class
    for (const classe of classes) {
      await client.query(
        `INSERT INTO public.class (id_class, nom_class, sector_id) VALUES ($1, $2, $3)`,
        [classe, classe, field]
      );
    }

    await client.query('COMMIT');
    return { message: "Sector and classes inserted successfully" };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error inserting class and sector:", error);
    throw error;
  } finally {
    client.release();
  }
};

//SI VOUS avez besoin des classes
exports.getAllSectors = async () => {
  try {
    // First try with new table names
    try {
      const result = await pool.query(
        `SELECT 
          s.id_sector AS field, 
          s.description, 
          COUNT(c.id_class) AS "number of classes"
        FROM public.sector s
        LEFT JOIN public.class c ON s.id_sector = c.sector_id
        GROUP BY s.id_sector`
      );
      return result.rows;
    } catch (e) {
      // Fallback to old table names
      const result = await pool.query(
        `SELECT 
          id_sector AS field, 
          description, 
          0 AS "number of classes"
        FROM public.sector`
      );
      return result.rows;
    }
  } catch (error) {
    console.error("Error fetching classes:", error);
    return [];
  }
};



exports.getClassByName = async (name) => {
  try {
    const result = await pool.query(
      `SELECT * FROM public.class WHERE id_class ILIKE $1`,
      [name]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error retrieving class:", error);
    throw error;
  }
};

exports.updateFieldById = async (id, updates) => {
  const keys = Object.keys(updates);
  const values = Object.values(updates);

  if (keys.length === 0) return null;

  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
  const query = `UPDATE public.sector SET ${setClause} WHERE id_sector = $${keys.length + 1} RETURNING *`;

  const result = await pool.query(query, [...values, id]);
  return result.rows[0];
};

exports.deleteClassById = async (id) => {
  try {
    
    const result = await pool.query(`DELETE FROM public.class WHERE id_class = $1`, [id]);
    return result;
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
};

exports.totalClasses = async () => {
  try {
    const result = await pool.query(`SELECT COUNT(*) AS total FROM public.class`);
    return result.rows[0];
  } catch (error) {
    console.error("Error counting classes:", error);
    throw error;
  }
};

exports.getClassStats = async () => {
  try {
    const totalClassesResult = await pool.query("SELECT COUNT(*) FROM public.class");
    const totalClasses = parseInt(totalClassesResult.rows[0].count);

    const totalSectorsResult = await pool.query("SELECT COUNT(*) FROM public.sector");
    const totalSectors = parseInt(totalSectorsResult.rows[0].count);

    const sectorResult = await pool.query(
      `SELECT s.id_sector, s.description as sector_name,
              COUNT(c.id_class) as class_count
       FROM public.sector s
       LEFT JOIN public.class c ON s.id_sector = c.sector_id
       GROUP BY s.id_sector, s.description
       ORDER BY class_count DESC`
    );
    const bySector = sectorResult.rows;

    const classWithStudentsResult = await pool.query(
      `SELECT c.id_classe, c.nom_classe, COUNT(e.id_utilisateur) as student_count
       FROM public.class c
       LEFT JOIN public.etudiant e ON c.id_classe = e.id_niveau
       GROUP BY c.id_classe, c.nom_classe
       ORDER BY student_count DESC`
    );
    const byClass = classWithStudentsResult.rows;

    const currentYear = new Date().getFullYear();
    const thisYearClassesResult = await pool.query(
      `SELECT COUNT(DISTINCT id_classe) FROM public.etudiant 
       WHERE id_niveau IN (SELECT id_classe FROM public.class)`
    );
    const activeClasses = parseInt(thisYearClassesResult.rows[0].count);

    return {
      totalClasses,
      totalSectors,
      bySector,
      byClass,
      activeClasses
    };
  } catch (error) {
    console.error("Error getting class stats:", error);
    throw error;
  }
};
