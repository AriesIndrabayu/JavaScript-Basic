const angka = [1, 2, 3, 4, 15, 5, 20, 25, 30];
const buah = ["apel", "jeruk", "pisang"];
const user = [
  { id: 1, nama: "Dudung" },
  { id: 2, nama: "Ujang" },
  { id: 3, nama: "Asep" },
];
const nestedArray = [1, 2, [3, 4, [5]]];
console.log("\n Data Awal:");
console.log("\n==========================\n");
console.log("Angka:", angka);
console.log("Buah:", buah);
console.log("User:", user);
console.log("Array bersarang (nested):", nestedArray);
console.log("\n==========================\n");
/**
 * 1. array.map()
 * array.map() digunakan untuk memanipulasi setiap elemen dalam array dan menghasilkan array baru
 */

const kuadrat = angka.map((nilai) => {
  return nilai * nilai; // mengkuadratkan setiap elemen
});

console.log("\nContoh .map()");
console.log(kuadrat);

/**
 * 2. array.filter()
 * array.filter() digunakan untuk menyaring elemen berdasarkan kondisi tertentu dan menghasilkan array baru
 */
const lebihDari20 = angka.filter((nilai) => {
  return nilai > 20;
});

console.log("\nContoh .filter()");
console.log(lebihDari20);

/**
 * 3. array.reduce()
 * array.reduce() digunakan untuk "mereduksi" array menjadi satu nilai, misalnya menjumlahkan
 */
const total = angka.reduce((accumulator, current) => {
  return accumulator + current; // menjumlahkan semua elemen
}, 0); // nilai awal accumulator

console.log("\nContoh .reduce()");
console.log(total);

/**
 * 4. array.forEach()
 * array.forEach() digunakan untuk mengeksekusi fungsi pada setiap elemen array, tanpa menghasilkan array baru
 */
console.log("\nContoh .forEach()");
buah.forEach((item, index) => {
  console.log(`${index + 1}. ${item}`);
});

/**
 * 5. array.some() dan array.every()
 * some() mengecek apakah **minimal satu** elemen memenuhi kondisi
 * every() mengecek apakah **semua** elemen memenuhi kondisi
 */
// contoh .some()
console.log("\nContoh .some()");
const adaYangKurangDari20 = angka.some((n) => n < 20);
console.log(adaYangKurangDari20);

// contoh .every()
console.log("\nContoh .every()");
const semuaLebihDari60 = angka.every((n) => n > 60);
console.log(semuaLebihDari60);

/**
 * 6. array.find() dan array.findIndex()
 * find() mengembalikan elemen pertama yang cocok
 * findIndex() mengembalikan index dari elemen pertama yang cocok
 */
console.log("\nContoh .find()");
const ditemukan = user.find((u) => u.nama === "Dudung");
console.log(ditemukan);

console.log("\nContoh .findIndex()");
const indexAsep = user.findIndex((u) => u.nama === "Asep");
console.log("Index Asep:", indexAsep);

/**
 * 7. array.flat()
 * array.flat() digunakan untuk "meratakan" array bersarang (nested)
 */
const rata1 = nestedArray.flat(1); // meratakan 1 level
console.log("\nContoh .flat(1) meratakan 1 level");
console.log(rata1);

console.log("\nContoh .flat(Infinity) meratakan semua level");
const rataSemua = nestedArray.flat(Infinity); // meratakan semua level
console.log(rataSemua);

/**
 * 8. array.sort() digunakan untuk mengurutkan array, default secara alfabet
 */

// Urutkan secara numerik dari kecil ke besar (asc)
angka.sort((a, b) => a - b);
console.log("\nContoh .sort() Asc");
console.log(angka);

// Urutkan secara numerik dari besar ke keci (desc)
angka.sort((a, b) => b - a);
console.log("\nContoh .sort() Desc");
console.log(angka);

/**
 * 9. array.splice() dan array.slice()
 * splice() mengubah array asli: hapus/tambah elemen
 * slice() mengambil sebagian array tanpa mengubah aslinya
 */
// Hapus 1 item mulai index 1, dan tambahkan 'pepaya'
console.log(
  "\nContoh .splice() Hapus 1 item mulai index 1, dan tambahkan 'pepaya' dari data buah"
);
console.log("Data Awal:", buah);
const buahBaru = buah.splice(1, 1, "pepaya");
console.log("Data Buah setelah Splice", buah);
console.log("Data buah yang dihapus:", buahBaru);

console.log("\nContoh .slice() ambil index 1 s.d. 3 dari data Angka");
const potongan = angka.slice(1, 4); // ambil index 1 s.d. 3
console.log("Data Angka:", angka);
console.log("Index 1 s.d 3:", potongan);

/**
 * 10. array.concat()
 * array.concat() digunakan untuk menggabungkan dua atau lebih array menjadi array baru
 */
const arrConcat = angka.concat(buah);
console.log("\nContoh .concat() Menggabungkan data Angka dengan data Buah");
console.log(arrConcat);

/**
 * 11. array.includes()
 * array.includes() mengecek apakah suatu nilai ada dalam array
 */
console.log("\nContoh .includes()");
console.log(`Apakah "Jeruk" ada di data buah?`, buah.includes("jeruk"));
console.log(`Apakah "Pepaya" ada di data buah?`, buah.includes("pepaya"));
