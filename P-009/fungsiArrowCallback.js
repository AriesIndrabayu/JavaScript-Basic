// contoh arraw function sederhana
const sapa = (nama) => {
  console.log(`Halo, ${nama}!\n\n`);
};

// fungsi callback biasa
function prosesBiasa(nama, callback) {
  console.log("Memproses....");
  callback(nama);
}

// fungsi callback menggunakan arrow function
const prosesArrow = (nama, callback) => {
  console.log("Memproses....");
  callback(nama);
};
prosesBiasa("Dudung", sapa);
prosesArrow("Ujang", sapa);
