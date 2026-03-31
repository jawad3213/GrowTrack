const pool = require("../../config/db");

exports.total = async (id_prof) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(id_classe) AS total
             FROM public.enseigne
             WHERE id_utilisateur = $1`,
            [id_prof]
        );
        return parseInt(result.rows[0].total, 10);
    } catch (error) {
        console.error("Erreur dans total():", error);
        throw error;
    }
};

exports.totalstudent = async (id_prof) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(e.id_utilisateur) as total
             FROM public.etudiant e
             JOIN public.enseigne t ON t.id_classe = e.id_class
             WHERE t.id_utilisateur = $1`,
            [id_prof]
        );
        return parseInt(result.rows[0].total, 10);
    } catch (error) {
        console.error("error dans totalstudent", error);
        throw error;
    }
}

exports.classes = async (id) => {
    try {
        const result = await pool.query(
            `SELECT id_classe AS class FROM public.enseigne WHERE id_utilisateur = $1`,
            [id]
        )
        return result.rows;
    } catch (error) {
        console.error("erreur dans classes : ", error);
        throw error;
    }
}
   
exports.getGraphSignal = async (classe) => {
    try {
        const result = await pool.query(
            `SELECT 
                COUNT(s.id_signal) AS total,
                TO_CHAR(date_trunc('month', s.date_add), 'YYYY-MM') AS month
             FROM public.class c
             JOIN public.etudiant st ON c.id_class = st.id_class
             JOIN public.signal s ON s.reported_id = st.id_utilisateur
             WHERE c.id_class = $1
             GROUP BY 2
             ORDER BY 2`,
            [classe]
        )
        return result.rows;
    } catch (error) {
        console.error("erreur dans graphe", error);
        throw error;
    }
}


exports.getGraphEvaluation = async (classId, month) => {
    try {
        const result = await pool.query(
            `WITH days AS (
                SELECT generate_series(
                    make_date(
                        EXTRACT(YEAR FROM CURRENT_DATE)::int,
                        $2::int,
                        1
                    ),
                    make_date(
                        EXTRACT(YEAR FROM CURRENT_DATE)::int,
                        $2::int,
                        1
                    ) + interval '1 month' - interval '1 day',
                    '1 day'
                )::date AS day
            ),
            agg AS (
                SELECT
                    date_trunc('day', date_add)::date AS day,
                    COUNT(id_evaluation)::int AS total
                FROM public.skill_evaluation
                WHERE id_class = $1
                    AND EXTRACT(MONTH FROM date_add) = $2::int
                    AND EXTRACT(YEAR FROM date_add) = EXTRACT(YEAR FROM CURRENT_DATE)
                GROUP BY 1
            )
            SELECT
                to_char(days.day, 'MM-DD') AS day,
                COALESCE(agg.total, 0) AS total
            FROM days
            LEFT JOIN agg USING(day)
            ORDER BY days.day;`,
            [classId, month]
        );
        return result.rows;
    } catch (error) {
        console.error("erreur dans graphe", error);
        throw error;
    }
};


exports.greatestAll = async (teacherId) => {
    try {
        const teachRes = await pool.query(
            `SELECT id_classe
             FROM public.enseigne
             WHERE id_utilisateur = $1`,
            [teacherId]
        );
        
        const classIds = teachRes.rows.map(r => r.id_classe);
        if (classIds.length === 0) {
            return [];
        }

        const sql = `
            SELECT u.prenom || ' ' || u.nom AS full_name, e.code_apogee AS cne, 
                   u.profile_picture, c.sector_id, c.id_class, 
                   AVG(se.note_evaluation)::numeric(10,2) AS average
            FROM public.utilisateur u
            JOIN public.etudiant e ON u.id_utilisateur = e.id_utilisateur
            JOIN public.class c ON c.id_class = e.id_class
            JOIN public.skill_evaluation se ON se.id_student = e.id_utilisateur
            WHERE c.id_classe = ANY($1)
            GROUP BY u.prenom, u.nom, e.code_apogee, u.profile_picture, c.sector_id, c.id_class
            ORDER BY average DESC
            LIMIT 7
        `;

        const result = await pool.query(sql, [classIds]);
        return result.rows;
    } catch (error) {
        console.error("error dans greatestAll:", error);
        throw error;
    }
};


exports.profile = async (id_prof) => {
    try {
        const result = await pool.query(
            `SELECT u.profile_picture, u.prenom || ' ' || u.nom AS full_name, u.cin, u.email, p.code, p.departement
             FROM public.utilisateur u
             JOIN public.professeur p ON u.id_utilisateur = p.id_utilisateur
             WHERE u.id_utilisateur = $1`,
            [id_prof]
        )
        if (!result.rows[0]) {
            return "le prof n'existe pas !"
        }
        return result.rows[0];
    } catch (error) {
        console.error("le probleme dans profile :", error);
        throw error;
    }
}

exports.totalEvaluation = async (id) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(id_evaluation) AS total 
             FROM public.skill_evaluation 
             WHERE id_evaluator = $1
             AND date_add >= CURRENT_DATE - INTERVAL '1 MONTH'`,
            [id]
        )
        return result.rows[0];
    } catch (error) {
        console.error("le probleme dans totalEvaluation :", error)
        throw error;
    }
}