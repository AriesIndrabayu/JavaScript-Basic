const db = require("../config/db_v2");

const getAllCatatanV2 = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM catatan");
    res.json({ version: "v2", status: "success", data: rows });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", message: "Gagal mengambil data catatan" });
  }
};

module.exports = { getAllCatatanV2 };
