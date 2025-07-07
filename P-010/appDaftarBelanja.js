const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let daftarBelanja = [];
const prompt = (pertanyaan) =>
  new Promise((resolve) => rl.question(pertanyaan, resolve));
const tambahItem = async () => {
  const nama = await prompt("Masukkan nama item: ");
  const jumlahStr = await prompt("Masukkan jumlah: ");
  const kategori = await prompt("Masukkan kategori: ");
  const jumlah = parseInt(jumlahStr);

  if (!nama || isNaN(jumlah) || jumlah <= 0 || !kategori) {
    console.log("Input tidak valid. Silakan ulangi.");
    return;
  }

  daftarBelanja.push({ nama, jumlah, kategori });
  console.log("Item berhasil ditambahkan!");
};
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
const hapusItem = async () => {
  tampilkanItem();
  const indexStr = await prompt("Masukkan nomor item yang ingin dihapus: ");
  const index = parseInt(indexStr);
  if (isNaN(index) || index < 1 || index > daftarBelanja.length) {
    console.log("Nomor tidak valid.");
    return;
  }
  daftarBelanja.splice(index - 1, 1);
  console.log("Item berhasil dihapus!");
};
const cariItem = async () => {
  const keyword = await prompt("Masukkan nama atau kategori yang dicari: ");
  const hasil = daftarBelanja.filter(
    (item) =>
      item.nama.toLowerCase().includes(keyword.toLowerCase()) ||
      item.kategori.toLowerCase().includes(keyword.toLowerCase())
  );
  if (hasil.length === 0) {
    console.log("Item tidak ditemukan.");
  } else {
    console.log("Hasil pencarian:");
    hasil.forEach((item, i) => {
      console.log(`${i + 1}. ${item.nama} (${item.jumlah}) - ${item.kategori}`);
    });
  }
};
const statistik = () => {
  console.log(`\nTotal item: ${daftarBelanja.length}`);
  const kategoriCount = {};
  daftarBelanja.forEach((item) => {
    kategoriCount[item.kategori] =
      (kategoriCount[item.kategori] || 0) + item.jumlah;
  });
  console.log("Jumlah berdasarkan kategori:");
  for (const [kategori, jumlah] of Object.entries(kategoriCount)) {
    console.log(`- ${kategori}: ${jumlah}`);
  }
};
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
        rl.close();
        return;
      default:
        console.log("Pilihan tidak valid.");
    }
  }
};
menuUtama();
