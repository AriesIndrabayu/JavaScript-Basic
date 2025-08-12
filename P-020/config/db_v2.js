const mysql = require("mysql2/promise");

const dbV2 = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_catatan_js_v2",
});

module.exports = dbV2;
