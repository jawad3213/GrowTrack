const pool = require("../../config/database");
const { comparePassword } = require("../../shared/utils/password");

/**
 * Find a user by email and validate password
 */
exports.LoginModel = async (email, password) => {
  const result = await pool.query(
    "SELECT * FROM public.utilisateur WHERE email=$1",
    [email]
  );

  if (result.rows.length > 0) {
    const member = result.rows[0];
    const isValid = await comparePassword(password, member.mot_de_passe);

    if (isValid) {
      return {
        id_member: member.id_utilisateur,
        role: member.my_role,
        full_name: member.prenom + " " + member.nom,
        email: member.email,
      };
    }
  }

  return null;
};

/**
 * Find a user by email
 */
exports.FindUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM public.utilisateur WHERE email = $1",
    [email]
  );

  if (result.rows.length > 0) {
    const member = result.rows[0];
    return {
      id_member: member.id_utilisateur,
      role: member.my_role,
      full_name: member.prenom + " " + member.nom,
      email: member.email,
    };
  }

  return null;
};

/**
 * Find a user by ID
 */
exports.GetUserById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM public.utilisateur WHERE id_utilisateur = $1",
    [id]
  );

  if (result.rows.length > 0) {
    const member = result.rows[0];
    return {
      id_member: member.id_utilisateur,
      role: member.my_role,
      full_name: member.prenom + " " + member.nom,
      email: member.email,
    };
  }

  return null;
};

/**
 * Update a user's password by ID
 */
exports.UpdatePassById = async (id_user, hashedPassword) => {
  const result = await pool.query(
    "SELECT * FROM public.utilisateur WHERE id_utilisateur=$1",
    [id_user]
  );

  if (result.rows.length > 0) {
    const update = await pool.query(
      "UPDATE public.utilisateur SET mot_de_passe=$1 WHERE id_utilisateur=$2 RETURNING *",
      [hashedPassword, id_user]
    );
    return update.rows[0];
  }

  return null;
};
