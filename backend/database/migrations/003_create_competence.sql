-- Migration: 003_create_competence
-- Creates the competence (skill) table

CREATE TABLE IF NOT EXISTS competence (
  id_competence SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  description VARCHAR(500),
  categorie VARCHAR(50),
  niveau_min INTEGER DEFAULT 1 CHECK (niveau_min >= 1 AND niveau_min <= 5),
  image VARCHAR(200),
  date_add TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_competence_nom ON competence(nom);
CREATE INDEX IF NOT EXISTS idx_competence_categorie ON competence(categorie);
