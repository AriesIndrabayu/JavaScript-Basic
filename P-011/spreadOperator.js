const satu = [1, 2];
const dua = [3, 4];
// Menggabungkan array dengan Spread
const gabung = [...satu, ...dua];
console.log("\n1. Contoh Menggabungkan Array dengan Spread:");
console.log("array satu", satu);
console.log("array dua", dua);
console.log("Gabungan", gabung);

// Salin & Update Object dengan Spread
const data = { nama: "Bayu", umur: 25 };
const dataBaru = { ...data, umur: 26 };
console.log("\n2. Contoh Menyalin/Update Object dengan Spread:");
console.log("data lama:", data);
console.log("data baru", dataBaru);

// Bisakah Spread Menghapus data?
/*
Spread operator tidak bisa menghapus properti atau elemen, tapi bisa digunakan untuk menyalin sebagian data sambil "mengabaikan" bagian yang ingin dihapus.
*/

// Misalnya ingin "menghapus" properti umur dari object data:
const { umur, ...dataTanpaUmur } = data;
console.log(`\n3. ingin "menghapus" properti umur dari object data:`);
console.log(dataTanpaUmur); // { nama: 'Bayu' }
console.log(
  `Ini bukan karena spread operator menghapus umur, tapi karena kita menggunakan destructuring untuk memisahkan dan hanya menyebarkan sisanya (...dataTanpaUmur).\n`
);

// Cara Menghapus Elemen dari Array (dengan spread sebagai bagian solusinya)
console.log(`\n4. ingin menghapus elemen ke-1 (2) dari gabungan array diatas:`);
// Hapus elemen di index ke-1
const angkaBaru = [...gabung.slice(0, 1), ...gabung.slice(2)];
console.log("Array Lama:", gabung);
console.log("Array Baru:", angkaBaru);
