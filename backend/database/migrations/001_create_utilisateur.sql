-- Migration: 001_create_utilisateur
-- Creates the base utilisateur table

CREATE TABLE IF NOT EXISTS utilisateur (
  id_member SERIAL PRIMARY KEY,
  cin VARCHAR(50) UNIQUE,
  phone VARCHAR(50),
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'student', 'supervisor', 'professor', 'coach')),
  full_name VARCHAR(50),
  email VARCHAR(50) NOT NULL UNIQUE,
  profile_picture VARCHAR(50), 
  description VARCHAR(1000), 
  date_add TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_utilisateur_email ON utilisateur(email);
CREATE INDEX IF NOT EXISTS idx_utilisateur_role ON utilisateur(role);
