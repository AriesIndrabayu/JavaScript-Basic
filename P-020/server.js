const express = require("express");
/**
 * Baris ini mengimpor module express ke dalam file JavaScript.
express adalah framework web untuk Node.js yang memudahkan dalam membuat aplikasi backend atau API. Dibandingkan dengan Node.js native, Express menyediakan banyak fitur tambahan untuk routing, middleware, dan lainnya.

Fungsi require("express") akan mencari dan mengambil modul Express yang sudah terinstal melalui npm install express.
 */
const app = express();
/**
etelah Express dimuat, kita membuat instance aplikasi web dengan memanggil fungsi express().
app ini akan menjadi objek utama yang digunakan untuk:
- Mendefinisikan routing (misalnya app.get(), app.post())
- Menambahkan middleware (misalnya app.use() untuk parsing request)
- Menjalankan server dengan app.listen()


Ilustrasi Sederhana:
Bayangkan express adalah seperti blueprint atau cetak biru membuat web server, dan app adalah instance dari blueprint tersebut.

Setelah ini, kita bisa melanjutkan dengan:
app.get("/", (req, res) => {
  res.send("Halo dunia!");
});

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});

 */
const cors = require("cors"); // ✅ Tambahkan ini
const dotenv = require("dotenv");
const catatanV1 = require("./routes/v1/catatan");
const catatanV2 = require("./routes/v2/catatan");

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 7000;

// Middleware agar bisa baca JSON
app.use(cors()); // ✅ Aktifkan CORS agar frontend bisa ambil data
// ⛔️ Nonaktifkan cache untuk file JS
app.use(
  express.static("frontend", {
    setHeaders: (res, path) => {
      if (path.endsWith(".js") || path.endsWith(".html")) {
        res.set("Cache-Control", "no-store");
      }
    },
  })
);
app.use(express.json());
/**
app.use() adalah method dari Express untuk menambahkan middleware ke dalam aplikasi.

Middleware adalah fungsi yang dijalankan sebelum request diproses lebih lanjut (misalnya sebelum masuk ke app.get(...), dll).

express.json()
Ini adalah middleware bawaan Express yang berfungsi untuk mengubah (parse) JSON yang dikirim oleh client ke dalam bentuk req.body.

Jadi kalau client mengirim data JSON seperti ini:
{
  "nama": "Bayu",
  "umur": 25
}
Maka kamu bisa mengaksesnya dalam route handler seperti ini:
app.post("/data", (req, res) => {
  console.log(req.body.nama); // Output: Bayu
});
 */

// Prefix versi
app.use("/api/v1", catatanV1);
app.use("/api/v2", catatanV2);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
