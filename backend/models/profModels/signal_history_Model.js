const pool = require("../../config/db");

exports.all_signal_Model = async (id) => {
    const signal_prof = await pool.query(`
        SELECT id_signal
        FROM public.signal
        WHERE reporter_id = $1
    `, [id]);

    const signalIds = signal_prof.rows.map(row => row.id_signal);

    if (signalIds.length === 0) return [];

    const result = await pool.query(`
        SELECT
            s.id_signal,
            e.id_class,
            CASE
                WHEN s.approved = true THEN 'approved'
                ELSE 'new'
            END AS signal_state,
            s.solution_state,
            e.code_apogee AS cne,
            u.prenom || ' ' || u.nom AS full_name,
            u.profile_picture
        FROM public.signal s
        LEFT JOIN public.etudiant e ON s.reported_id = e.id_utilisateur
        LEFT JOIN public.utilisateur u ON s.reported_id = u.id_utilisateur
        WHERE s.id_signal = ANY($1)
    `, [signalIds]);

    return result.rows;
};

exports.search_signal_id_Model = async (id, id_signal) => {
    const signal_prof = await pool.query(`
        SELECT id_signal
        FROM public.signal
        WHERE reporter_id = $1
    `, [id]);

    const signalIds = signal_prof.rows.map(row => row.id_signal);
    const is_signal = signalIds.includes(parseInt(id_signal));

    if (is_signal) {
        const result = await pool.query(`
            SELECT
                s.id_signal,
                CASE
                    WHEN s.approved = true THEN 'approved'
                    ELSE 'new'
                END AS signal_state,
                s.solution_state,
                e.code_apogee AS cne,
                u.prenom || ' ' || u.nom AS full_name,
                u.profile_picture
            FROM public.signal s
            LEFT JOIN public.etudiant e ON s.reported_id = e.id_utilisateur
            LEFT JOIN public.utilisateur u ON s.reported_id = u.id_utilisateur
            WHERE s.id_signal = $1
        `, [id_signal]);

        return result.rows;
    } else {
        return null;
    }
};

exports.filtre_signal_state_Model = async (id, statut) => {
    let stateFilter;
    switch (statut) {
        case 'approved':
            stateFilter = 'approved';
            break;
        case 'pending':
            stateFilter = 'new';
            break;
        default:
            stateFilter = null;
    }

    try {
        const result = await pool.query(`
            SELECT
                s.id_signal,
                s.title,
                s.description,
                s.solution_state,
                s.date_add,
                u.prenom || ' ' || u.nom AS student_name,
                u.profile_picture
            FROM public.signal s
            LEFT JOIN public.utilisateur u ON s.reported_id = u.id_utilisateur
            WHERE s.reporter_id = $1
            ${stateFilter ? `AND CASE WHEN s.approved = true THEN 'approved' ELSE 'new' END = '${stateFilter}'` : ''}
            ORDER BY s.date_add DESC
        `, [id]);

        return result.rows;
    } catch (error) {
        console.error("Error in filtre_signal_state_Model:", error);
        throw error;
    }
};

exports.getSolution = async (id_signal) => {
    try {
        const result = await pool.query(`
            SELECT f.message, f.start_date, f.date_done, u.prenom || ' ' || u.nom AS coach_name
            FROM public.follow_up f
            JOIN public.utilisateur u ON f.id_coach = u.id_utilisateur
            WHERE f.id_solution = (
                SELECT id_solution FROM public.signal WHERE id_signal = $1
            )
        `, [id_signal]);
        return result.rows;
    } catch (error) {
        console.error("Error in getSolution:", error);
        throw error;
    }
};

exports.add_signal_history = async (data) => {
    try {
        const result = await pool.query(`
            INSERT INTO public.signal (title, description, reporter_id, option_signal, anony)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [data.title, data.description, data.id_prof, data.option_signal || 'other', data.anony || false]);
        return result.rows[0];
    } catch (error) {
        console.error("Error in add_signal_history:", error);
        throw error;
    }
};

exports.get_student_name_Model = async (id) => {
    try {
        const result = await pool.query(`
            SELECT u.prenom || ' ' || u.nom AS full_name
            FROM public.utilisateur u
            WHERE u.id_utilisateur = $1
        `, [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error in get_student_name_Model:", error);
        throw error;
    }
};