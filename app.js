require('dotenv').config();
const express = require('express');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware agar body JSON (payload dari Postman) bisa dibaca
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Movie App API berjalan' });
});

app.use('/', movieRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
