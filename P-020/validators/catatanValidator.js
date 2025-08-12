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

  body("keterangan")
    .optional()
    .isString()
    .withMessage("Keterangan harus berupa teks"),

  body("status")
    .optional()
    .isBoolean()
    .withMessage("Status harus berupa boolean"),
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

  body("keterangan")
    .optional()
    .isString()
    .withMessage("Keterangan harus berupa teks"),

  body("status")
    .optional()
    .isBoolean()
    .withMessage("Status harus berupa boolean"),
];

module.exports = {
  createCatatanRules,
  updateCatatanRules,
};
