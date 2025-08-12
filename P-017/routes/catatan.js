const express = require("express");
const router = express.Router();
const controller = require("../controller/catatanController");

const {
  createCatatanRules,
  updateCatatanRules,
} = require("../validators/catatanValidator");
const validate = require("../middlewares/validate");
const { validateIdParam } = require("../validators/paramValidator");
const { validateCatatanQuery } = require("../validators/queryValidator");

// buat route GET Catatan --> membaca semua catatan
router.get(
  "/catatan",
  validateCatatanQuery(),
  validate,
  controller.getAllCatatan
);

// buat route membaca by ID
router.get("/catatan/:id", controller.getCatatanById);

// CREATE → Validasi penuh
router.post(
  "/catatan",
  createCatatanRules(),
  validate,
  controller.createCatatan
);

// UPDATE → Validasi fleksibel
router.put(
  "/catatan/:id",
  validateIdParam(),
  updateCatatanRules(),
  validate,
  controller.updateCatatan
);

// DELETE
router.delete(
  "/catatan/:id",
  validateIdParam(),
  validate,
  controller.softDeleteCatatan
);

// RESTORE
router.patch(
  "/catatan/:id",
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
