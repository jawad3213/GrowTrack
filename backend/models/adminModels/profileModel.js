const pool = require("../../config/db");


exports.getprofile = async(id_admin) => {
    try {
        const result = await pool.query(
            `SELECT u.profile_picture, u.prenom || ' ' || u.nom AS full_name, u.numero_de_telephone AS phone, u.email, u.cin, u.my_role AS role, a.assigned_zone
       FROM public.utilisateur u
       JOIN public.admin a ON u.id_utilisateur = a.id_utilisateur
       WHERE u.id_utilisateur = $1
       `,[id_admin]
        )
        return result.rows[0];
    }catch (error) {
        console.error("Error fetching admin:", error);
        throw error;
      }
}

// Mise à jour partielle d'un utilisateur (PATCH)
exports.updateAdminById = async (id, fieldsToUpdate) => {
    try {
      // 1. Séparation des champs
      const userFields = {};
      const adminFields = {};
  
      for (const key in fieldsToUpdate) {
        const value = fieldsToUpdate[key];
        // Champs gérés dans public.utilisateur
        if ([
          "nom",
          "prenom",
          "cin",
          "email",
          "password",
          "description",
          "profile_picture",
          "numero_de_telephone"
        ].includes(key)) {
          userFields[key] = value;
  
        // Champ propre à admin
        } else if (key === "assigned_zone") {
          adminFields[key] = value;
        }
      }
  
      let updatedUser = null;
  
      // 2. Mise à jour de public.utilisateur
      if (Object.keys(userFields).length > 0) {
        const keys   = Object.keys(userFields);
        const values = Object.values(userFields);
        const setClause = keys
          .map((k, i) => `${k} = $${i + 1}`)
          .join(", ");
        const query = `
          UPDATE public.utilisateur
          SET ${setClause}
          WHERE id_utilisateur = $${keys.length + 1}
          RETURNING *
        `;
        const result = await pool.query(query, [...values, id]);
        updatedUser = result.rows[0];
      }
  
      // 3. Mise à jour de public.admin
      if (Object.keys(adminFields).length > 0) {
        const keys   = Object.keys(adminFields);
        const values = Object.values(adminFields);
        const setClause = keys
          .map((k, i) => `${k} = $${i + 1}`)
          .join(", ");
        const query = `
          UPDATE public.admin
          SET ${setClause}
          WHERE id_utilisateur = $${keys.length + 1}
        `;
        await pool.query(query, [...values, id]);
      }
  
      // 4. Retourne l'utilisateur mis à jour
      return updatedUser;
    } catch (error) {
      console.error("Error updating admin:", error);
      throw error;
    }
};
  