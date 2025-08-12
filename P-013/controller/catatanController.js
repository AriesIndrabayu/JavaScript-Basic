const db = require("../config/db");

// fungsi membaca semua data
const getAllCatatan = async (req, res) => {
  try {
    // Data hasil query
    const [rows] = await db.query(`SELECT * from catatan ORDER BY id DESC`);
    res.json({
      status: "sucses",
      data: rows,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// fungsi membaca data by ID
const getCatatanById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM catatan WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ status: "error", message: "not found" });
    res.json({ status: "success", data: rows[0] });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = {
  getAllCatatan,
  getCatatanById,
};
