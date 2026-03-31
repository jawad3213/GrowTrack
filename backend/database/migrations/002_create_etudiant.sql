-- Migration: 002_create_etudiant
-- Creates the etudiant (student) table

CREATE TABLE IF NOT EXISTS etudiant (
  id_etudiant SERIAL PRIMARY KEY,
  id_member INTEGER REFERENCES utilisateur(id_member) ON DELETE CASCADE,
  cne VARCHAR(50) UNIQUE,
  id_classe INTEGER,
  nom VARCHAR(50),
  prenom VARCHAR(50),
  email VARCHAR(50),
  telephone VARCHAR(50),
  date_naissance DATE,
  date_add TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_etudiant_id_member ON etudiant(id_member);
CREATE INDEX IF NOT EXISTS idx_etudiant_id_classe ON etudiant(id_classe);
CREATE INDEX IF NOT EXISTS idx_etudiant_cne ON etudiant(cne);
