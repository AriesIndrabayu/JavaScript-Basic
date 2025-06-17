/*
A. Statement if
struktur kode:
if (kondisi) {
  // blok kode jika kondisi benar
}
*/
let nilai = 80;
if (nilai >= 75) {
  console.log("Selamat, Anda lulus!");
}

/*
B. Statement if...else
struktur kode:
if (kondisi) {
  // jika benar
} else {
  // jika salah
}
*/
if (nilai >= 75) {
  console.log("Lulus");
} else {
  console.log("Tidak Lulus");
}

/*
C. Statement else if
struktur kode:
if (kondisi 1) {
  // jika benar
}else if (kondisi 2) {
  // jika benar
} else {
  // jika salah
}
*/
if (nilai >= 90) {
  console.log("A");
} else if (nilai >= 80) {
  console.log("B");
} else if (nilai >= 70) {
  console.log("C");
} else {
  console.log("D");
}

/*
D. Statement switch
struktur kode:
switch (ekspresi) {
  case nilai1:
    // blok kode
    break;
  case nilai2:
    // blok kode
    break;
  default:
    // jika tidak cocok
}
*/
let hari = "Senin";
switch (hari) {
  case "Senin":
    console.log("Awal pekan");
    break;
  case "Jumat":
    console.log("Akhir pekan kerja");
    break;
  default:
    console.log("Hari biasa");
}
