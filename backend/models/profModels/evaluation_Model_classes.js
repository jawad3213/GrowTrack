const pool = require("../../config/db");

exports.get_sector_Model = async (id) => {
    const result = await pool.query(`
        SELECT DISTINCT c.sector_id
        FROM public.class c
        JOIN public.enseigne h ON c.id_class = h.id_classe
        WHERE h.id_utilisateur = $1
    `, [id]);
    return result.rows;
};

exports.get_classes_Model = async (id, id_sector) => {
    const result = await pool.query(`
        SELECT c.id_class
        FROM public.enseigne h
        JOIN public.class c ON h.id_classe = c.id_class
        WHERE h.id_utilisateur = $1 AND c.sector_id = $2
    `, [id, id_sector]);
    return result.rows;
};

exports.get_all_student_Model = async (id, id_class) => {
    const result = await pool.query(`
        SELECT 
            t.id_utilisateur,
            u.prenom || ' ' || u.nom AS full_name,
            u.cin,
            t.code_apogee AS cne,
            u.profile_picture,
            CASE 
                WHEN EXISTS (
                    SELECT 1 
                    FROM skill_evaluation s 
                    WHERE s.id_student = t.id_utilisateur
                        AND s.id_evaluator = $1
                        AND s.evaluation_context = 'class'
                        AND EXTRACT(MONTH FROM s.date_add) = EXTRACT(MONTH FROM CURRENT_DATE)
                        AND EXTRACT(YEAR FROM s.date_add) = EXTRACT(YEAR FROM CURRENT_DATE)
                ) THEN 'submitted'
                WHEN EXISTS (
                    SELECT 1 
                    FROM skill_evaluation s 
                    WHERE s.id_student = t.id_utilisateur
                        AND s.id_evaluator = $1
                        AND s.evaluation_context = 'class'
                ) THEN 'overdue'
                ELSE ''
            END AS isC,
            (
                SELECT MAX(s.date_add)
                FROM skill_evaluation s
                WHERE s.id_student = t.id_utilisateur
                    AND s.id_evaluator = $1
                    AND s.evaluation_context = 'class'
            ) AS lastC
        FROM public.etudiant t
        JOIN public.utilisateur u ON t.id_utilisateur = u.id_utilisateur
        JOIN public.enseigne h ON t.id_class = h.id_classe
        WHERE h.id_utilisateur = $1 AND t.id_class = $2
    `, [id, id_class]);

    return result.rows;
};

exports.search_by_student_cne_Model = async (id, cne, id_class) => {
    const result = await pool.query(`
        SELECT 
            t.id_utilisateur,
            t.code_apogee AS cne,
            CASE 
                WHEN EXISTS (
                    SELECT 1 
                    FROM skill_evaluation s 
                    WHERE s.id_student = t.id_utilisateur
                        AND s.id_evaluator = $1
                        AND s.evaluation_context = 'class'
                        AND EXTRACT(MONTH FROM s.date_add) = EXTRACT(MONTH FROM CURRENT_DATE)
                        AND EXTRACT(YEAR FROM s.date_add) = EXTRACT(YEAR FROM CURRENT_DATE)
                ) THEN 'submitted'
                WHEN EXISTS (
                    SELECT 1 
                    FROM skill_evaluation s 
                    WHERE s.id_student = t.id_utilisateur
                        AND s.id_evaluator = $1
                        AND s.evaluation_context = 'class'
                ) THEN 'overdue'
                ELSE ''
            END AS isC,
            (
                SELECT MAX(s.date_add)
                FROM skill_evaluation s
                WHERE s.id_student = t.id_utilisateur
                    AND s.id_evaluator = $1
                    AND s.evaluation_context = 'class'
            ) AS lastC
        FROM public.etudiant t
        JOIN public.enseigne h ON t.id_class = h.id_classe
        WHERE h.id_utilisateur = $1 AND t.code_apogee = $2 AND t.id_class = $3
    `, [id, cne, id_class]);
    return result.rows;
};

exports.search_by_course_statut_Model = async (id, statut, id_class) => {
    const result = await pool.query(`
        SELECT * FROM (
            SELECT 
                t.id_utilisateur,
                t.code_apogee AS cne,
                CASE 
                    WHEN EXISTS (
                        SELECT 1 
                        FROM skill_evaluation s 
                        WHERE s.id_student = t.id_utilisateur
                            AND s.id_evaluator = $1
                            AND s.evaluation_context = 'class'
                            AND EXTRACT(MONTH FROM s.date_add) = EXTRACT(MONTH FROM CURRENT_DATE)
                            AND EXTRACT(YEAR FROM s.date_add) = EXTRACT(YEAR FROM CURRENT_DATE)
                    ) THEN 'submitted'
                    WHEN EXISTS (
                        SELECT 1 
                        FROM skill_evaluation s 
                        WHERE s.id_student = t.id_utilisateur
                            AND s.id_evaluator = $1
                            AND s.evaluation_context = 'class'
                    ) THEN 'overdue'
                    ELSE ''
                END AS isC,
                (
                    SELECT MAX(s.date_add)
                    FROM skill_evaluation s
                    WHERE s.id_student = t.id_utilisateur
                        AND s.id_evaluator = $1
                        AND s.evaluation_context = 'class'
                ) AS lastC
            FROM public.etudiant t
            JOIN public.enseigne h ON t.id_class = h.id_classe
            WHERE h.id_utilisateur = $1 AND t.id_class = $3
        ) AS sub
        WHERE sub.isC = $2
    `, [id, statut, id_class]);
    return result.rows;
};

exports.search_by_project_statut_Model = async (id, statut) => {
    const result = await pool.query(`
        SELECT * FROM (
            SELECT 
                t.id_utilisateur,
                t.code_apogee AS cne,
                CASE 
                    WHEN EXISTS (
                        SELECT 1 
                        FROM skill_evaluation s 
                        WHERE s.id_student = t.id_utilisateur
                            AND s.id_evaluator = $1
                            AND s.evaluation_context = 'project'
                            AND EXTRACT(MONTH FROM s.date_add) = EXTRACT(MONTH FROM CURRENT_DATE)
                            AND EXTRACT(YEAR FROM s.date_add) = EXTRACT(YEAR FROM CURRENT_DATE)
                    ) THEN 'submitted'
                    WHEN EXISTS (
                        SELECT 1 
                        FROM skill_evaluation s 
                        WHERE s.id_student = t.id_utilisateur
                            AND s.id_evaluator = $1
                            AND s.evaluation_context = 'project'
                    ) THEN 'overdue'
                    ELSE ''
                END AS isP
            FROM public.etudiant t
            JOIN public.enseigne h ON t.id_class = h.id_classe
            WHERE h.id_utilisateur = $1
        ) AS sub
        WHERE sub.isP = $2
    `, [id, statut]);
    return result.rows;
};

exports.submit_evaluation_Model = async (data) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const result = await client.query(`
            INSERT INTO public.skill_evaluation (note_evaluation, type_evaluation, comment_evaluation, id_student, id_evaluator, evaluation_context, id_class, date_add)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
            RETURNING id_evaluation
        `, [data.note, data.type, data.comment, data.id_student, data.id_prof, data.context, data.id_class]);

        const id_evaluation = result.rows[0].id_evaluation;

        for (const skill of data.skills) {
            await client.query(`
                INSERT INTO public.evaluations (id_evaluation, note_skill, nom_competence)
                VALUES ($1, $2, $3)
            `, [id_evaluation, skill.note, skill.skillName]);
        }

        await client.query('COMMIT');
        return { success: true, id_evaluation };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error in submit_evaluation_Model:", error);
        throw error;
    } finally {
        client.release();
    }
};

exports.get_students_by_class_for_evaluation = async (id, id_class) => {
    const result = await pool.query(`
        SELECT 
            t.id_utilisateur,
            u.prenom || ' ' || u.nom AS full_name,
            t.code_apogee AS cne,
            u.profile_picture
        FROM public.etudiant t
        JOIN public.utilisateur u ON t.id_utilisateur = u.id_utilisateur
        JOIN public.enseigne h ON t.id_class = h.id_classe
        WHERE h.id_utilisateur = $1 AND t.id_class = $2
    `, [id, id_class]);
    return result.rows;
};

exports.get_skills = async () => {
    const result = await pool.query(`SELECT nom_competence FROM public.competence`);
    return result.rows;
};

exports.get_class_students_count = async (id_class) => {
    const result = await pool.query(`
        SELECT COUNT(*) as count FROM public.etudiant WHERE id_class = $1
    `, [id_class]);
    return result.rows[0];
};

exports.get_student_evaluations_by_prof = async (id_prof, id_student) => {
    const result = await pool.query(`
        SELECT se.*, u.prenom || ' ' || u.nom AS student_name
        FROM public.skill_evaluation se
        JOIN public.utilisateur u ON se.id_student = u.id_utilisateur
        WHERE se.id_evaluator = $1 AND se.id_student = $2
        ORDER BY se.date_add DESC
    `, [id_prof, id_student]);
    return result.rows;
};

exports.get_evaluation_skills = async (id_evaluation) => {
    const result = await pool.query(`
        SELECT nom_competence, note_skill FROM public.evaluations WHERE id_evaluation = $1
    `, [id_evaluation]);
    return result.rows;
};