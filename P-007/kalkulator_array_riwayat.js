const prompt = require("prompt-sync")();

/* 
Fungsi validasi: Memastikan input adalah angka 
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
  console.log("=== Kalkulator Sederhana dengan Riwayat ===");
  let riwayatHasil = []; // Array untuk menyimpan penjelasan hasil perhitungan

  while (true) {
    console.log("\n Pilih operasi: +, -, *, /, **, %, akar");
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
    let angka2,
      hasil,
      penjelasan = "";

    switch (operasi) {
      case "+":
        angka2 = mintaAngka("Masukkan angka kedua: ");
        hasil = tambah(angka1, angka2);
        penjelasan = `Operasi Penjumlahan:\n   ${angka1} + ${angka2} = ${hasil}`;
        break;

      case "-":
        angka2 = mintaAngka("Masukkan angka kedua: ");
        hasil = kurang(angka1, angka2);
        penjelasan = `Operasi Pengurangan:\n   ${angka1} - ${angka2} = ${hasil}`;
        break;

      case "*":
      case "x":
        angka2 = mintaAngka("Masukkan angka kedua: ");
        hasil = kali(angka1, angka2);
        penjelasan = `Operasi Perkalian:\n   ${angka1} x ${angka2} = ${hasil}`;
        break;

      case "/":
        angka2 = mintaAngka("Masukkan angka kedua: ");
        hasil = bagi(angka1, angka2);
        penjelasan = `Operasi Pembagian:\n   ${angka1} / ${angka2} = ${hasil}`;
        break;

      case "**":
        angka2 = mintaAngka("Masukkan angka pangkat: ");
        hasil = pangkat(angka1, angka2);
        penjelasan = `Operasi Pangkat:\n   ${angka1} ** ${angka2} = ${hasil}`;
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
        penjelasan = `Operasi Akar:\n   ${angka1} akar ${akarKe} = ${hasil}`;
        break;
    }

    console.log("✅ Hasil perhitungan adalah: " + hasil);
    riwayatHasil.push(penjelasan); // Simpan penjelasan ke Array

    let lanjut = prompt("Ingin menghitung lagi? (y/n): ").toLowerCase();
    if (lanjut !== "y") {
      console.log("\n👋 Terima kasih telah menggunakan kalkulator!");
      break;
    }
  }
  console.log("\n=== Riwayat Hasil Perhitungan ===");
  if (riwayatHasil.length === 0) {
    console.log("Belum ada perhitungan yang dilakukan.");
  } else {
    riwayatHasil.forEach(function (item, index) {
      console.log(`${index + 1}. ${item}\n`);
    });
  }

  console.log("=== Terima kasih telah menggunakan kalkulator ===");
}

// Jalankan kalkulator
kalkulator();
