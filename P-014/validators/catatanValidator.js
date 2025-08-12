const { body } = require("express-validator");
// Validasi untuk CREATE
const createCatatanRules = () => [
  body("isi")
    .notEmpty()
    .withMessage("Isi tidak boleh kosong")
    .isLength({ min: 3 })
    .withMessage("Isi minimal 3 karakter"),
  body("kategori")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Kategori maksimal 50 karakter"),
];

// Validasi untuk UPDATE (semua optional, tapi tetap divalidasi jika dikirim)
const updateCatatanRules = () => [
  body("isi")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Isi minimal 3 karakter"),
  body("kategori")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Kategori maksimal 50 karakter"),
];
module.exports = {
  createCatatanRules,
  updateCatatanRules,
};
