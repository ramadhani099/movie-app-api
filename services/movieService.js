// Langkah 2: Implementing Data Manipulation Language (DML)
const db = require('../db');

// SELECT * : ambil semua data
async function getAllMovies() {
  const [rows] = await db.query('SELECT * FROM movies');
  return rows;
}

// SELECT by id : ambil satu data berdasarkan id
async function getMovieById(id) {
  const [rows] = await db.query('SELECT * FROM movies WHERE id = ?', [id]);
  return rows[0] || null;
}

// INSERT : tambah data baru
async function addMovie({ title, genre, year }) {
  const [result] = await db.query(
    'INSERT INTO movies (title, genre, year) VALUES (?, ?, ?)',
    [title, genre, year]
  );
  return { id: result.insertId, title, genre, year };
}

// UPDATE by id : ubah data (hanya kolom yang dikirim di payload)
async function updateMovie(id, data) {
  const allowed = ['title', 'genre', 'year'];
  const fields = Object.keys(data).filter((key) => allowed.includes(key));

  if (fields.length === 0) return null;

  const setClause = fields.map((f) => `${f} = ?`).join(', ');
  const values = fields.map((f) => data[f]);

  const [result] = await db.query(
    `UPDATE movies SET ${setClause} WHERE id = ?`,
    [...values, id]
  );

  if (result.affectedRows === 0) return false; // id tidak ditemukan
  return getMovieById(id);
}

// DELETE by id : hapus data
async function deleteMovie(id) {
  const [result] = await db.query('DELETE FROM movies WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
