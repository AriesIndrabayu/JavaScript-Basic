// 1. Contoh sederhana
const umur = 18;
const statUmur = umur >= 17 ? "Dewasa" : "Anak-anak";
console.log(statUmur); // Dewasa

// 2. Ternary dengan ekspresi matematika
const angka = 7;
console.log(angka % 2 === 0 ? "Genap" : "Ganjil"); // Ganjil

// 3. Ternary dengan pemanggilan fungsi
function sapa(pagi) {
  return pagi ? "Selamat pagi!" : "Halo!";
}

const jam = 8;
console.log(jam < 12 ? sapa(true) : sapa(false)); // Selamat pagi!

// 4. Ternary Bersarang untuk Menentukan Grade + Lulus/Gagal
const nilai = 72;
const statLulus =
  nilai >= 90
    ? "A - Sangat Baik"
    : nilai >= 80
    ? "B - Baik"
    : nilai >= 70
    ? "C - Cukup"
    : nilai >= 60
    ? "D - Kurang"
    : "E - Tidak Lulus";

console.log(`Hasil Ujian: ${statLulus}`);

// 5. Ternary dengan Fungsi di dalamnya
function dapatDiskon(tipe) {
  return tipe === "member"
    ? "Diskon 20%"
    : tipe === "pelajar"
    ? "Diskon 10%"
    : tipe === "umum"
    ? "Tidak ada diskon"
    : "Tipe tidak dikenal";
}

const tipeUser = "pelajar";
console.log(`Status: ${dapatDiskon(tipeUser)}`);

// 6. Ternary dengan ekspresi manipulasi array
const daftar = ["apel", "jeruk", "mangga"];
const tampil =
  daftar.length > 0
    ? `Jumlah item: ${daftar.length}, daftar: ${daftar.join(", ")}`
    : "Tidak ada data";

console.log(tampil);

// 7. Ternary sebagai nilai return dalam fungsi
function cekLogin(user) {
  return user && user.isLogin
    ? `Selamat datang, ${user.nama}`
    : "Silakan login terlebih dahulu.";
}

const user = { nama: "Bayu", isLogin: true };
console.log(cekLogin(user));

// 8. Ternary dalam HTML
const isDarkMode = true;

const className = isDarkMode ? "dark-theme" : "light-theme";
const content = isDarkMode ? "Mode Gelap Aktif" : "Mode Terang Aktif";

// Buat string HTML biasa
const html = `<div class="${className}">${content}</div>`;

console.log("\nHTML Output:");
console.log(html);
