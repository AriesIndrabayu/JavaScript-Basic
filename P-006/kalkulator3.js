const prompt = require("prompt-sync")();

function kalkulator() {
  let ulangi = true;

  while (ulangi) {
    let angka1 = parseFloat(prompt("Masukkan angka pertama: "));
    let angka2 = parseFloat(prompt("Masukkan angka kedua: "));
    let operasi = prompt("Pilih operasi [+, -, *, /,**]: ");
    let hasil;

    if (operasi === "+") {
      hasil = angka1 + angka2;
    } else if (operasi === "-") {
      hasil = angka1 - angka2;
    } else if (operasi === "*" || operasi === "x") {
      hasil = angka1 * angka2;
    } else if (operasi === "**" || operasi === "^") {
      hasil = angka1 ** angka2;
    } else if (operasi === "/") {
      if (angka2 === 0) {
        hasil = "Error: Pembagian dengan nol!";
      } else {
        hasil = angka1 / angka2;
      }
    } else {
      hasil = "Operasi tidak valid";
    }

    console.log("Hasil: " + hasil);

    let lanjut = prompt("Hitung lagi? (y/n): ").toLowerCase();
    if (lanjut !== "y") {
      ulangi = false;
      console.log("Terima kasih sudah menggunakan kalkulator!");
    }
  }
}

// Jalankan kalkulator
kalkulator();
