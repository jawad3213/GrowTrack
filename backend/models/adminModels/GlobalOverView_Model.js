const pool = require("../../config/db");

exports.number_of_evaluation_submitted_Model = async () => {
    const currentMonth = new Date().getMonth() + 1; 
    const currentYear = new Date().getFullYear();
  
    let months = [];
    let years = [];
  
    if (currentMonth <= 6) {
      for (let m = 9; m <= 12; m++) {
        months.push(m);
        years.push(currentYear - 1);
      }
      for (let m = 1; m <= 6; m++) {
        months.push(m);
        years.push(currentYear);
      }
    } else {
      for (let m = 9; m <= 12; m++) {
        months.push(m);
        years.push(currentYear);
      }
      for (let m = 1; m <= 6; m++) {
        months.push(m);
        years.push(currentYear + 1);
      }
    }
  
    const data = [];
    for (let i = 0; i < months.length; i++) {
      const res = await pool.query(
        `SELECT COUNT(*) FROM public.skill_evaluation WHERE EXTRACT(MONTH FROM date_add) = $1 AND EXTRACT(YEAR FROM date_add) = $2`,
        [months[i], years[i]]
      );
      data.push(parseInt(res.rows[0].count));
    }
    return { data };
};

exports.search_by_id_evaluation_Model = async (id_evaluation) => {
    const result = await pool.query(`
        SELECT 
            se.id_evaluation,
            evaluator.my_role               AS evaluator_role,
            evaluator.profile_picture    AS evaluator_profile_picture,
            evaluator.prenom || ' ' || evaluator.nom          AS evaluator_full_name,
            student.my_role                 AS student_role,
            student.profile_picture      AS student_profile_picture,
            student.prenom || ' ' || student.nom            AS student_full_name,
            se.date_add,
            se.type_evaluation,
            COALESCE(
                json_agg(
                    json_build_object(
                        'skill_name', ev.nom_competence,
                        'note_skill',  ev.note_skill
                    )
                ) FILTER (WHERE ev.nom_competence IS NOT NULL),
                '[]'
            ) AS skills
        FROM public.skill_evaluation se
        JOIN public.utilisateur evaluator
            ON se.id_evaluator = evaluator.id_utilisateur
        JOIN public.utilisateur student
            ON se.id_student = student.id_utilisateur
        LEFT JOIN public.evaluations ev
            ON se.id_evaluation = ev.id_evaluation
        WHERE se.id_evaluation = $1
        GROUP BY
            se.id_evaluation,
            evaluator.my_role,
            evaluator.profile_picture,
            evaluator.prenom,
            evaluator.nom,
            student.my_role,
            student.profile_picture,
            student.prenom,
            student.nom,
            se.date_add,
            se.type_evaluation
    `, [id_evaluation]);

    return result.rows; 
};

exports.filter_by_type_Model = async (type) => {
    const result = await pool.query(`
        SELECT 
            se.id_evaluation,
            evaluator.my_role AS evaluator_role,
            evaluator.profile_picture AS evaluator_profile_picture,
            evaluator.prenom || ' ' || evaluator.nom AS evaluator_full_name,
            student.my_role AS student_role,
            student.profile_picture AS student_profile_picture,
            student.prenom || ' ' || student.nom AS student_full_name,
            se.date_add,
            se.type_evaluation
        FROM public.skill_evaluation se
        JOIN public.utilisateur evaluator 
            ON se.id_evaluator = evaluator.id_utilisateur
        JOIN public.utilisateur student 
            ON se.id_student = student.id_utilisateur
        WHERE se.type_evaluation = $1
    `, [type]);

    return result.rows; 
};

exports.all_evaluation_Model = async () => {
    const result = await pool.query(`
        SELECT 
            se.id_evaluation,
            evaluator.my_role AS evaluator_role,
            evaluator.profile_picture AS evaluator_profile_picture,
            evaluator.prenom || ' ' || evaluator.nom AS evaluator_full_name,
            student.my_role AS student_role,
            student.profile_picture AS student_profile_picture,
            student.prenom || ' ' || student.nom AS student_full_name,
            se.date_add,
            se.type_evaluation
        FROM public.skill_evaluation se
        JOIN public.utilisateur evaluator 
            ON se.id_evaluator = evaluator.id_utilisateur
        JOIN public.utilisateur student 
            ON se.id_student = student.id_utilisateur
    `);
    return result.rows;
};