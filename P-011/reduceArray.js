/**
 * Struktur Dasar .reduce()
 *
 * array.reduce((accumulator, currentValue) => {
 *  // proses
 *  return accumulatorBaru;
 * }, nilaiAwal);
 *
 * array → array yang mau diproses
 * accumulator → penampung hasil sementara (total yang dibawa ke iterasi berikutnya)
 * currentValue → item array saat ini
 * nilaiAwal → nilai awal untuk accumulator (biasanya 0, [] atau {} tergantung kebutuhan)
 */

// Contoh Simpel: Menjumlahkan Angka
const angka = [1, 2, 3, 4, 5];
const total = angka.reduce((acc, item) => acc + item, 0);
console.log(total); // Output: 15

// Contoh Lebih Kompleks: Total Harga Belanja
const keranjang = [
  { nama: "Buku", harga: 30000, qty: 2 },
  { nama: "Pulpen", harga: 5000, qty: 5 },
  { nama: "Tas", harga: 150000, qty: 1 },
];
const totalBayar = keranjang.reduce(
  (acc, item) => acc + item.harga * item.qty,
  0
);

console.log(totalBayar); // Output: 230000

// Contoh Non-Angka: Gabung String
const kata = ["Halo", "Dunia", "JS"];

const hasil = kata.reduce((acc, item) => acc + " " + item, "");

console.log(hasil); // Output: " Halo Dunia JS"

/**
 * Catatan Penting:
 * ✔ Bisa dipakai bukan cuma buat angka, bisa juga buat:
 * *** Gabung string
 * *** Bangun object baru
 * *** Filtering custom
 * *** Hitung statistik
 * ✔ Nilai Awal (0 atau {} atau []) sangat penting, jangan lupa nulis.
 *
 * Kesimpulan****
 * .reduce() dipakai kalau kamu mau:
 * ✔ Proses seluruh isi array
 * ✔ Hasil akhirnya cuma 1 nilai (angka, string, array, atau object)
 * ✔ Efisien, tanpa perlu bikin variabel tambahan di luar array
 */
