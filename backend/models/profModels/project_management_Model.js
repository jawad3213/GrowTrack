const pool = require("../../config/db");

exports.all_project_Model = async (id) => {
    const result = await pool.query(`
        SELECT 
            p.name_project,
            p.id_project, 
            p.date_project,
            p.end_date,
            p.id_class,
            p.id_sector,
            (
                SELECT COUNT(*) 
                FROM public.team t 
                WHERE t.id_project = p.id_project
            ) AS team_count
        FROM public.projet p
        WHERE p.id_prof = $1
    `, [id]);  
    return result.rows;
};

exports.all_group_Model = async (id) => {
    const result = await pool.query(`
        SELECT 
            p.id_team,
            p.team_name,
            (
                SELECT COUNT(*) 
                FROM public.team_student 
                WHERE id_team = p.id_team
            ) AS number_of_member 
        FROM public.team AS p
        WHERE p.id_project = $1
    `, [id]);  
    return result.rows;
};

exports.delete_team_Model = async (id_team) => {
    await pool.query(`DELETE FROM public.team_student WHERE id_team = $1`, [id_team]);
    const result = await pool.query(`DELETE FROM public.team WHERE id_team = $1 RETURNING *`, [id_team]);
    return result.rowCount;
};

exports.delete_project_Model = async (id_project) => {
    const result = await pool.query(`
        DELETE FROM public.projet
        WHERE id_project = $1
        RETURNING *
    `, [id_project]);  
    return result.rows[0];
};

exports.add_project_Model = async (id, name, start_date, end_date, description, level, field) => {
    const result = await pool.query(`
        INSERT INTO public.projet (
            name_project,
            description_project,
            date_project,
            end_date,
            id_prof,
            id_class,
            id_sector
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id_project;
    `, [name, description, start_date, end_date, id, level, field]);
    
    const message = `Professor has successfully created a project named "${name}" focused on: "${description}".`;

    await pool.query(`
        INSERT INTO public.news (id_member, message, type)
        VALUES ($1, $2, $3)
    `, [id, message, 'professor']);

    return result.rows[0];
};

exports.add_group_Model = async (id, name, project_id) => {
    const result = await pool.query(`
        INSERT INTO public.team (
            id_prof,
            id_project,
            team_name
        ) VALUES ($1, $2, $3)
        RETURNING id_team;
    `, [id, project_id, name]);
    return result.rows[0];
};

exports.delete_group_Model = async (id_team) => {
    await pool.query(`
        DELETE FROM public.team_student
        WHERE id_team = $1
    `, [id_team]);  

    const result = await pool.query(`
        DELETE FROM public.team
        WHERE id_team = $1
        RETURNING *;
    `, [id_team]);  
    return result.rows[0];
};

exports.add_member_Model = async (cne, id_team) => {
    const student = await pool.query(`
        SELECT id_utilisateur from public.etudiant where code_apogee = $1 
    `, [cne]);

    if (!student.rows[0]) {
        throw new Error("Student not found");
    }

    const result = await pool.query(`
        INSERT INTO public.team_student (
            id_team,
            student_id
        ) VALUES ($1, $2)
        RETURNING *;
    `, [id_team, student.rows[0].id_utilisateur]);

    return result.rows[0];
};

exports.update_project_Model = async (id_project, start_date, month_number) => {
    const current = await pool.query(`SELECT date_project FROM public.projet WHERE id_project = $1`, [id_project]);
    if (current.rows.length === 0) throw new Error("Project not found.");

    let new_start_date;

    if (start_date) {
        const [year, month] = start_date.split('-');
        new_start_date = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, 1));
    } else {
        new_start_date = current.rows[0].date_project;
    }

    let new_end_date = new Date(new_start_date);
    new_end_date.setMonth(new_end_date.getMonth() + parseInt(month_number));

    await pool.query(`
        UPDATE public.projet 
        SET date_project = $1, end_date = $2 
        WHERE id_project = $3
    `, [new_start_date, new_end_date, id_project]);

    return { success: true };
};

exports.get_team_students = async (id_team) => {
    const result = await pool.query(`
        SELECT u.id_utilisateur, u.prenom || ' ' || u.nom AS full_name, u.email
        FROM public.team_student ts
        JOIN public.utilisateur u ON ts.student_id = u.id_utilisateur
        WHERE ts.id_team = $1
    `, [id_team]);
    return result.rows;
};

exports.remove_student_from_team = async (id_team, student_id) => {
    const result = await pool.query(`
        DELETE FROM public.team_student 
        WHERE id_team = $1 AND student_id = $2
        RETURNING *
    `, [id_team, student_id]);
    return result.rows[0];
};

exports.get_team_note = async (id_team) => {
    const result = await pool.query(`
        SELECT note FROM public.team WHERE id_team = $1
    `, [id_team]);
    return result.rows[0];
};

exports.update_team_note = async (id_team, note) => {
    await pool.query(`
        UPDATE public.team SET note = $1 WHERE id_team = $2
    `, [note, id_team]);
    return { success: true };
};

exports.get_project_details = async (id_project) => {
    const result = await pool.query(`
        SELECT * FROM public.projet WHERE id_project = $1
    `, [id_project]);
    return result.rows[0];
};

exports.get_available_students = async (id_class) => {
    const result = await pool.query(`
        SELECT u.id_utilisateur, u.prenom || ' ' || u.nom AS full_name, e.code_apogee
        FROM public.etudiant e
        JOIN public.utilisateur u ON e.id_utilisateur = u.id_utilisateur
        WHERE e.id_class = $1
        AND e.id_utilisateur NOT IN (
            SELECT student_id FROM public.team_student ts
            JOIN public.team t ON ts.id_team = t.id_team
            WHERE t.id_project IS NOT NULL
        )
    `, [id_class]);
    return result.rows;
};