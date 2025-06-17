// Proyek Kalkulator sederhana
/*
kisi-kisi:
- User memasukan dua angka
- User boleh milih operasi aritmatikanya: tambah, kurang, kali dan bagi.
- program akan menghitung hasilnya:
*/

let angka1 = parseFloat(prompt("Masukkan angka pertama: "));
let angka2 = parseFloat(prompt("Masukkan angka kedua:"));
let operasi = prompt("Pilih operasi [+, -, *, /]:");
let hasil;

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

alert("Hasil: " + hasil);

/*
kode diatas akan error jika dieksekusi melalui terminal, solusinya ada di pertemuan selanjutnya.
*/
