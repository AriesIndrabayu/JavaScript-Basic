const prompt = require("prompt-sync")();

function kalkulator() {
  let angka1 = parseFloat(prompt("Masukkan angka pertama: "));
  let angka2 = parseFloat(prompt("Masukkan angka kedua: "));
  let operasi = prompt("Pilih operasi [+, -, *, /]: ");
  let hasil;

  if (operasi === "+") {
    hasil = angka1 + angka2;
  } else if (operasi === "-") {
    hasil = angka1 - angka2;
  } else if (operasi === "*" || operasi === "x") {
    hasil = angka1 * angka2;
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
}

// Panggil fungsi kalkulator
kalkulator();
