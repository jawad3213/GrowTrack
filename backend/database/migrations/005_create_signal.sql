-- Migration: 005_create_signal
-- Creates the signal table

CREATE TABLE IF NOT EXISTS signal (
  id_signal SERIAL PRIMARY KEY,
  id_etudiant INTEGER REFERENCES etudiant(id_etudiant) ON DELETE CASCADE,
  id_professeur INTEGER,
  type_signal VARCHAR(100),
  description TEXT,
  priorite VARCHAR(20) DEFAULT 'moyenne' CHECK (priorite IN ('basse', 'moyenne', 'haute', 'critique')),
  status VARCHAR(20) DEFAULT 'en_attente' CHECK (status IN ('en_attente', 'en_cours', 'resolu')),
  resolution TEXT,
  date_signal DATE DEFAULT CURRENT_DATE,
  date_resolution DATE,
  date_add TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_signal_id_etudiant ON signal(id_etudiant);
CREATE INDEX IF NOT EXISTS idx_signal_status ON signal(status);
CREATE INDEX IF NOT EXISTS idx_signal_date ON signal(date_signal);
