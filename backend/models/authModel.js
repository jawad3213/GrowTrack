const pool = require("../config/db");
const bcrypt = require('bcrypt');


exports.LoginModel = async (email, password) => { 
    const result = await pool.query(
        "SELECT * FROM public.utilisateur WHERE email=$1",
        [email]
    );
    console.log(result.rows[0])
    if (result.rows.length > 0) {
        const member = result.rows[0];
        const hashPass = /^\$2y\$/.test(member.mot_de_passe) ? '$2a$' + member.mot_de_passe.slice(4) : member.mot_de_passe;
        const IsPasswordValid = await bcrypt.compare(password, hashPass);
        if (IsPasswordValid) {
            return {
                id_member: member.id_utilisateur,
                role: member.my_role,
                full_name: member.prenom + ' ' + member.nom,
                email: member.email
            };
        }
        
    }
    else return null; 
};

exports.FindUserByEmail =async (email)=>{
    console.log(email)
    const result = await pool.query("SELECT * FROM public.utilisateur WHERE email = $1",
        [email])
    if (result.rows.length > 0) {
        const member = result.rows[0];
        return {
            id_member: member.id_utilisateur,
            role: member.my_role,
            full_name: member.prenom + ' ' + member.nom,
            email: member.email
        };    
    }
    else return null; 
}

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
            full_name: member.prenom + ' ' + member.nom,
            email: member.email
        };    
    }
    else return null; 
}

exports.UpdatePassById = async (id_user, hashedPassword)=>{
    try {
        const result = await pool.query("SELECT * FROM public.utilisateur WHERE id_utilisateur=$1", [id_user]);
        if(result.rows.length > 0){
            const update = await pool.query("UPDATE public.utilisateur SET mot_de_passe=$1 WHERE id_utilisateur=$2 RETURNING *", [hashedPassword, id_user] )
            return update.rows[0];
        }
    } catch (error) {
        console.log(error);
    }
}

