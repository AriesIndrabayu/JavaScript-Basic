const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const dbV1 = mysql.createPool({
  host: process.env.DB1_HOST,
  user: process.env.DB1_USER,
  password: process.env.DB1_PASSWORD,
  database: process.env.DB1_NAME,
});

module.exports = dbV1;
