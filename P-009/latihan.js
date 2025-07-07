// Fungsi async untuk ambil data dari API dengan teknik async-await
async function ambilData() {
  console.log("Mulai ambil data....");
  const respon = await fetch("https://dummyjson.com/products/1"); // Tunggu hasil fetch selesai
  const data = await respon.json(); // Tunggu konversi ke JSON selesai

  // console.log(data); // Tampilkan semua detail data ke console
  // tampilan disesuaikan
  console.log("\n\n==== Nama Produk ====");
  console.log("Nama produk:", data.title);
  console.log("Kategori produk:", data.category);
  console.log(`Harga price: $ ${data.title}`);
  console.log(`Stok: $ ${data.stock}`);
  console.log("\n");
  console.log("Selesai ambil data"); // Tandai proses selesai
}

// Memanggil fungsi ambilData
ambilData();

/*
Output :
Mulai ambil data....


==== Nama Produk ====
Nama produk: Essence Mascara Lash Princess
Kategori produk: beauty
Harga price: $ Essence Mascara Lash Princess
Stok: $ 99


Selesai ambil data
*/
