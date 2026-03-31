const pool = require('../../config/db');

exports.getNombreProjets = async (id_student) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(t.id_project) 
             FROM public.etudiant s 
             JOIN public.team_student ts ON s.id_utilisateur = ts.student_id
             JOIN public.team t ON ts.id_team = t.id_team
             WHERE s.id_utilisateur = $1
             `,[id_student]
        )
        return result.rows[0];
    }catch(error){
        console.error("erreur dans getNombreProjets",error);
        throw error
    }
}


exports.getProjects = async (id_student) => {
    try{
        const result = await pool.query(
            `
            SELECT p.id_project, p.name_project, u.prenom || ' ' || u.nom AS professor_name, 
                   e.cours AS module, t.team_name, p.end_date AS Deadline
            FROM public.etudiant s
            JOIN public.team_student ts ON s.id_utilisateur = ts.student_id
            JOIN public.team t ON ts.id_team = t.id_team
            JOIN public.projet p ON t.id_project = p.id_project
            JOIN public.professeur pr ON p.id_prof = pr.id_utilisateur
            JOIN public.utilisateur u ON pr.id_utilisateur = u.id_utilisateur
            JOIN public.enseigne e ON pr.id_utilisateur = e.id_utilisateur
            WHERE s.id_utilisateur = $1
            `,[id_student]
        )
        return result.rows;
    }catch(error){
        console.error("erreur dans getProjects", error);
        throw error;
    }
}

exports.getMemberProject = async (id_student, id_projet) => {
    try{
        const team = await pool.query(
            `
            SELECT t.id_team
            FROM public.team t 
            JOIN public.team_student ts ON t.id_team = ts.id_team
            WHERE ts.student_id = $1 AND t.id_project = $2
            `,[id_student, id_projet]
        )
        const result = await pool.query(
            `
            SELECT u.id_utilisateur, u.prenom || ' ' || u.nom AS full_name 
            FROM public.utilisateur u 
            JOIN public.etudiant s ON u.id_utilisateur = s.id_utilisateur
            JOIN public.team_student ts ON s.id_utilisateur = ts.student_id
            WHERE ts.id_team = $1
            `,[team.rows[0]?.id_team]
        )
        return result.rows;
    }catch(error){
        console.error("erreur dans getMemberProjects", error);
        throw error;
    }
}


exports.addSignal = async (id_student, reported, title, description, anony) => {
    try {
        const result = await pool.query(
            `
            INSERT INTO public.signal (title, description, reporter_id, reported_id, option_signal, anony) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `, [title, description, id_student, reported, title, anony]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error adding signal:", error);
        throw error;
    }
}


exports.getSkillName = async () => {
    try{
        const result = await pool.query(
            `SELECT nom_competence FROM public.competence`
        )
        return result.rows;
    }catch(error){
        console.error("erreur dans getskillName", error);
        throw error;
    }
}



exports.deleteProject = async (id_project, id_student) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const teamResult = await client.query(
            `SELECT id_team FROM public.team_student 
             WHERE student_id = $1 
             AND id_team IN (SELECT id_team FROM public.team WHERE id_project = $2)`,
            [id_student, id_project]
        );

        if (teamResult.rows.length > 0) {
            const id_team = teamResult.rows[0].id_team;
            
            await client.query(`DELETE FROM public.skill_evaluation WHERE id_team = $1`, [id_team]);
            await client.query(`DELETE FROM public.team_student WHERE id_team = $1`, [id_team]);
            await client.query(`DELETE FROM public.team WHERE id_team = $1`);
        }

        await client.query(`DELETE FROM public.projet WHERE id_project = $1`, [id_project]);

        await client.query('COMMIT');
        return { success: true };
    } catch (error) {
        try {
            await client.query('ROLLBACK');
        } catch (rollbackError) {
            console.error('ROLLBACK failed:', rollbackError);
        }
        console.error("Error deleting project:", error);
        throw error;
    } finally {
        client.release();
    }
};

exports.setEvaluation = async (id_student, team, ratings, evaluated, message) => {
    const client = await pool.connect();
    try {
        let rate = 0;
        for (const rating of ratings) {
            rate += parseInt(rating.rate, 10);
        }
        await client.query('BEGIN');

        const result = await client.query(`
            INSERT INTO public.skill_evaluation (note_evaluation, type_evaluation, comment_evaluation, id_team, id_student, id_evaluator, evaluation_context, date_add)
            VALUES ($1, $2, $3, $4, $5, $6, 'project', NOW()) RETURNING id_evaluation`,
            [rate * 0.3, 'Pair', message, team, evaluated, id_student]
        );
        const id_evaluation = result.rows[0].id_evaluation;

        for (const rating of ratings) {
            await client.query(
                `
                INSERT INTO public.evaluations (id_evaluation, note_skill, nom_competence)
                VALUES ($1, $2, $3)
                `,
                [id_evaluation, rating.rate, rating.skillName]
            );
        }
        await client.query('COMMIT');
        return { success: true };
    } catch (error) {
        const originalError = error;
        
        try {
            await client.query('ROLLBACK');
        } catch (rollbackError) {
            console.error('ROLLBACK failed:', rollbackError);
        }
        
        console.error("Erreur dans setEvaluation", originalError);
        throw originalError;
    } finally {
        client.release();
    }
};