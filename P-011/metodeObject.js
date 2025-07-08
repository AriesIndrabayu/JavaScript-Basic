import chalk from "chalk";

const user = {
  nama: "Bayu",
  umur: 25,
  alamat: {
    kota: "Bandung",
    provinsi: "Jawa Barat",
  },
};

function logSectionTitle(
  text,
  width = 40,
  bg = chalk.bgMagenta.black.bold,
  bar = chalk.magenta
) {
  const plain = ` ${text} `.padEnd(width, " ");
  console.log(bg(plain));
  // console.log(bar("=".repeat(width)));
}

console.log("\n" + chalk.bold.blue("=== Data Awal ==="));
console.log("User:", user);
console.log(chalk.blue("=".repeat(40)));

// ========================
// 1. Destructuring --> Ekstrak nilai dari array/objek
// Destructuring digunakan untuk mengekstrak nilai dari objek atau array ke dalam variabel secara ringkas
// ========================
const { nama, umur } = user;
const {
  alamat: { kota, provinsi },
} = user;

logSectionTitle("1. Destructuring");
console.log(
  chalk.cyan("Nama dan Umur:") + ` ${chalk.green(nama)} ${chalk.yellow(umur)}`
);
console.log(
  chalk.cyan("Kota dan Provinsi:") +
    ` ${chalk.green(kota)} ${chalk.green(provinsi)}`
);
console.log("\n");

// ========================
// 2. Spread Operator --> Salin/gabung array dan objek
// Spread operator digunakan untuk menyebarkan elemen array atau properti objek
// ========================
const dataBaru = { ...user, umur: 30, status: "Aktif" }; // Overwrite dan tambah properti baru

logSectionTitle("2. Spread Operator");

logSectionTitle(
  "Overwrite dan tambah properti baru",
  40,
  chalk.bgGrey.black.bold,
  chalk.grey
);
console.log(dataBaru);
console.log("\n");

const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // Menyebarkan isi arr1 ke arr2
logSectionTitle(
  "Menyebarkan isi arr1 ke arr2",
  40,
  chalk.bgGrey.black.bold,
  chalk.grey
);
console.log(arr2);
console.log("\n");

logSectionTitle("3. Object.keys(), Object.values(), Object.entries()", 60);
// ========================
// 3. Object.keys(), Object.values(), Object.entries()
// ========================

// 🔸 Object.keys() → Mengembalikan array dari semua nama properti (key)
// Dapatkan daftar properti objek (key)
logSectionTitle(
  "Contoh Object.keys()",
  60,
  chalk.bgGrey.black.bold,
  chalk.grey
);
console.log(Object.keys(user));
console.log("\n");

// 🔸 Object.values() → Mengembalikan array dari semua nilai properti
// Dapatkan nilai properti objek
logSectionTitle(
  "Contoh Object.values()",
  60,
  chalk.bgGrey.black.bold,
  chalk.grey
);
console.log(Object.values(user));
console.log("\n");

// 🔸 Object.entries() → Mengembalikan array berisi pasangan [key, value]
// Ubah objek jadi array pasangan key-value
logSectionTitle(
  "Contoh Object.entries()",
  60,
  chalk.bgGrey.black.bold,
  chalk.grey
);
console.log(Object.entries(user));
console.log("\n");

/**
 * 4. Object.assign() --> Gabung objek (shallow copy)
 * Object.assign(target, ...sources) → Menyalin nilai dari satu atau lebih sumber ke target
 *
 */
const target = { ktp: "123456789" };
const hasilGabung = Object.assign({}, target, user); // Gabung tanpa mengubah target
logSectionTitle("4. Object.assign()");
console.log(hasilGabung);
console.log("\n");

/**
 * 5. Object.fromEntries() --> Balik dari entries() ke bentuk objek
 * Object.fromEntries() mengubah array pasangan key-value menjadi object
 */
const entries = [
  ["nama", "Bayu"],
  ["umur", 25],
  ["status", "Aktif"],
];

const obj = Object.fromEntries(entries);
logSectionTitle("5. Object.fromEntries()");
console.log(obj);
// Output: { nama: 'Bayu', umur: 25, status: 'Aktif' }
console.log("\n");

/**
 * 6. Optional Chaining (?.) --> Akses aman properti bersarang
 * Optional chaining digunakan untuk mengakses properti yang mungkin undefined/null
 */

logSectionTitle("6. Optional Chaining (?.)");
console.log(user.alamat?.kota); // Output: "Bandung"
console.log(user.alamat?.kecamatan); // Output: undefined (tidak error)
console.log("\n");
// Tanpa optional chaining, akses undefined akan menyebabkan error runtime

/**
 * 7. Nullish Coalescing (??) --> Nilai fallback hanya jika null/undefined
 * Nullish Coalescing (`??`) memberikan fallback jika nilai null atau undefined
 */
let nilaiInput = null;
let nilaiFinal = nilaiInput ?? "Default";
logSectionTitle("7. Nullish Coalescing (??)");
console.log(nilaiFinal); // Output: "Default"

logSectionTitle(
  "Perbedaan Nullish dengan operator OR (`||`)",
  50,
  chalk.bgGrey.black.bold,
  chalk.grey
);
// Perbedaan Nullish dengan operator OR (`||`)
let nilaiZero = 0;
console.log(
  nilaiZero || "Default",
  chalk.greenBright("<-- dengan operator OR")
); // Output: "Default" (karena 0 dianggap falsy)
console.log(nilaiZero ?? "Default", chalk.greenBright("<-- dengan Nullish")); // Output: 0       (karena bukan null/undefined)
console.log("\n");

/**
 * 8. Deep Copy --> Salin semua isi objek tanpa keterikatan referensi
 * Deep Copy → Menyalin semua level objek, termasuk nested
 */
logSectionTitle("8. Deep Copy");
// Shallow Copy hanya menyalin level pertama saja
const shallow = { ...user };

// Deep Copy: Menyalin semua level
const deep = JSON.parse(JSON.stringify(user));
// Ubah nested properti
user.alamat.kota = "Jakarta";

console.log(
  shallow.alamat.kota,
  chalk.greenBright("<-- tetap data ikut berubah")
);
console.log(deep.alamat.kota, chalk.greenBright("<-- tetap data user asli"));
console.log("\n");
