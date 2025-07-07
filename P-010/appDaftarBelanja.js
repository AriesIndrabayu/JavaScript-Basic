// Import module readline untuk input dari terminal
const readline = require("readline");

// Inisialisasi interface readline untuk menerima input/output di terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Array untuk menyimpan daftar belanja
let daftarBelanja = [];

// Fungsi helper untuk membuat prompt pertanyaan berbasis Promise
const prompt = (pertanyaan) =>
  new Promise((resolve) => rl.question(pertanyaan, resolve));

// Fungsi untuk menambahkan item ke daftar belanja
const tambahItem = async () => {
  const nama = await prompt("Masukkan nama item: ");
  const jumlahStr = await prompt("Masukkan jumlah: ");
  const kategori = await prompt("Masukkan kategori: ");
  const jumlah = parseInt(jumlahStr); // Konversi jumlah ke angka

  // Validasi input
  if (!nama || isNaN(jumlah) || jumlah <= 0 || !kategori) {
    console.log("Input tidak valid. Silakan ulangi.");
    return;
  }

  // Menambahkan item ke array daftarBelanja
  daftarBelanja.push({ nama, jumlah, kategori });
  console.log("Item berhasil ditambahkan!");
};

// Fungsi untuk menampilkan semua item di daftar belanja
const tampilkanItem = () => {
  if (daftarBelanja.length === 0) {
    console.log("Daftar belanja masih kosong.");
    return;
  }
  console.log("\n=== Daftar Belanja ===");
  daftarBelanja.forEach((item, i) => {
    console.log(`${i + 1}. ${item.nama} (${item.jumlah}) - ${item.kategori}`);
  });
};

// Fungsi untuk menghapus item dari daftar belanja berdasarkan nomor
const hapusItem = async () => {
  tampilkanItem();
  const indexStr = await prompt("Masukkan nomor item yang ingin dihapus: ");
  const index = parseInt(indexStr);

  // Validasi nomor yang dimasukkan
  if (isNaN(index) || index < 1 || index > daftarBelanja.length) {
    console.log("Nomor tidak valid.");
    return;
  }

  // Menghapus item dari array
  daftarBelanja.splice(index - 1, 1);
  console.log("Item berhasil dihapus!");
};

// Fungsi untuk mencari item berdasarkan nama atau kategori
const cariItem = async () => {
  const keyword = await prompt("Masukkan nama atau kategori yang dicari: ");

  // Filter array berdasarkan nama atau kategori yang mengandung keyword
  const hasil = daftarBelanja.filter(
    (item) =>
      item.nama.toLowerCase().includes(keyword.toLowerCase()) ||
      item.kategori.toLowerCase().includes(keyword.toLowerCase())
  );

  // Tampilkan hasil pencarian
  if (hasil.length === 0) {
    console.log("Item tidak ditemukan.");
  } else {
    console.log("Hasil pencarian:");
    hasil.forEach((item, i) => {
      console.log(`${i + 1}. ${item.nama} (${item.jumlah}) - ${item.kategori}`);
    });
  }
};

// Fungsi untuk menampilkan statistik total item dan jumlah per kategori
const statistik = () => {
  console.log(`\nTotal item: ${daftarBelanja.length}`);
  const kategoriCount = {}; // Objek untuk menyimpan total per kategori
  daftarBelanja.forEach((item) => {
    kategoriCount[item.kategori] =
      (kategoriCount[item.kategori] || 0) + item.jumlah;
  });

  // Tampilkan hasil statistik
  console.log("Jumlah berdasarkan kategori:");
  for (const [kategori, jumlah] of Object.entries(kategoriCount)) {
    console.log(`- ${kategori}: ${jumlah}`);
  }
};

// Fungsi utama yang menampilkan menu dan mengatur alur program
const menuUtama = async () => {
  while (true) {
    console.log(`\n=== MENU UTAMA ===
1. Tambah Item
2. Tampilkan Semua Item
3. Hapus Item
4. Cari Item
5. Statistik
6. Keluar`);
    const pilihan = await prompt("Pilih menu (1-6): ");

    // Switch-case untuk memproses pilihan menu
    switch (pilihan) {
      case "1":
        await tambahItem();
        break;
      case "2":
        tampilkanItem();
        break;
      case "3":
        await hapusItem();
        break;
      case "4":
        await cariItem();
        break;
      case "5":
        statistik();
        break;
      case "6":
        console.log("Terima kasih!");
        rl.close(); // Tutup interface readline
        return;
      default:
        console.log("Pilihan tidak valid.");
    }
  }
};

// Panggil fungsi menu utama untuk memulai program
menuUtama();
