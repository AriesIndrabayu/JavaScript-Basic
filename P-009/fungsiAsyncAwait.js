// Fungsi tunggu: Mengembalikan Promise yang selesai setelah 'sekon' detik
function tunggu(sekon) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Selesai nunggu " + sekon + " detik"); // Promise selesai dengan pesan setelah waktu tunggu
    }, sekon * 1000); // Konversi detik ke milidetik
  });
}

let datas; // Variabel global untuk menyimpan hasil proses

// Fungsi proses bersifat async, jadi bisa pakai 'await' untuk nunggu Promise selesai
async function proses() {
  console.log("Proses dimulai....");
  const hasil = await tunggu(5); // Tunggu selama 5 detik, lanjut setelah Promise selesai

  console.log(hasil); // Cetak hasil dari Promise
  console.log("Proses Selesai...");
  datas = hasil; // Simpan hasil ke variabel global
  return hasil; // Return hasil supaya bisa diakses lewat .then()
}

datas = proses();
// Di sini 'datas' sebenarnya berisi Promise, bukan hasil akhir
// Karena proses() adalah fungsi async, jadi langsung menghasilkan Promise, belum hasil akhirnya

// Eksekusi proses(), lalu setelah selesai, cetak isi variabel datas
proses().then(() => {
  console.log("Isi datas: ", datas);
  // Warning: Pada baris ini, 'datas' tetap berisi Promise karena di atas sudah di-assign datas = proses()
  // Kalau mau datas berisi hasil string, sebaiknya assign datas di dalam .then() setelah Promise selesai
});
