const pool = require("../../config/db");

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

exports.getNumberOfSignal = async (id_student) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(s.id_signal) AS total
             FROM public.signal s
             WHERE s.reported_id = $1
             AND s.date_add >= CURRENT_DATE - INTERVAL '1 MONTH'`,
            [id_student]
        )
        return result.rows[0];
    }catch(error){
        console.error("erreur dans getNumberOfSignal", error);
        throw error;
    }
}


exports.getMoyenneDansLaClasse = async (id_student) => {
    try{
        const student = await pool.query(
            `SELECT id_class FROM public.etudiant WHERE id_utilisateur = $1`,
            [id_student]
        )
        if (!student.rows[0]?.id_class) {
            return { moyenne: 0 };
        }
        const result = await pool.query(
            `SELECT AVG(note_evaluation) AS moyenne
             FROM public.skill_evaluation
             WHERE id_class = $1`,
            [student.rows[0].id_class]
        )
        return result.rows[0];
    }catch(error){
        console.log("erreur dans getMoyenneDansLaClasse",error);
        throw error;
    }

}

exports.getEvaluationSubmitted = async (id) => {
    try {
        const student = await pool.query(
            `SELECT id_class FROM public.etudiant WHERE id_utilisateur = $1`,
            [id]
        );
        
        if (!student.rows[0]?.id_class) {
            return { count: 0, projectCount: 0 };
        }
        
        const result1 = await pool.query(
            `SELECT COUNT(DISTINCT id_utilisateur) AS count FROM public.etudiant WHERE id_class = $1`,
            [student.rows[0].id_class]
        );
        const result2 = await pool.query(
            `SELECT COUNT(t.id_project) AS count
             FROM public.etudiant s
             JOIN public.team_student ts ON s.id_utilisateur = ts.student_id
             JOIN public.team t ON ts.id_team = t.id_team
             WHERE s.id_utilisateur = $1`,
            [id]
        );
        
        const count1 = parseInt(result1.rows[0].count, 10) || 0;
        const count2 = parseInt(result2.rows[0].count, 10) || 0;

        return { count: count1, projectCount: count2 };
    } catch (error) {
        console.error("erreur dans getEvaluationSubmitted", error);
        throw error;
    }
}

exports.getSkills = async (id) => {
    try {
        const skills = await pool.query(`SELECT nom_competence FROM public.competence`);
        return skills.rows;
    } catch (error) {
        console.error("erreur dans getSkills", error);
        throw error;
    }
}

exports.getStudentClass = async (id_student) => {
    try {
        const result = await pool.query(
            `SELECT c.id_class, c.nom_class, s.id_sector, s.description
             FROM public.etudiant e
             JOIN public.class c ON e.id_class = c.id_class
             JOIN public.sector s ON c.sector_id = s.id_sector
             WHERE e.id_utilisateur = $1`,
            [id_student]
        );
        return result.rows[0];
    } catch (error) {
        console.error("erreur dans getStudentClass", error);
        throw error;
    }
}

exports.getStudentProjects = async (id_student) => {
    try {
        const result = await pool.query(
            `SELECT p.id_project, p.name_project, p.end_date, p.subject_project,
                    u.prenom || ' ' || u.nom AS professor_name,
                    t.team_name, t.note
             FROM public.etudiant s
             JOIN public.team_student ts ON s.id_utilisateur = ts.student_id
             JOIN public.team t ON ts.id_team = t.id_team
             JOIN public.projet p ON t.id_project = p.id_project
             JOIN public.professeur pr ON p.id_prof = pr.id_utilisateur
             JOIN public.utilisateur u ON pr.id_utilisateur = u.id_utilisateur
             WHERE s.id_utilisateur = $1`,
            [id_student]
        );
        return result.rows;
    } catch (error) {
        console.error("erreur dans getStudentProjects", error);
        throw error;
    }
}

exports.getEvaluationHistory = async (id_etudiant) => {
    try {
        const result = await pool.query(
            `SELECT se.id_evaluation, se.note_evaluation, se.type_evaluation, se.comment_evaluation, 
                    se.date_add, se.evaluation_context,
                    u.prenom || ' ' || u.nom AS evaluator_name
             FROM public.skill_evaluation se
             LEFT JOIN public.utilisateur u ON se.id_evaluator = u.id_utilisateur
             WHERE se.id_student = $1
             ORDER BY se.date_add DESC`,
            [id_etudiant]
        );
        return result.rows;
    } catch (error) {
        console.error("erreur dans getEvaluationHistory", error);
        throw error;
    }
}

exports.getSkillsEvaluation = async (id_evaluation) => {
    try {
        const result = await pool.query(
            `SELECT e.nom_competence, e.note_skill
             FROM public.evaluations e
             WHERE e.id_evaluation = $1`,
            [id_evaluation]
        );
        return result.rows;
    } catch (error) {
        console.error("erreur dans getSkillsEvaluation", error);
        throw error;
    }
}

exports.getStudentSupervisors = async (id_etudiant) => {
    try {
        const result = await pool.query(
            `SELECT u.prenom || ' ' || u.nom AS supervisor_name, u.email, 
                    sup.nom_de_entreprise, sup.my_position,
                    st.debut_stage, st.fin_stage
             FROM public.etudiant e
             JOIN public.stage st ON e.id_utilisateur = st.id_etudiant
             JOIN public.superviseur sup ON sup.id_stage = st.id_stage
             JOIN public.utilisateur u ON sup.id_utilisateur = u.id_utilisateur
             WHERE e.id_utilisateur = $1`,
            [id_etudiant]
        );
        return result.rows;
    } catch (error) {
        console.error("erreur dans getStudentSupervisors", error);
        throw error;
    }
}

exports.getAllStudents = async (id_etudiant) => {
    try {
        const etd = await pool.query(
            `SELECT id_class FROM public.etudiant WHERE id_utilisateur = $1`,
            [id_etudiant]
        );
        if (!etd.rows[0]?.id_class) return [];
        
        const result = await pool.query(
            `SELECT u.id_utilisateur, u.prenom || ' ' || u.nom AS full_name, u.email, u.sexe
             FROM public.etudiant e
             JOIN public.utilisateur u ON e.id_utilisateur = u.id_utilisateur
             WHERE e.id_class = $1 AND e.id_utilisateur != $2`,
            [etd.rows[0].id_class, id_etudiant]
        );
        return result.rows;
    } catch (error) {
        console.error("erreur dans getAllStudents", error);
        throw error;
    }
}

exports.getTotalEvals = async (id) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(*) as count FROM public.skill_evaluation WHERE id_evaluator = $1`,
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("erreur dans getTotalEvals", error);
        throw error;
    }
}