-- Jalankan file ini di MySQL (Workbench / phpMyAdmin / CLI)
-- Kalau kamu sudah punya skema dari Mission Intermediate BE 1, sesuaikan nama tabel & kolomnya.

CREATE DATABASE IF NOT EXISTS movie_app;
USE movie_app;

CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  year INT NOT NULL
);

INSERT INTO movies (title, genre, year) VALUES
  ('Inception', 'Sci-Fi', 2010),
  ('The Dark Knight', 'Action', 2008),
  ('Interstellar', 'Sci-Fi', 2014);
