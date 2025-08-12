const { param } = require("express-validator");
const validateIdParam = () => [
  param("id")
    .exists()
    .withMessage("ID wajib disertakan")
    .bail()
    .isInt({ gt: 0 })
    .withMessage("ID harus berupa angka lebih dari 0"),
];
module.exports = { validateIdParam };
