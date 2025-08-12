const { query } = require("express-validator");

// Kolom yang diizinkan untuk sorting
const allowedSortBy = ["id", "isi", "kategori", "updated_at", "created_at"];

const validateCatatanQuery = () => [
  query("page").optional().isInt({ min: 1 }).withMessage("Page minimal 1"),

  query("size")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Size harus antara 1-100"),

  query("search")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Search maksimal 100 karakter"),

  query("sort_by")
    .optional()
    .isIn(allowedSortBy)
    .withMessage(`Sort_by hanya boleh: ${allowedSortBy.join(", ")}`),

  query("sort_dir")
    .optional()
    .isIn(["asc", "desc", "ASC", "DESC"])
    .withMessage("Sort_dir hanya boleh asc / desc"),

  query("deleted")
    .optional()
    .isIn(["0", "1", "all"])
    .withMessage("Deleted hanya boleh 0, 1, atau all"),
];

module.exports = { validateCatatanQuery };
