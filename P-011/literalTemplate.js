// contoh template literal
const nama = "Bayu";
const pesan = `Halo, nama saya ${nama}`;
console.log(`\ncontoh template literal:`);
console.log(pesan);

// Ekspresi di dalam Template Literal:
// 1. Operasi Matematika
const angka = 10;
console.log(`\ncontoh ekspresi dalam template literal:`);
console.log(`Hasil kali dua: ${angka * 2}`);

// apakah ekspresi dalam literal hanya operator matematika saja? tentu saja tidak

// Ekspresi template literal lainnya:
// 2. String + String
const namaDepan = "Bayu";
const namaBelakang = "Putra";
console.log(`\ncontoh ekspresi [String + String]`);
console.log(`Nama lengkap: ${namaDepan + " " + namaBelakang}`);

// 3. Ternary Operator
const usia = 20;
console.log(`\ncontoh ekspresi [Ternary Operator]`);
console.log(`Status usia: ${usia >= 18 ? "Dewasa" : "Anak-anak"}`);

// 4. Panggilan Fungsi
function salam() {
  return "Selamat pagi!";
}
console.log(`\ncontoh ekspresi [Panggilan Fungsi]`);
console.log(`Ucapan: ${salam()}`);

// 5. Akses Object/Array
const user = { nama: "Bayu", umur: 25 };
const daftar = ["apel", "jeruk", "mangga"];
console.log(`\ncontoh ekspresi [Akses Object/Array]`);
console.log(`Nama user: ${user.nama}`);
console.log(`Buah favorit: ${daftar[1]}`);

// 6. Ekspresi Logika
const isLogin = true;
console.log(`\ncontoh ekspresi [Logika]`);
console.log(`Status login: ${isLogin && "Sudah login"}`);

// 7. Method atau Operasi Lain
const numerik = [1, 2, 3];
console.log(`\ncontoh ekspresi [Method atau Operasi Lain]`);
console.log(`Gabung angka: ${numerik.join(" + ")}`);
