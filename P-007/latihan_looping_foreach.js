// Buat Array angka
let angka = [2, 4, 6, 8];

// Pakai .forEach() buat nampilin tiap angka
console.log("Isi Array angka:");
angka.forEach(function (item) {
  console.log(item);
});

// Pakai .map() buat hasilin Array baru berisi kuadrat
let kuadrat = angka.map(function (item) {
  return item * item;
});

console.log("Array kuadrat:");
console.log(kuadrat);
