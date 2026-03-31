-- ============================================
-- GrowTrack Database Schema (NEW TABLE NAMES)
-- ============================================

-- ============================================
-- USERS / MEMBER TABLE
-- ============================================
CREATE TABLE public.utilisateur (
    id_utilisateur VARCHAR(100) PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50),
    cin VARCHAR(50) UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    my_role VARCHAR(50) NOT NULL CHECK (my_role IN ('admin', 'etudiant', 'professeur', 'superviseur', 'coach')),
    numero_de_telephone VARCHAR(50),
    profile_picture VARCHAR(255),
    description VARCHAR(1000),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sexe VARCHAR(10) CHECK (sexe IN ('Mr', 'Mme', 'Autre')),
    status VARCHAR(20) DEFAULT 'actif' CHECK (status IN ('actif', 'inactif', 'suspendu'))
);

-- ============================================
-- ADMIN TABLE
-- ============================================
CREATE TABLE public.admin (
    id_utilisateur VARCHAR(100) PRIMARY KEY,
    assigned_zone VARCHAR(50),
    FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateur(id_utilisateur)
);

-- ============================================
-- SECTORS / FILIERES TABLE
-- ============================================
CREATE TABLE public.sector (
    id_sector VARCHAR(100) PRIMARY KEY,
    description VARCHAR(2000),
    id_admin VARCHAR(100),
    FOREIGN KEY (id_admin) REFERENCES public.utilisateur(id_utilisateur)
);

-- ============================================
-- CLASSES TABLE
-- ============================================
CREATE TABLE public.class (
    id_class VARCHAR(100) PRIMARY KEY,
    nom_class VARCHAR(50),
    start_date DATE DEFAULT CURRENT_DATE,
    sector_id VARCHAR(100),
    FOREIGN KEY (sector_id) REFERENCES public.sector(id_sector)
);

-- ============================================
-- STUDENT TABLE
-- ============================================
CREATE TABLE public.etudiant (
    id_utilisateur VARCHAR(100) PRIMARY KEY,
    cne VARCHAR(50) UNIQUE,
    id_class VARCHAR(100),
    FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateur(id_utilisateur),
    FOREIGN KEY (id_class) REFERENCES public.class(id_class)
);

-- ============================================
-- PROFESSOR TABLE
-- ============================================
CREATE TABLE public.professeur (
    id_utilisateur VARCHAR(100) PRIMARY KEY,
    code VARCHAR(50) UNIQUE,
    departement VARCHAR(50),
    status_contrat VARCHAR(50) DEFAULT 'vacataire',
    FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateur(id_utilisateur)
);

-- ============================================
-- TEACH (Professor-Class relation)
-- ============================================
CREATE TABLE public.enseigne (
    id_utilisateur VARCHAR(100),
    id_classe VARCHAR(100),
    cours VARCHAR(100),
    PRIMARY KEY (id_utilisateur, id_classe),
    FOREIGN KEY (id_utilisateur) REFERENCES public.professeur(id_utilisateur),
    FOREIGN KEY (id_classe) REFERENCES public.class(id_class)
);

-- ============================================
-- SUPERVISOR TABLE
-- ============================================
CREATE TABLE public.superviseur (
    id_utilisateur VARCHAR(100) PRIMARY KEY,
    numero_de_matricule VARCHAR(50) UNIQUE,
    nom_de_entreprise VARCHAR(100),
    my_position VARCHAR(100),
    id_stage INT,
    FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateur(id_utilisateur)
);

-- ============================================
-- INTERNSHIP / STAGE TABLE
-- ============================================
CREATE TABLE public.stage (
    id_stage SERIAL PRIMARY KEY,
    debut_stage DATE,
    fin_stage DATE,
    sujet_stage VARCHAR(1000),
    id_etudiant VARCHAR(100),
    FOREIGN KEY (id_etudiant) REFERENCES public.etudiant(id_utilisateur)
);

-- Add foreign key after stage is created
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'superviseur') THEN
        ALTER TABLE public.superviseur ADD CONSTRAINT fk_stage FOREIGN KEY (id_stage) REFERENCES public.stage(id_stage);
    END IF;
END $$;

-- ============================================
-- COACH TABLE
-- ============================================
CREATE TABLE public.coach (
    id_utilisateur VARCHAR(100) PRIMARY KEY,
    coach_code VARCHAR(50),
    specialisation_domaine VARCHAR(100),
    description_domaine VARCHAR(500),
    FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateur(id_utilisateur)
);

-- ============================================
-- PROJECT TABLE
-- ============================================
CREATE TABLE public.projet (
    id_project SERIAL PRIMARY KEY,
    name_project VARCHAR(100),
    description_project VARCHAR(1000),
    date_project DATE,
    end_date DATE,
    subject_project VARCHAR(1000),
    id_prof VARCHAR(100) NOT NULL,
    id_class VARCHAR(100),
    id_sector VARCHAR(100),
    group_number INT,
    FOREIGN KEY (id_prof) REFERENCES public.professeur(id_utilisateur),
    FOREIGN KEY (id_class) REFERENCES public.class(id_class),
    FOREIGN KEY (id_sector) REFERENCES public.sector(id_sector)
);

-- ============================================
-- TEAM TABLE
-- ============================================
CREATE TABLE public.team (
    id_team SERIAL PRIMARY KEY,
    note DOUBLE PRECISION,
    id_prof VARCHAR(100) NOT NULL,
    id_project INT,
    team_name VARCHAR(100),
    FOREIGN KEY (id_prof) REFERENCES public.professeur(id_utilisateur),
    FOREIGN KEY (id_project) REFERENCES public.projet(id_project)
);

-- ============================================
-- TEAM STUDENT TABLE
-- ============================================
CREATE TABLE public.team_student (
    id_team INT,
    student_id VARCHAR(100),
    PRIMARY KEY (id_team, student_id),
    FOREIGN KEY (id_team) REFERENCES public.team(id_team),
    FOREIGN KEY (student_id) REFERENCES public.etudiant(id_utilisateur)
);

-- ============================================
-- SUPERVISE (Supervisor-Student relation)
-- ============================================
CREATE TABLE public.supervise (
    id_supervisor VARCHAR(100),
    id_student VARCHAR(100),
    id_internship INT,
    PRIMARY KEY (id_supervisor, id_student, id_internship),
    FOREIGN KEY (id_supervisor) REFERENCES public.superviseur(id_utilisateur),
    FOREIGN KEY (id_student) REFERENCES public.etudiant(id_utilisateur),
    FOREIGN KEY (id_internship) REFERENCES public.stage(id_stage)
);

-- ============================================
-- FOLLOW UP TABLE
-- ============================================
CREATE TABLE public.follow_up (
    id_coach VARCHAR(100),
    id_student VARCHAR(100),
    id_solution INT,
    message VARCHAR(1000),
    start_date DATE DEFAULT CURRENT_DATE,
    date_done DATE,
    PRIMARY KEY (id_coach, id_student, id_solution),
    FOREIGN KEY (id_coach) REFERENCES public.coach(id_utilisateur),
    FOREIGN KEY (id_student) REFERENCES public.etudiant(id_utilisateur)
);

-- ============================================
-- SKILLS / COMPETENCES TABLE
-- ============================================
CREATE TABLE public.competence (
    id_competence SERIAL PRIMARY KEY,
    nom_competence VARCHAR(100) UNIQUE NOT NULL,
    description_competence VARCHAR(1000),
    question1 VARCHAR(500),
    question2 VARCHAR(500),
    question3 VARCHAR(500),
    id_admin VARCHAR(100),
    FOREIGN KEY (id_admin) REFERENCES public.utilisateur(id_utilisateur)
);

-- ============================================
-- SIGNAL / REPORT TABLE
-- ============================================
CREATE TABLE public.signal (
    id_signal SERIAL PRIMARY KEY,
    title VARCHAR(200),
    description VARCHAR(1000),
    reporter_id VARCHAR(100),
    reported_id VARCHAR(100),
    option_signal VARCHAR(100),
    anony BOOLEAN DEFAULT false,
    approved BOOLEAN DEFAULT false,
    solution_state VARCHAR(100) DEFAULT 'pending' CHECK (solution_state IN ('pending', 'resolved', 'blocked', 'rejected')),
    id_solution INT,
    date_add DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (reporter_id) REFERENCES public.utilisateur(id_utilisateur),
    FOREIGN KEY (reported_id) REFERENCES public.utilisateur(id_utilisateur)
);

-- ============================================
-- SOLUTION TABLE
-- ============================================
CREATE TABLE public.solution (
    id_solution SERIAL PRIMARY KEY,
    option_solution VARCHAR(100),
    details VARCHAR(1000),
    name_coach VARCHAR(100),
    start_date DATE,
    date_done DATE,
    state VARCHAR(100) DEFAULT 'New' CHECK (state IN ('New', 'Approved', 'Rejected'))
);

-- Add foreign key to signal
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'signal') THEN
        ALTER TABLE public.signal ADD CONSTRAINT fk_solution FOREIGN KEY (id_solution) REFERENCES public.solution(id_solution);
    END IF;
END $$;

-- ============================================
-- SKILL EVALUATION TABLE
-- ============================================
CREATE TABLE public.skill_evaluation (
    id_evaluation SERIAL PRIMARY KEY,
    note_evaluation DOUBLE PRECISION,
    type_evaluation VARCHAR(100) CHECK (type_evaluation IN ('Pair', 'Self', 'Supervisor', 'Professor')),
    comment_evaluation VARCHAR(1000),
    evaluation_context VARCHAR(100) CHECK (evaluation_context IN ('class', 'project', 'internship')),
    id_internship INT,
    id_class VARCHAR(100),
    id_team INT,
    id_student VARCHAR(100),
    id_evaluator VARCHAR(100),
    date_add DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (id_internship) REFERENCES public.stage(id_stage),
    FOREIGN KEY (id_class) REFERENCES public.class(id_class),
    FOREIGN KEY (id_team) REFERENCES public.team(id_team),
    FOREIGN KEY (id_student) REFERENCES public.etudiant(id_utilisateur),
    FOREIGN KEY (id_evaluator) REFERENCES public.utilisateur(id_utilisateur)
);

-- ============================================
-- EVALUATIONS (Skill-Evaluation relation)
-- ============================================
CREATE TABLE public.evaluations (
    id_evaluation INT,
    note_skill DOUBLE PRECISION,
    nom_competence VARCHAR(100),
    PRIMARY KEY (id_evaluation, nom_competence),
    FOREIGN KEY (id_evaluation) REFERENCES public.skill_evaluation(id_evaluation),
    FOREIGN KEY (nom_competence) REFERENCES public.competence(nom_competence)
);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE public.notifications (
    id_notification SERIAL PRIMARY KEY,
    content_notification VARCHAR(500),
    date_notification TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_member VARCHAR(100),
    is_read BOOLEAN DEFAULT false,
    FOREIGN KEY (id_member) REFERENCES public.utilisateur(id_utilisateur)
);

-- ============================================
-- NEWS TABLE
-- ============================================
CREATE TABLE public.news (
    id_news SERIAL PRIMARY KEY,
    id_member VARCHAR(100),
    message VARCHAR(1000),
    type VARCHAR(50) CHECK (type IN ('admin', 'professor')),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_member) REFERENCES public.utilisateur(id_utilisateur)
);

-- ============================================
-- INSERT DEFAULT SKILLS
-- ============================================
INSERT INTO public.competence (nom_competence, description_competence, question1, question2, question3) VALUES
('Communication', 'Ability to convey ideas clearly and understandably.',
    'Does this person express their ideas clearly and understandably?',
    'Do they listen actively and let others finish speaking?',
    'Do they adapt their communication style depending on the audience?'),

('Teamwork', 'Ability to collaborate and contribute effectively in group settings.',
    'Does this person collaborate effectively with teammates?',
    'Are they open to others ideas and feedback?',
    'Do they support the team in achieving common goals?'),

('Problem-solving', 'Ability to address challenges analytically and effectively.',
    'Does this person approach problems calmly and analytically?',
    'Do they contribute useful solutions when challenges arise?',
    'Are they willing to seek help or input when needed?'),

('Time Management', 'Skill in prioritizing and managing tasks efficiently.',
    'Does this person prioritize tasks effectively to meet deadlines?',
    'Does this person allocate time appropriately across multiple responsibilities?',
    'Does this person avoid unnecessary delays or procrastination?'),

('Critical Thinking', 'Capacity to analyze and evaluate information constructively.',
    'Does this person analyze information carefully before forming conclusions?',
    'Does this person question assumptions or challenge ideas constructively?',
    'Does this person evaluate the strengths and weaknesses of arguments or solutions?'),

('Creativity', 'Ability to generate and explore innovative ideas and solutions.',
    'Does this person generate original or innovative ideas?',
    'Does this person approach tasks with imagination or out-of-the-box thinking?',
    'Does this person explore multiple possibilities before settling on a solution?');

-- ============================================
-- INSERT DEFAULT ADMIN USER
-- ============================================
INSERT INTO public.utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, sexe, status)
VALUES ('usr_admin_1', 'Admin', 'Super', 'ADMIN001', 'admin@growtrack.com', '$2b$10$rK3G8.3jP7Hh8G5f6D4E3C2B1A0Z9Y8X7W6V5U4T3S2R1Q0P0', 'admin', 'Mr', 'actif');

INSERT INTO public.admin (id_utilisateur, assigned_zone)
VALUES ('usr_admin_1', 'All');

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_utilisateur_role ON public.utilisateur(my_role);
CREATE INDEX idx_utilisateur_email ON public.utilisateur(email);
CREATE INDEX idx_utilisateur_status ON public.utilisateur(status);
CREATE INDEX idx_etudiant_class ON public.etudiant(id_class);
CREATE INDEX idx_professeur_departement ON public.professeur(departement);
CREATE INDEX idx_class_sector ON public.class(sector_id);
CREATE INDEX idx_projet_class ON public.projet(id_class);
CREATE INDEX idx_team_project ON public.team(id_project);
CREATE INDEX idx_signal_reporter ON public.signal(reporter_id);
CREATE INDEX idx_signal_reported ON public.signal(reported_id);
CREATE INDEX idx_stage_etudiant ON public.stage(id_etudiant);