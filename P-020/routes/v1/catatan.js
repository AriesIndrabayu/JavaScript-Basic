const express = require("express");
const router = express.Router();
/**
 * ✅ Fungsi Utama Kode Ini
Kode ini digunakan untuk membuat router terpisah menggunakan Express. Router ini akan menangani routing modular dalam aplikasi Express yang besar atau kompleks.

1. const express = require("express");
- Mengimpor modul Express ke dalam file.
- Kita butuh Express untuk membuat aplikasi web atau API.

2. const router = express.Router();
- express.Router() adalah fungsi dari Express untuk membuat objek router baru.
router ini seperti "mini-app" yang punya fungsionalitas mirip app:
  - Bisa pakai router.get(), router.post(), router.use(), dsb.
- Tujuannya adalah agar kamu bisa memisahkan logika routing ke dalam file-file yang lebih kecil dan lebih terorganisir.

🎯 Kenapa Menggunakan router?
Misalnya kamu punya banyak route, seperti:
app.get("/produk", ...)
app.post("/produk", ...)
app.get("/user", ...)
app.post("/user", ...)

Akan berantakan kalau semua ditaruh di satu file.
Dengan router, kamu bisa pisahkan jadi beberapa file:
routes/produk.js
routes/user.js
 */
const controller = require("../../controllers/catatanV1Controller");
const {
  createCatatanRules,
  updateCatatanRules,
} = require("../../validators/catatanValidator");
const validate = require("../../middlewares/validate");

const { validateIdParam } = require("../../validators/paramValidator");
const { validateCatatanQuery } = require("../../validators/queryValidator");

// CREATE → Validasi penuh
router.post(
  "/catatan",
  createCatatanRules(),
  validate,
  controller.createCatatan
);

// READ
router.get(
  "/catatan",
  validateCatatanQuery(),
  validate,
  controller.getAllCatatan
);
// GET BY ID
router.get(
  "/catatan/:id",
  validateIdParam(),
  validate,
  controller.getCatatanById
);

// UPDATE → Validasi fleksibel
router.put(
  "/catatan/:id",
  validateIdParam(),
  updateCatatanRules(),
  validate,
  controller.updateCatatan
);

// DELETE (soft)
router.delete(
  "/catatan/:id",
  validateIdParam(),
  validate,
  controller.softDeleteCatatan
);

// RESTORE
router.patch(
  "/catatan/restore/:id",
  validateIdParam(),
  validate,
  controller.restoreCatatan
);

// FORCE DELETE
router.delete(
  "/catatan/force/:id",
  validateIdParam(),
  validate,
  controller.forceDeleteCatatan
);

module.exports = router;
