const express = require("express");
const app = express();
const catatanRoutes = require("./routes/catatan");
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API Catatan Siap!");
});

// Daftarkan routing catatan
app.use("/", catatanRoutes);
app.listen(5000, () => console.log("Server jalan di http://localhost:5000"));
