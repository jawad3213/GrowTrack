const pool = require("../../config/db");

exports.picture_model = async (id) => {
    const result = await pool.query(
        "SELECT profile_picture FROM public.utilisateur WHERE id_utilisateur = $1",
        [id]
    );      
    return result.rows[0]?.profile_picture || null;
};

exports.personnal_information_model = async (id) => {
    const result = await pool.query(
        `SELECT u.prenom || ' ' || u.nom AS full_name, u.email, u.numero_de_telephone AS phone, u.my_role AS role, u.cin, a.assigned_zone
         FROM public.utilisateur u
         JOIN public.admin a ON u.id_utilisateur = a.id_utilisateur
         WHERE u.id_utilisateur = $1`,
        [id]
    );
    return result.rows[0] || null;
};
