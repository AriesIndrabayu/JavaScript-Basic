const prompt = require("prompt-sync")();

/* 
Fungsi validasi: Memastikan input adalah angka 
Validasi: Cek berulang-ulang sampai user isi angka yang valid.
Respon saat salah: Tampilkan pesan error dan minta ulang inputnya.
Return Value: Selalu return angka valid, tidak ada kemungkinan null.
User Experience: Lebih ramah. User dipaksa input angka valid sebelum lanjut.
Keamanan Kode: Lebih aman, pasti dapet angka valid sebelum proses lanjut.
*/
function mintaAngka(pesan) {
  let input;
  do {
    input = prompt(pesan);
    if (isNaN(input)) {
      console.log("❌ Input harus berupa angka. Coba lagi.");
    }
  } while (isNaN(input));
  return parseFloat(input);
}

/* Fungsi operasi matematika dasar */
function tambah(a, b) {
  return a + b;
}

function kurang(a, b) {
  return a - b;
}

function kali(a, b) {
  return a * b;
}

function bagi(a, b) {
  if (b === 0) return "❌ Error: Pembagian dengan nol!";
  return a / b;
}

function pangkat(a, b) {
  return a ** b;
}

function modulus(a, b) {
  if (b === 0) return "❌ Error: Modulus dengan nol!";
  return a % b;
}

function akar(a, pangkat) {
  if (pangkat === 0) return "❌ Error: Pangkat akar tidak boleh nol.";
  if (a < 0 && pangkat % 2 === 0)
    return "❌ Error: Tidak bisa akar genap dari bilangan negatif.";
  return a ** (1 / pangkat);
}

/* Fungsi utama kalkulator */
function kalkulator() {
  console.log("=== Kalkulator Sederhana ===");
  /*
  1. Validasi Operasi
  Validasi operasi dilakukan di awal, sebelum meminta angka. Jika operasi tidak valid, langsung muncul pesan error dan perulangan kembali ke atas tanpa minta angka dulu.
  Lebih rapi dan efisien, tidak buang waktu minta input angka kalau operasinya salah.

  2. Alur Input Angka
  Mirip, tetapi lebih terstruktur:
    - Setelah validasi operasi, minta angka pertama.
    - Jika butuh angka kedua (operasi selain "akar"), baru minta angka kedua atau angka pangkat (untuk "**").
    - Pesan yang diminta untuk masing-masing angka lebih spesifik, contohnya "Masukkan angka pangkat:" untuk operasi pangkat, lebih informatif.
  
  3. Pesan ke Pengguna
  Ada pesan pembuka "=== Kalkulator Sederhana ===".
  Petunjuk operasi yang lebih jelas dengan ikon 📌.
  Hasil dihias dengan ikon 🧮.
  Konfirmasi akhir pakai ikon 👋.
  Pesan error saat salah input operasi pakai ikon ⚠.
  Secara tampilan, kode 2 lebih ramah pengguna.

  4. Handling Kesalahan Angka
  memanggil fungsi mintaAngka() yang diasumsikan sudah ada validasi angka di dalamnya. Kalau user salah input (bukan angka), proses ulang (pakai continue).

  5. Struktur Kode
  Struktur lebih rapi dan konsisten, semua operasi ada dalam switch.
  Memudahkan pembacaan dan pengembangan di masa depan.
  */
  while (true) {
    console.log("\n📌 Pilih operasi: +, -, *, /, **, %, akar");
    let operasi = prompt("Operasi yang dipilih: ").toLowerCase();

    // Validasi operasi sebelum lanjut
    if (
      operasi !== "+" &&
      operasi !== "-" &&
      operasi !== "*" &&
      operasi !== "x" &&
      operasi !== "/" &&
      operasi !== "**" &&
      operasi !== "%" &&
      operasi !== "akar"
    ) {
      console.log("⚠ ERROR: Operasi tidak valid, silakan coba lagi");
      continue;
    }

    let angka1 = mintaAngka("Masukkan angka pertama: ");
    let angka2, hasil;

    switch (operasi) {
      case "+":
        angka2 = mintaAngka("Masukkan angka kedua: ");
        hasil = tambah(angka1, angka2);
        break;

      case "-":
        angka2 = mintaAngka("Masukkan angka kedua: ");
        hasil = kurang(angka1, angka2);
        break;

      case "*":
      case "x":
        angka2 = mintaAngka("Masukkan angka kedua: ");
        hasil = kali(angka1, angka2);
        break;

      case "/":
        angka2 = mintaAngka("Masukkan angka kedua: ");
        hasil = bagi(angka1, angka2);
        break;

      case "**":
        angka2 = mintaAngka("Masukkan angka pangkat: ");
        hasil = pangkat(angka1, angka2);
        break;

      case "%":
        angka2 = mintaAngka("Masukkan angka kedua: ");
        hasil = modulus(angka1, angka2);
        break;

      case "akar":
        let akarKe = mintaAngka(
          "Akar pangkat berapa (misal 2 untuk akar kuadrat): "
        );
        hasil = akar(angka1, akarKe);
        break;
    }

    console.log("🧮 Hasil: " + hasil);

    let lanjut = prompt("Ingin menghitung lagi? (y/n): ").toLowerCase();
    if (lanjut !== "y") {
      console.log("\n👋 Terima kasih telah menggunakan kalkulator!");
      break;
    }
  }
}

// Jalankan kalkulator
kalkulator();
