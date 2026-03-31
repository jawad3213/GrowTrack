INSERT INTO public.utilisateur (id_utilisateur, nom, prenom, cin, sexe, my_role, email, mot_de_passe, status) 
VALUES ('admin_1', 'Admin', 'Super', 'A123456', 'Mr', 'admin', 'admin@growtrack.com', '$2b$10$sn1tsRgufMjTcsoQEQmpUOoW2IK3D1vkmde3VGCTL.yvBL4AtupD6', 'actif')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.admin (id_utilisateur, is_superadmin) 
VALUES ('admin_1', true)
ON CONFLICT (id_utilisateur) DO NOTHING;

INSERT INTO public.utilisateur (id_utilisateur, nom, prenom, cin, sexe, my_role, email, mot_de_passe, status) 
VALUES ('prof_1', 'Professor', 'John', 'P123456', 'Mr', 'prof', 'prof@growtrack.com', '$2b$10$Ueq3ME4BiBrzU1o3C7tdq.kOatEGxu5ZPVWs5dvMCyT2JKjNSQ/5m', 'actif')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.professeur (id_utilisateur, code, departement, status_contrat) 
VALUES ('prof_1', 'PROF001', 'Computer Science', 'titulaire')
ON CONFLICT (id_utilisateur) DO NOTHING;

INSERT INTO public.utilisateur (id_utilisateur, nom, prenom, cin, sexe, my_role, email, mot_de_passe, status) 
VALUES ('student_1', 'Student', 'Jane', 'S123456', 'Mme', 'etudiant', 'student@growtrack.com', '$2b$10$usovB1ZpXA0jnCMgPSzv8OAI8N02UJdKv3z8mnKyBUaQFdNb.bOwi', 'actif')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.etudiant (id_utilisateur, code_apogee, date_inscription) 
VALUES ('student_1', 'APO123', CURRENT_DATE)
ON CONFLICT (id_utilisateur) DO NOTHING;
