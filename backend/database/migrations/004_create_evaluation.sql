-- Migration: 004_create_evaluation
-- Creates the evaluation table

CREATE TABLE IF NOT EXISTS evaluation (
  id_evaluation SERIAL PRIMARY KEY,
  id_etudiant INTEGER REFERENCES etudiant(id_etudiant) ON DELETE CASCADE,
  id_professeur INTEGER,
  id_classe INTEGER,
  type_evaluation VARCHAR(50),
  note DECIMAL(5,2),
  competences JSONB,
  commentaire TEXT,
  date_evaluation DATE DEFAULT CURRENT_DATE,
  date_add TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_evaluation_id_etudiant ON evaluation(id_etudiant);
CREATE INDEX IF NOT EXISTS idx_evaluation_id_professeur ON evaluation(id_professeur);
CREATE INDEX IF NOT EXISTS idx_evaluation_id_classe ON evaluation(id_classe);
CREATE INDEX IF NOT EXISTS idx_evaluation_date ON evaluation(date_evaluation);
