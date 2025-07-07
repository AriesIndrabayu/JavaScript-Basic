const angka = [1, 2, 3];
// tanpa Destructuring
const satu = angka[0];
const dua = angka[1];
console.log("\n=== tanpa Destructuring ===");
console.log(`satu: ${satu}`);
console.log(`dua: ${dua}`);

// dengan Destructuring
const [satuDes, duaDes] = angka;
console.log("\n=== dengan Destructuring ===");
console.log(`satuDes: ${satuDes}`);
console.log(`duaDes: ${duaDes}`);

// Contoh Destructuring:

// Destructuring Array
const buah = ["apel", "jeruk", "pisang"];
const [pertama, kedua] = buah;

console.log("\n=== Contoh Destructuring Array ===");
console.log("Buah ke-1", pertama); // apel
console.log("Buah ke-2", kedua); // jeruk

// Destructuring Object
const user = { nama: "Bayu", umur: 25 };
const { nama, umur } = user;

console.log("\n=== Contoh Destructuring Object ===");
console.log("Nama:", nama); // Bayu
console.log("Usia:", umur); // 25
