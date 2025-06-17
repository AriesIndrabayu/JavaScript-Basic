// Import dan Setup:
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
/*
Pertama-tama, kita panggil dulu modul readline dari Node.js. 
Ini penting banget karena kita butuh input dari user lewat terminal. 
Lalu kita bikin interface rl supaya bisa baca input dan kasih output langsung lewat console.
*/

rl.question("Masukkan angka pertama: ", function (angka1) {
  rl.question("Masukkan angka kedua:", function (angka2) {
    rl.question("Pilih operasi [+, -, *, /]:", function (operasi) {
      angka1 = parseFloat(angka1);
      angka2 = parseFloat(angka2);

      if (operasi == "+") {
        hasil = angka1 + angka2;
      } else if (operasi == "-") {
        hasil = angka1 - angka2;
      } else if (operasi == "*" || operasi == "x") {
        hasil = angka1 * angka2;
      } else if (operasi == "/") {
        hasil = angka1 / angka2;
      } else {
        hasil = "Operasi tidak valid";
      }

      console.log("Hasil: " + hasil);
      rl.close();
    });
  });
});
