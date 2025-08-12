const express = require("express");
const app = express();
const catatanRoutes = require("./routes/catatan");

const cors = require("cors");
app.use(cors());
app.use(
  express.static("frontend", {
    setHeaders: (res, path) => {
      if (path.endsWith(".js") || path.endsWith(".html")) {
        res.set("Cache-Control", "no-store");
      }
    },
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API Catatan Siap!");
});

// Daftarkan routing catatan
app.use("/api", catatanRoutes);
app.listen(7000, () => console.log("Server jalan di http://localhost:7000"));
