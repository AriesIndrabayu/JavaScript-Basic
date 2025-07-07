const produk = [
  { nama: "Laptop", harga: 4000000 },
  { nama: "Mouse", harga: 100000 },
  { nama: "Keyboard", harga: 300000 },
];

function tampilkanProduk(arr) {
  arr.forEach((item) => console.log(`${item.nama} - Rp ${item.harga}`));
}

function hitungTotal(arr) {
  let total = 0;
  arr.forEach((p) => (total += p.harga));
  return total;
}

tampilkanProduk(produk);
const totalHarga = hitungTotal(produk);
console.log(`Total Harga: Rp${totalHarga}`);
console.log("Total Harga:" + " Rp" + totalHarga);
console.log("Total Harga:", "Rp", totalHarga);
