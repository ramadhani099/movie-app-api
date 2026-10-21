# Movie App REST API (Node.js + Express + MySQL)

## Struktur Folder

```
movie-app/
├── app.js                    # entry point server Express
├── db.js                     # Langkah 1: koneksi database
├── services/
│   └── movieService.js       # Langkah 2: query DML (SELECT, INSERT, UPDATE, DELETE)
├── routes/
│   └── movieRoutes.js        # Langkah 3: endpoint REST API
├── schema.sql                # skema tabel + data awal
├── .env.example
└── package.json
```

## Cara Menjalankan

1. Import `schema.sql` ke MySQL (Workbench / phpMyAdmin / CLI):
   `mysql -u root -p < schema.sql`
2. Salin `.env.example` menjadi `.env`, lalu isi `DB_PASSWORD` sesuai MySQL kamu.
3. Install dependency: `npm install`
4. Jalankan server: `npm start` (atau `npm run dev` untuk auto-reload)
5. Server jalan di `http://localhost:3000`

## Langkah 4: Testing di Postman

| # | Method | URL | Body (raw, JSON) |
|---|--------|-----|------------------|
| 1 | GET | `http://localhost:3000/movies` | - |
| 2 | GET | `http://localhost:3000/movie/1` | - |
| 3 | POST | `http://localhost:3000/movie` | `{"title": "Tenet", "genre": "Sci-Fi", "year": 2020}` |
| 4 | PATCH | `http://localhost:3000/movie/1` | `{"title": "Inception (Updated)"}` |
| 5 | DELETE | `http://localhost:3000/movie/1` | - |

Untuk POST dan PATCH: tab **Body** → pilih **raw** → ubah tipe ke **JSON**.

Tes juga kasus error untuk bukti di laporan:
- `GET /movie/9999` → 404 "Movie tidak ditemukan"
- `POST /movie` dengan body kosong → 400

   ## Hasil Pengujian Postman

   ### GET semua movie
   ![GET all movies](screenshots/get-all-movies.png)

   ### GET satu movie
   ![GET movie by id](screenshots/get-movie-by-id.png)

   ### POST tambah movie
   ![POST movie](screenshots/post-movie.png)

   ### PATCH ubah movie
   ![PATCH movie](screenshots/patch-movie.png)

   ### DELETE hapus movie
   ![DELETE movie](screenshots/delete-movie.png)