import {
  getCatatanById,
  createCatatan,
  updateCatatan,
} from "../api/catatanApi.js";

// Ambil ID dari query string (jika ada)
const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");

/*
document.addEventListener("DOMContentLoaded", () => {
  if (id) {
    // Ubah judul form
    document.getElementById("formTitle").textContent = "📝 Edit Catatan";
    loadCatatan();
  }

  document
    .getElementById("catatanForm")
    .addEventListener("submit", handleSubmit);
});
*/

export function init() {
  try {
    const hash = window.location.hash;
    const queryString = hash.includes("?") ? hash.split("?")[1] : "";
    const urlParams = new URLSearchParams(queryString);
    console.log(`ulrParams: ${urlParams.get("id")}`);
    id = urlParams.get("id");
    if (id) {
      document.getElementById("formTitle").textContent = "📝 Edit Catatan";
      loadCatatan(id);
    }
  } catch (err) {
    console.error("❌ Gagal memproses has dan mengambil ID: ", err);
  }

  try {
    const form = document.getElementById("catatanForm");
    if (form) {
      form.addEventListener("submit", handleSubmit);
    } else {
      console.warn("⚠️Form tidak ditemukan di DOM");
    }
  } catch (err) {
    console.error("❌ Gagal memasang event listener form: ", err);
  }
}

async function loadCatatan(id) {
  const res = await getCatatanById(id);
  if (res.status === "success") {
    const { isi, kategori, keterangan, status } = res.data;
    document.getElementById("isi").value = isi;
    document.getElementById("kategori").value = kategori ?? "";
    document.getElementById("keterangan").value = keterangan ?? "";
    document.getElementById("status").checked = !!status;
  } else {
    alert("Gagal mengambil data catatan");
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

  if (!data.isi) {
    alert("Isi catatan wajib diisi!");
    return;
  }

  let res;
  if (id) {
    res = await updateCatatan(id, data);
  } else {
    res = await createCatatan(data);
  }

  if (res.status === "success") {
    alert(`Catatan berhasil ${id ? "diperbarui" : "ditambahkan"}!`);
    window.location.hash = "#/list";
  } else {
    alert(`Gagal menyimpan catatan: ${res.message}`);
  }
}
