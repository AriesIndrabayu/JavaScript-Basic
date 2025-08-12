const db = require("../config/db_v1");

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

// READ ALL (tanpa yang terhapus)
const getAllCatatan = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const search = req.query.search || "";
    const sort_by = req.query.sort_by || "id";
    const sort_dir =
      req.query.sort_dir?.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const deleted = req.query.deleted || "0"; // 0 = aktif, 1 = terhapus, all = semua

    // Kondisi WHERE untuk filtering berdasarkan deleted_at
    let deletedWhere = "";
    if (deleted === "0") {
      deletedWhere = "deleted_at IS NULL";
    } else if (deleted === "1") {
      deletedWhere = "deleted_at IS NOT NULL";
    } else {
      deletedWhere = "1"; // semua (tanpa filter deleted_at)
    }

    // WHERE untuk search + deleted
    const whereClause = `WHERE (${deletedWhere}) AND (isi LIKE ? OR kategori LIKE ? OR keterangan LIKE ?)`;

    const offset = (page - 1) * size;

    // Total data
    const [totalResult] = await db.query(
      `SELECT COUNT(*) as count FROM catatan ${whereClause}`,
      [`%${search}%`, `%${search}%`, `%${search}%`]
    );
    const total = totalResult[0].count;
    const total_page = Math.ceil(total / size);

    // Data hasil query
    const [rows] = await db.query(
      `SELECT * FROM catatan ${whereClause} ORDER BY ${sort_by} ${sort_dir} LIMIT ? OFFSET ?`,
      [`%${search}%`, `%${search}%`, `%${search}%`, size, offset]
    );

    res.json({
      status: "success",
      page,
      size,
      total,
      total_page,
      has_next: page < total_page,
      has_prev: page > 1,
      data: rows,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// READ BY ID
const getCatatanById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM catatan WHERE id = ? AND deleted_at IS NULL`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ status: "not_found" });
    res.json({ status: "success", data: rows[0] });
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

// SOFT DELETE
const softDeleteCatatan = async (req, res) => {
  try {
    const [result] = await db.query(
      `UPDATE catatan SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL`,
      [req.params.id]
    );
    if (result.affectedRows) {
      res.json({ status: "success", message: "Catatan berhasil dihapus" });
    } else {
      res
        .status(404)
        .json({
          status: "not_found",
          message: "Data tidak ditemukan atau sudah dihapus",
        });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// RESTORE
const restoreCatatan = async (req, res) => {
  try {
    const [result] = await db.query(
      `UPDATE catatan SET deleted_at = NULL WHERE id = ? AND deleted_at IS NOT NULL`,
      [req.params.id]
    );
    if (result.affectedRows) {
      res.json({ status: "success", message: "Catatan berhasil dipulihkan" });
    } else {
      res
        .status(404)
        .json({
          status: "not_found",
          message: "Data tidak ditemukan atau belum dihapus",
        });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// FORCE DELETE
const forceDeleteCatatan = async (req, res) => {
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
  createCatatan,
  getAllCatatan,
  getCatatanById,
  updateCatatan,
  softDeleteCatatan,
  restoreCatatan,
  forceDeleteCatatan,
};
