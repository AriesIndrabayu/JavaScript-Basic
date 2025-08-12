import { showToast } from "../component/toast.js";

import {
  getCatatanById,
  createCatatan,
  updateCatatan,
} from "../api/catatanApi.js";
import { showLoader, hideLoader } from "../component/loader.js";

// Ambil ID dari query string (jika ada)
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

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

async function loadCatatan() {
  const res = await getCatatanById(id);
  if (res.status === "success") {
    const { isi, kategori, keterangan, status } = res.data;
    document.getElementById("isi").value = isi;
    document.getElementById("kategori").value = kategori ?? "";
    document.getElementById("keterangan").value = keterangan ?? "";
    document.getElementById("status").checked = !!status;
  } else {
    // alert("Gagal mengambil data catatan");
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

  if (!data.isi) {
    // alert("Isi catatan wajib diisi!");
    showToast("Isi catatan wajib diisi!", "error");
    return;
  }

  showLoader();
  try {
    const res = id ? await updateCatatan(id, data) : await createCatatan(data);

    if (res.status === "success") {
      showToast(`Catatan berhasil ${id ? "diperbarui" : "ditambahkan"}!`);
      window.location.hash = "#/list";
    } else {
      showToast(res.message, "error");
    }
  } catch (err) {
    showToast("Gagal menyimpan data", "error");
  } finally {
    hideLoader();
  }

  // let res;
  // if (id) {
  //   res = await updateCatatan(id, data);
  // } else {
  //   res = await createCatatan(data);
  // }

  // if (res.status === "success") {
  //   // alert(`Catatan berhasil ${id ? "diperbarui" : "ditambahkan"}!`);
  //   showToast(`Catatan berhasil ${id ? "diperbarui" : "ditambahkan"}!`);
  //   window.location.hash = "#/list";
  // } else {
  //   // alert(`Gagal menyimpan catatan: ${res.message}`);
  //   showToast(`Gagal menyimpan catatan: ${res.message}`, "error");
  // }
}
