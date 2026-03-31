-- Professors Seed Data
-- Generated on 2026-03-28T23:55:13.512Z

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('prof_1', 'Professor', 'John', 'P123456', 'prof@growtrack.com', '$2b$10$Ueq3ME4BiBrzU1o3C7tdq.kOatEGxu5ZPVWs5dvMCyT2JKjNSQ/5m', 'prof', '2026-03-06 16:11:02.648', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('prof_1', 'PROF001', 'Computer Science', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_1', 'ProfNom1', 'ProfPrenom1', 'PR1001', 'prof1@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:22.994', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_1', 'CODEP1', 'Mathematics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_2', 'ProfNom2', 'ProfPrenom2', 'PR1002', 'prof2@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:22.997', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_2', 'CODEP2', 'Physics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_3', 'ProfNom3', 'ProfPrenom3', 'PR1003', 'prof3@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:22.999', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_3', 'CODEP3', 'Literature', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_4', 'ProfNom4', 'ProfPrenom4', 'PR1004', 'prof4@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.000', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_4', 'CODEP4', 'Economics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_5', 'ProfNom5', 'ProfPrenom5', 'PR1005', 'prof5@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.001', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_5', 'CODEP5', 'Computer Science', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_6', 'ProfNom6', 'ProfPrenom6', 'PR1006', 'prof6@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.002', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_6', 'CODEP6', 'Mathematics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_7', 'ProfNom7', 'ProfPrenom7', 'PR1007', 'prof7@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.004', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_7', 'CODEP7', 'Physics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_8', 'ProfNom8', 'ProfPrenom8', 'PR1008', 'prof8@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.005', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_8', 'CODEP8', 'Literature', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_9', 'ProfNom9', 'ProfPrenom9', 'PR1009', 'prof9@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.007', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_9', 'CODEP9', 'Economics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_10', 'ProfNom10', 'ProfPrenom10', 'PR1010', 'prof10@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.008', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_10', 'CODEP10', 'Computer Science', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_11', 'ProfNom11', 'ProfPrenom11', 'PR1011', 'prof11@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.009', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_11', 'CODEP11', 'Mathematics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_12', 'ProfNom12', 'ProfPrenom12', 'PR1012', 'prof12@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.010', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_12', 'CODEP12', 'Physics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_13', 'ProfNom13', 'ProfPrenom13', 'PR1013', 'prof13@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.011', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_13', 'CODEP13', 'Literature', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_14', 'ProfNom14', 'ProfPrenom14', 'PR1014', 'prof14@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.013', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_14', 'CODEP14', 'Economics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_15', 'ProfNom15', 'ProfPrenom15', 'PR1015', 'prof15@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.014', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_15', 'CODEP15', 'Computer Science', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_16', 'ProfNom16', 'ProfPrenom16', 'PR1016', 'prof16@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.016', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_16', 'CODEP16', 'Mathematics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_17', 'ProfNom17', 'ProfPrenom17', 'PR1017', 'prof17@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.017', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_17', 'CODEP17', 'Physics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_18', 'ProfNom18', 'ProfPrenom18', 'PR1018', 'prof18@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.018', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_18', 'CODEP18', 'Literature', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_19', 'ProfNom19', 'ProfPrenom19', 'PR1019', 'prof19@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.020', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_19', 'CODEP19', 'Economics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_20', 'ProfNom20', 'ProfPrenom20', 'PR1020', 'prof20@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.022', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_20', 'CODEP20', 'Computer Science', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_21', 'ProfNom21', 'ProfPrenom21', 'PR1021', 'prof21@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.023', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_21', 'CODEP21', 'Mathematics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_22', 'ProfNom22', 'ProfPrenom22', 'PR1022', 'prof22@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.025', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_22', 'CODEP22', 'Physics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_23', 'ProfNom23', 'ProfPrenom23', 'PR1023', 'prof23@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.026', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_23', 'CODEP23', 'Literature', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_24', 'ProfNom24', 'ProfPrenom24', 'PR1024', 'prof24@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.029', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_24', 'CODEP24', 'Economics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_25', 'ProfNom25', 'ProfPrenom25', 'PR1025', 'prof25@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.031', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_25', 'CODEP25', 'Computer Science', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_26', 'ProfNom26', 'ProfPrenom26', 'PR1026', 'prof26@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.032', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_26', 'CODEP26', 'Mathematics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_27', 'ProfNom27', 'ProfPrenom27', 'PR1027', 'prof27@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.033', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_27', 'CODEP27', 'Physics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_28', 'ProfNom28', 'ProfPrenom28', 'PR1028', 'prof28@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.034', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_28', 'CODEP28', 'Literature', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_29', 'ProfNom29', 'ProfPrenom29', 'PR1029', 'prof29@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.036', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_29', 'CODEP29', 'Economics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_30', 'ProfNom30', 'ProfPrenom30', 'PR1030', 'prof30@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.037', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_30', 'CODEP30', 'Computer Science', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_31', 'ProfNom31', 'ProfPrenom31', 'PR1031', 'prof31@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.039', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_31', 'CODEP31', 'Mathematics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_32', 'ProfNom32', 'ProfPrenom32', 'PR1032', 'prof32@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.041', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_32', 'CODEP32', 'Physics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_33', 'ProfNom33', 'ProfPrenom33', 'PR1033', 'prof33@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.043', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_33', 'CODEP33', 'Literature', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_34', 'ProfNom34', 'ProfPrenom34', 'PR1034', 'prof34@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.046', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_34', 'CODEP34', 'Economics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_35', 'ProfNom35', 'ProfPrenom35', 'PR1035', 'prof35@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.048', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_35', 'CODEP35', 'Computer Science', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_36', 'ProfNom36', 'ProfPrenom36', 'PR1036', 'prof36@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.051', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_36', 'CODEP36', 'Mathematics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_37', 'ProfNom37', 'ProfPrenom37', 'PR1037', 'prof37@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.053', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_37', 'CODEP37', 'Physics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_38', 'ProfNom38', 'ProfPrenom38', 'PR1038', 'prof38@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.059', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_38', 'CODEP38', 'Literature', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_39', 'ProfNom39', 'ProfPrenom39', 'PR1039', 'prof39@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.061', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_39', 'CODEP39', 'Economics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_40', 'ProfNom40', 'ProfPrenom40', 'PR1040', 'prof40@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.063', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_40', 'CODEP40', 'Computer Science', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_41', 'ProfNom41', 'ProfPrenom41', 'PR1041', 'prof41@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.065', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_41', 'CODEP41', 'Mathematics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_42', 'ProfNom42', 'ProfPrenom42', 'PR1042', 'prof42@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.067', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_42', 'CODEP42', 'Physics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_43', 'ProfNom43', 'ProfPrenom43', 'PR1043', 'prof43@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.069', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_43', 'CODEP43', 'Literature', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_44', 'ProfNom44', 'ProfPrenom44', 'PR1044', 'prof44@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.071', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_44', 'CODEP44', 'Economics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_45', 'ProfNom45', 'ProfPrenom45', 'PR1045', 'prof45@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.073', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_45', 'CODEP45', 'Computer Science', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_46', 'ProfNom46', 'ProfPrenom46', 'PR1046', 'prof46@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.076', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_46', 'CODEP46', 'Mathematics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_47', 'ProfNom47', 'ProfPrenom47', 'PR1047', 'prof47@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.079', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_47', 'CODEP47', 'Physics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_48', 'ProfNom48', 'ProfPrenom48', 'PR1048', 'prof48@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.082', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_48', 'CODEP48', 'Literature', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_49', 'ProfNom49', 'ProfPrenom49', 'PR1049', 'prof49@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.084', 'Mr', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_49', 'CODEP49', 'Economics', 'titulaire');

INSERT INTO utilisateur (id_utilisateur, nom, prenom, cin, email, mot_de_passe, my_role, date_creation, sexe, status) VALUES 
  ('usr_prof_50', 'ProfNom50', 'ProfPrenom50', 'PR1050', 'prof50@growtrack.com', '$2b$10$y0KZQoA8g2i9GBQwXodFx.MDu9ufcxEUF25FLGUcIeW5kIBxTM.Oq', 'prof', '2026-03-06 16:20:23.086', 'Mme', 'actif');
INSERT INTO professeur (id_utilisateur, code, departement, status_contrat) VALUES ('usr_prof_50', 'CODEP50', 'Computer Science', 'titulaire');

