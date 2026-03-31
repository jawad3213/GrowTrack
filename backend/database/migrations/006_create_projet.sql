-- Migration: 006_create_projet
-- Creates the projet (project) table

CREATE TABLE IF NOT EXISTS projet (
  id_projet SERIAL PRIMARY KEY,
  id_etudiant INTEGER REFERENCES etudiant(id_etudiant) ON DELETE CASCADE,
  id_professeur INTEGER,
  titre VARCHAR(200) NOT NULL,
  description TEXT,
  date_debut DATE DEFAULT CURRENT_DATE,
  date_fin DATE,
  status VARCHAR(20) DEFAULT 'en_cours' CHECK (status IN ('en_cours', 'termine', 'en_attente')),
  date_add TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_projet_id_etudiant ON projet(id_etudiant);
CREATE INDEX IF NOT EXISTS idx_projet_id_professeur ON projet(id_professeur);
CREATE INDEX IF NOT EXISTS idx_projet_status ON projet(status);
