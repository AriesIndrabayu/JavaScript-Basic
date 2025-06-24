const prompt = require("prompt-sync")();

// Validasi angkanya
/*
Validasi: Cuma cek sekali setelah user isi input.
Respon saat salah: Tampilkan pesan error dan kembalikan null.
Return Value: Bisa return angka valid atau null.
User Experience: Kurang ramah. Kalau salah, program tetap lanjut pakai null dan bisa error kalau tidak ditangani.
Keamanan Kode: Kurang aman, karena ada kemungkinan data null dipakai di operasi berikutnya.
*/
function mintaAngka(pesan) {
  const angka = parseFloat(prompt(pesan));
  if (isNaN(angka)) {
    console.log("Error: Input harus berupa angka!");
    return null;
  }
  return angka;
}

// Operasi-operasi
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
  return b === 0 ? "Error: Pembagi dengan nol!" : a / b;
}
function pangkat(a, b) {
  return a ** b;
}
function modulus(a, b) {
  return b === 0 ? "Error: Modulus dengan nol!" : a % b;
}
function akar(a, p) {
  if (p === 0) return "Error: Pangkat akar tidak boleh nol.";
  if (a < 0 && p % 2 === 0)
    return "Error: Tidak bisa akar genap dari bilangan negatif.";
  return a ** (1 / p);
}

// Main kalkulator
function kalkulator() {
  /*
  1. Validasi Operasi
  Validasi operasi dilakukan setelah user memasukkan angka pertama. Jika operasi tidak valid, akan tetap minta angka dan proses tetap lanjut, lalu hasilnya "Operasi tidak valid".

  2. Alur Input Angka
  - Selalu minta angka pertama dulu, apapun operasinya.
  - Kalau operasi "akar", minta pangkat akar.
  - Operasi lain, minta angka kedua.

  3. Pesan ke Pengguna
  Pesan sederhana, hanya muncul hasil dan konfirmasi lanjut/tidak.

  4. Handling Kesalahan Angka
  memanggil fungsi mintaAngka() yang diasumsikan sudah ada validasi angka di dalamnya. Kalau user salah input (bukan angka), proses ulang (pakai continue).

  5. Struktur Kode
  Struktur bercampur antara pengecekan dan switch.
  Handling operasi "akar" dipisahkan sebelum switch.
  */
  while (true) {
    const operasi = prompt("Pilih operasi [+ - * / ** % akar]: ").toLowerCase();
    const angka1 = mintaAngka("Masukkan angka pertama: ");
    if (angka1 === null) continue;

    let hasil;

    if (operasi === "akar") {
      const p = mintaAngka("Akar pangkat berapa (contoh 2 atau 3): ");
      if (p === null) continue;
      hasil = akar(angka1, p);
    } else {
      const angka2 = mintaAngka("Masukkan angka kedua: ");
      if (angka2 === null) continue;

      switch (operasi) {
        case "+":
          hasil = tambah(angka1, angka2);
          break;
        case "-":
          hasil = kurang(angka1, angka2);
          break;
        case "*":
        case "x":
          hasil = kali(angka1, angka2);
          break;
        case "/":
          hasil = bagi(angka1, angka2);
          break;
        case "**":
          hasil = pangkat(angka1, angka2);
          break;
        case "%":
          hasil = modulus(angka1, angka2);
          break;
        default:
          hasil = "Operasi tidak valid";
      }
    }

    console.log("Hasil:", hasil);
    const lanjut = prompt("Hitung lagi? (y/t): ").toLowerCase();
    if (lanjut !== "y") {
      console.log("Terima kasih sudah menggunakan kalkulator!");
      break;
    }
  }
}

kalkulator();
