// Langkah 3: Implementing REST API (routes)
const express = require('express');
const movieService = require('../services/movieService');

const router = express.Router();

// GET /movies : list semua movie (service SELECT)
router.get('/movies', async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    res.json({ message: 'Berhasil mengambil semua movie', data: movies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// GET /movie/:id : satu movie berdasarkan id (service SELECT by id)
router.get('/movie/:id', async (req, res) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie tidak ditemukan' });
    }
    res.json({ message: 'Berhasil mengambil movie', data: movie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// POST /movie : tambah movie baru (service ADD / INSERT)
router.post('/movie', async (req, res) => {
  try {
    const { title, genre, year } = req.body;
    if (!title || !genre || !year) {
      return res
        .status(400)
        .json({ message: 'title, genre, dan year wajib diisi' });
    }
    const movie = await movieService.addMovie({ title, genre, year });
    res.status(201).json({ message: 'Movie berhasil ditambahkan', data: movie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// PATCH/PUT /movie/:id : ubah movie berdasarkan id (service UPDATE)
const updateHandler = async (req, res) => {
  try {
    const result = await movieService.updateMovie(req.params.id, req.body);
    if (result === null) {
      return res
        .status(400)
        .json({ message: 'Tidak ada data valid yang dikirim (title, genre, year)' });
    }
    if (result === false) {
      return res.status(404).json({ message: 'Movie tidak ditemukan' });
    }
    res.json({ message: 'Movie berhasil diubah', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};
router.patch('/movie/:id', updateHandler);
router.put('/movie/:id', updateHandler);

// DELETE /movie/:id : hapus movie berdasarkan id (service DELETE)
router.delete('/movie/:id', async (req, res) => {
  try {
    const deleted = await movieService.deleteMovie(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Movie tidak ditemukan' });
    }
    res.json({ message: 'Movie berhasil dihapus' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

module.exports = router;
