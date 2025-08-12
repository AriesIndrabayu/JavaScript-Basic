const express = require("express");
const router = express.Router();
const controller = require("../controller/catatanController");

// buat route GET Catatan --> membaca semua catatan
router.get("/catatan", controller.getAllCatatan);

// buat route membaca by ID
router.get("/catatan/:id", controller.getCatatanById);

module.exports = router;
