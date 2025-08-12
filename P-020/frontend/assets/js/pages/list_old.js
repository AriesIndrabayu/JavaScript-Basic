import {
  getAllCatatan,
  softDeleteCatatan,
  restoreCatatan,
  forceDeleteCatatan,
} from "../api/catatanApi.js";
import { showToast } from "../component/toast.js";
import { showConfirmModal } from "../component/modal.js";
import { renderEmptyTable } from "../component/table.js";
import { showLoader, hideLoader } from "../component/loader.js";

let currentPage = 1;

// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("filterBtn").addEventListener("click", () => {
//     currentPage = 1;
//     loadData();
//   });

//   loadData();
// });

// Delay agar elemen sudah tersedia
// Tunggu sampai elemen utama tersedia di DOM
// function waitForElement(selector, callback) {
//   const el = document.querySelector(selector);
//   if (el) {
//     callback();
//   } else {
//     setTimeout(() => waitForElement(selector, callback), 50);
//   }
// }

// waitForElement("#filterBtn", () => {
//   console.log("✅ Elemen ditemukan, siap render data!");
//   document.getElementById("filterBtn").addEventListener("click", () => {
//     currentPage = 1;
//     loadData();
//   });

//   loadData();
// });

// async function loadData() {
//   const search = document.getElementById("searchInput").value.trim();
//   const deleted = document.getElementById("deletedFilter").value;
//   const sortBy = document.getElementById("sortBy").value;
//   const sortDir = document.getElementById("sortDir").value;
//   const size = 5;
//   const params = {
//     page: currentPage,
//     size,
//     search,
//     sortBy,
//     sortDir,
//     deleted,
//   };
//   showLoader();
//   try {
//     const res = await getAllCatatan(params);
//     console.log("HASIL DARI API:", res); // 👉 cek error
//     renderTable(res.data);
//     renderPagination(res);
//   } catch (err) {
//     console.error("ERROR GET:", err); // 👉 cek error
//     renderEmptyTable("#catatanTableBody", 6, "⚠️ Gagal memuat data");
//     showToast("Gagal memuat data catatan", "error");
//   } finally {
//     hideLoader();
//   }
// }

export function init() {
  console.log("✅ list.js init dijalankan!");
  const filterBtn = document.getElementById("filterBtn");
  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      currentPage = 1;
      loadData();
    });
  }

  loadData();
}

async function loadData() {
  const search = document.getElementById("searchInput").value.trim();
  const deleted = document.getElementById("deletedFilter").value;
  const sortBy = document.getElementById("sortBy").value;
  const sortDir = document.getElementById("sortDir").value;
  const size = 5;

  const params = {
    page: currentPage,
    size,
    search,
    sortBy,
    sortDir,
    deleted,
  };

  showLoader();
  try {
    const res = await getAllCatatan(params);
    console.log("📦 HASIL API:", res);
    renderTable(res.data);
    renderPagination(res);
  } catch (err) {
    console.error("ERROR GET:", err);
    renderEmptyTable("#catatanTableBody", 6, "⚠️ Gagal memuat data");
    showToast("Gagal memuat data catatan", "error");
  } finally {
    hideLoader();
  }
}

function renderTable(rows) {
  const tbody = document.getElementById("catatanTableBody");
  tbody.innerHTML = "";

  if (rows.length === 0) {
    renderEmptyTable("#catatanTableBody", 6);
    return;
  }

  for (const row of rows) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.isi}</td>
      <td>${row.kategori ?? "-"}</td>
      <td>${row.status ? "Aktif" : "Nonaktif"}</td>
      <td>${new Date(row.updated_at).toLocaleString()}</td>
      <td>
        <a href="#/edit?id=${row.id}" class="btn btn-sm btn-warning">Edit</a>
        ${
          row.deleted_at
            ? `
          <button class="btn btn-sm btn-success btn-restore" data-id="${row.id}">Restore</button>
          <button class="btn btn-sm btn-danger btn-force" data-id="${row.id}">Hapus Permanen</button>
        `
            : `
          <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${row.id}">Hapus</button>
        `
        }
      </td>
    `;

    tbody.appendChild(tr);
  }

  // Attach event listener ke tombol dinamis
  attachButtonListeners();
}

function renderPagination({ page, total_page }) {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  for (let i = 1; i <= total_page; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === page ? "active" : ""}`;
    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.addEventListener("click", () => {
      currentPage = i;
      loadData();
    });
    container.appendChild(li);
  }
}

function attachButtonListeners() {
  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      showConfirmModal("Yakin ingin menghapus catatan ini?", async () => {
        const res = await softDeleteCatatan(id);
        if (res.status === "success") {
          showToast("Catatan berhasil dihapus");
          loadData();
        } else {
          showToast(res.message || "Gagal menghapus", "error");
        }
      });
    });
  });

  document.querySelectorAll(".btn-restore").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const res = await restoreCatatan(id);
      if (res.status === "success") {
        showToast("Catatan berhasil dipulihkan");
        loadData();
      } else {
        showToast(res.message || "Gagal memulihkan", "error");
      }
    });
  });

  document.querySelectorAll(".btn-force").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      showConfirmModal(
        "Yakin ingin menghapus PERMANEN? Ini tidak bisa dikembalikan!",
        async () => {
          const res = await forceDeleteCatatan(id);
          if (res.status === "success") {
            showToast("Catatan berhasil dihapus permanen");
            loadData();
          } else {
            showToast(res.message || "Gagal menghapus permanen", "error");
          }
        }
      );
    });
  });
}
