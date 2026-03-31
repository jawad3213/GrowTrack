const pool = require("../../config/db");

exports.get_sector_Model = async (id) => {
    const result = await pool.query(`
        SELECT DISTINCT s.sector_id
        FROM public.class s
        JOIN public.enseigne h ON s.id_class = h.id_classe
        WHERE h.id_utilisateur = $1
    `, [id]);
    return result.rows;
};

exports.get_classes_Model = async (id, id_sector) => {
    const result = await pool.query(`
        SELECT s.id_class
        FROM public.enseigne h
        JOIN public.class s ON h.id_classe = s.id_class
        WHERE h.id_utilisateur = $1 AND s.sector_id = $2
    `, [id, id_sector]);
    return result.rows;
};

exports.get_all_student_Model = async (id, id_class) => {
    const result = pool.query(`
        SELECT
            t.id_utilisateur,
            t.code_apogee AS cne,
            u.prenom || ' ' || u.nom AS full_name,
            u.profile_picture,
            (
                SELECT MAX(s.date_add)
                FROM public.signal s
                WHERE s.reporter_id = $2 AND s.reported_id = t.id_utilisateur
            ) AS last_signal_date,
            (
                SELECT 
                    CASE 
                        WHEN COUNT(*) > 0 THEN 'Yes'
                        ELSE 'No'
                    END
                FROM public.signal s
                WHERE s.reporter_id = $2 
                    AND s.reported_id = t.id_utilisateur
                    AND DATE_TRUNC('month', s.date_add) = DATE_TRUNC('month', CURRENT_DATE)
            ) AS signal_this_month
        FROM public.etudiant t
        JOIN public.utilisateur u ON t.id_utilisateur = u.id_utilisateur
        WHERE t.id_class = $1
    `, [id_class, id]);

    return (await result).rows;
};

exports.search_cne_student_Model = async (id, id_class, cne) => {
    const result = await pool.query(`
        SELECT
            t.id_utilisateur,
            t.code_apogee AS cne,
            u.profile_picture,
            (
                SELECT MAX(s.date_add)
                FROM public.signal s
                WHERE s.reporter_id = $2 AND s.reported_id = t.id_utilisateur
            ) AS last_signal_date,
            (
                SELECT 
                    CASE 
                        WHEN COUNT(*) > 0 THEN 'Yes'
                        ELSE 'No'
                    END
                FROM public.signal s
                WHERE s.reporter_id = $2 
                    AND s.reported_id = t.id_utilisateur
                    AND DATE_TRUNC('month', s.date_add) = DATE_TRUNC('month', CURRENT_DATE)
            ) AS signal_this_month
        FROM public.etudiant t
        JOIN public.utilisateur u ON t.id_utilisateur = u.id_utilisateur
        WHERE t.id_class = $1 AND t.code_apogee = $3
    `, [id_class, id, cne]);

    return result.rows;
};

exports.filter_student_Model = async (id, id_class, choice) => {
    const result = await pool.query(`
        SELECT
            t.id_utilisateur,
            t.code_apogee AS cne,
            u.profile_picture,
            (
                SELECT MAX(s.date_add)
                FROM public.signal s
                WHERE s.reporter_id = $2 AND s.reported_id = t.id_utilisateur
            ) AS last_signal_date,
            (
                SELECT 
                    CASE 
                        WHEN COUNT(*) > 0 THEN 'Yes'
                        ELSE 'No'
                    END
                FROM public.signal s
                WHERE s.reporter_id = $2 
                    AND s.reported_id = t.id_utilisateur
                    AND DATE_TRUNC('month', s.date_add) = DATE_TRUNC('month', CURRENT_DATE)
            ) AS signal_this_month
        FROM public.etudiant t
        JOIN public.utilisateur u ON t.id_utilisateur = u.id_utilisateur
        WHERE t.id_class = $1
    `, [id_class, id]);

    const filtered = result.rows.filter(row => row.signal_this_month === choice);
    return filtered;
};

exports.new_signal_Model = async (id, id_student, title, description, anonyme) => {
    const result = await pool.query(`
        INSERT INTO public.signal (title, description, reporter_id, reported_id, option_signal, anony)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `, [title, description, id, id_student, title, anonyme || false]);

    const id_signal = result.rows[0].id_signal;
    const date_add = result.rows[0].date_add;

    const message = `Professor submitted a signal concerning student about "${title}".`;

    await pool.query(`
        INSERT INTO public.news (id_member, message, type, date)
        VALUES ($1, $2, $3, $4)
    `, [id, message, 'professor', date_add]);

    return result.rows;
};

exports.signal_history_Model = async (id, id_student) => {
    const result = await pool.query(`
        SELECT
            s.date_add,
            s.solution_state,
            CASE
                WHEN s.approved IS TRUE THEN 'Approved'
                WHEN s.approved IS FALSE THEN 'Rejected'
                ELSE 'New'
            END AS signal_state,
            u.prenom || ' ' || u.nom AS full_name,
            u.my_role AS role
        FROM public.signal s
        LEFT JOIN public.utilisateur u ON s.reporter_id = u.id_utilisateur
        WHERE s.reporter_id = $1 AND s.reported_id = $2
        ORDER BY s.date_add DESC
    `, [id, id_student]);

    return result.rows;
};