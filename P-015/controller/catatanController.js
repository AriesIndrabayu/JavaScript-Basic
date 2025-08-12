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

// CREATE
const createCatatan = async (req, res) => {
  try {
    const { isi, kategori, keterangan, status } = req.body;
    const [result] = await db.query(
      `INSERT INTO catatan (isi, kategori, keterangan, status, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [isi, kategori, keterangan, status ?? true]
    );
    res.status(201).json({ status: "success", id: result.insertId });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// UPDATE
const updateCatatan = async (req, res) => {
  try {
    const { isi, kategori, keterangan, status } = req.body;
    const [result] = await db.query(
      `UPDATE catatan SET isi = ?, kategori = ?, keterangan = ?, status = ?, updated_at = NOW() WHERE id = ? AND deleted_at IS NULL`,
      [isi, kategori, keterangan, status, req.params.id]
    );
    res.json({ status: result.affectedRows ? "success" : "not_found" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// DELETE
const DeleteCatatan = async (req, res) => {
  try {
    const [result] = await db.query(`DELETE FROM catatan WHERE id = ?`, [
      req.params.id,
    ]);
    if (result.affectedRows) {
      res.json({
        status: "success",
        message: "Catatan berhasil dihapus permanen",
      });
    } else {
      res
        .status(404)
        .json({ status: "not_found", message: "Data tidak ditemukan" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = {
  getAllCatatan,
  getCatatanById,
  createCatatan,
  updateCatatan,
  DeleteCatatan,
};
