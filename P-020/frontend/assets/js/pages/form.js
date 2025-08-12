import { showToast } from "../component/toast.js";
import {
  getCatatanById,
  createCatatan,
  updateCatatan,
} from "../api/catatanApi.js";
import { showLoader, hideLoader } from "../component/loader.js";

// ⏮️ Variabel ID diambil dari query string
let id;

export function init() {
  console.log("🔥 form.js → init() dipanggil tes");

  try {
    const hash = window.location.hash;
    console.log("🔍 Full hash:", hash); // Cek hash mentah, misal: "#/edit?id=6"

    const queryString = hash.includes("?") ? hash.split("?")[1] : "";
    console.log("🔍 queryString:", queryString); // Cek hasil split, misal: "id=6"

    const urlParams = new URLSearchParams(queryString);
    id = urlParams.get("id");

    console.log("📌 ID dari hash:", id);

    if (id) {
      document.getElementById("formTitle").textContent = "📝 Edit Catatan";
      loadCatatan();
    }
  } catch (err) {
    console.error("❌ Gagal memproses hash dan mengambil ID:", err);
  }

  try {
    const form = document.getElementById("catatanForm");
    if (form) {
      form.addEventListener("submit", handleSubmit);
    } else {
      console.warn("⚠️ Form tidak ditemukan di DOM.");
    }
  } catch (err) {
    console.error("❌ Gagal memasang event listener form:", err);
  }
}

async function loadCatatan() {
  const res = await getCatatanById(id);
  if (res.status === "success") {
    const { isi, kategori, keterangan, status } = res.data;
    document.getElementById("isi").value = isi;
    document.getElementById("kategori").value = kategori ?? "";
    document.getElementById("keterangan").value = keterangan ?? "";
    document.getElementById("status").checked = !!status;
  } else {
    showToast("Gagal mengambil data catatan", "error");
    window.location.hash = "#/list";
  }
}

async function handleSubmit(e) {
  e.preventDefault();

  const data = {
    isi: document.getElementById("isi").value.trim(),
    kategori: document.getElementById("kategori").value.trim(),
    keterangan: document.getElementById("keterangan").value.trim(),
    status: document.getElementById("status").checked,
  };

  console.log("📤 Data yang dikirim:", data);

  if (!data.isi) {
    showToast("Isi catatan wajib diisi!", "error");
    return;
  }

  showLoader();
  try {
    let res;
    if (id) {
      res = await updateCatatan(id, data);
      console.log("📥 Respon updateCatatan:", res);
    } else {
      res = await createCatatan(data);
      console.log("📥 Respon createCatatan:", res);
    }

    if (res.status === "success") {
      showToast(`Catatan berhasil ${id ? "diperbarui" : "ditambahkan"}!`);
      window.location.hash = "#/list";
    } else {
      console.warn("⚠️ Respon gagal:", res);
      showToast(res.message || "Gagal menyimpan catatan", "error");
    }
  } catch (err) {
    console.error("❌ Gagal simpan:", err);
    showToast("Gagal menyimpan data", "error");
  } finally {
    hideLoader();
  }
}
