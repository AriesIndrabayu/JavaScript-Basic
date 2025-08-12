const express = require("express");
const router = express.Router();
const { getAllCatatanV2 } = require("../../controllers/catatanV2Controller");

router.get("/catatan", getAllCatatanV2);

module.exports = router;
