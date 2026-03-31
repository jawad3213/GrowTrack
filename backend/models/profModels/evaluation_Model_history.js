const pool = require("../../config/db");

exports.all_evaluation_Model = async (id) => {
    const result = await pool.query(`
        SELECT 
            se.id_evaluation,
            se.evaluation_context,
            se.date_add,
            se.id_student,
            u.prenom || ' ' || u.nom AS full_name,
            u.profile_picture,
            e.id_class,
            c.sector_id
        FROM public.skill_evaluation se
        JOIN public.utilisateur u ON se.id_student = u.id_utilisateur
        JOIN public.etudiant e ON se.id_student = e.id_utilisateur
        JOIN public.class c ON c.id_class = e.id_class
        WHERE se.id_evaluator = $1
    `, [id]);

    return result.rows;
};

exports.search_by_id_evaluation_Model = async (id_evaluation, id) => {
    const result = await pool.query(`
        SELECT 
            se.id_evaluation,
            se.evaluation_context,
            se.date_add,
            se.id_student,
            u.prenom || ' ' || u.nom AS full_name,
            u.profile_picture,
            e.id_class,
            c.sector_id
        FROM public.skill_evaluation se
        JOIN public.utilisateur u ON se.id_student = u.id_utilisateur
        JOIN public.etudiant e ON se.id_student = e.id_utilisateur
        JOIN public.class c ON c.id_class = e.id_class
        WHERE se.id_evaluation = $1 AND se.id_evaluator = $2
    `, [id_evaluation, id]);

    return result.rows;
};

exports.filter_by_level_Model = async (level, id) => {
    const result = await pool.query(`
        SELECT 
            se.id_evaluation,
            se.evaluation_context,
            se.date_add,
            se.id_student,
            u.prenom || ' ' || u.nom AS full_name,
            u.profile_picture,
            e.id_class,
            c.sector_id
        FROM public.skill_evaluation se
        JOIN public.utilisateur u ON se.id_student = u.id_utilisateur
        JOIN public.etudiant e ON se.id_student = e.id_utilisateur
        JOIN public.class c ON c.id_class = e.id_class
        WHERE c.sector_id = $1 AND se.id_evaluator = $2
    `, [level, id]);

    return result.rows; 
};

exports.filter_by_class_Model = async (classe, id) => {
    const result = await pool.query(`
        SELECT 
            se.id_evaluation,
            se.evaluation_context,
            se.date_add,
            se.id_student,
            u.prenom || ' ' || u.nom AS full_name,
            u.profile_picture,
            e.id_class,
            c.sector_id
        FROM public.skill_evaluation se
        JOIN public.utilisateur u ON se.id_student = u.id_utilisateur
        JOIN public.etudiant e ON se.id_student = e.id_utilisateur
        JOIN public.class c ON c.id_class = e.id_class
        WHERE e.id_class = $1 AND se.id_evaluator = $2
    `, [classe, id]);

    return result.rows; 
};

exports.filter_by_type_Model = async (type, id) => {
    const result = await pool.query(`
        SELECT 
            se.id_evaluation,
            se.evaluation_context,
            se.date_add,
            se.id_student,
            u.prenom || ' ' || u.nom AS full_name,
            u.profile_picture,
            e.id_class,
            c.sector_id
        FROM public.skill_evaluation se
        JOIN public.utilisateur u ON se.id_student = u.id_utilisateur
        JOIN public.etudiant e ON se.id_student = e.id_utilisateur
        JOIN public.class c ON c.id_class = e.id_class
        WHERE se.evaluation_context = $1 AND se.id_evaluator = $2
    `, [type, id]);

    return result.rows; 
};

exports.view_evaluation_Model = async (id_evaluation) => {
    const result = await pool.query(`
        SELECT nom_competence, note_skill
        FROM public.evaluations 
        WHERE id_evaluation = $1
    `, [id_evaluation]);
    
    const comment = await pool.query(`
        SELECT comment_evaluation
        FROM public.skill_evaluation
        WHERE id_evaluation = $1
    `, [id_evaluation]);

    return { comment: comment.rows, result: result.rows };
};