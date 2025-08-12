import {
  getAllCatatan,
  softDeleteCatatan,
  restoreCatatan,
  forceDeleteCatatan,
} from "../api/catatanApi.js";

let currentPage = 1;

/*
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("filterBtn").addEventListener("click", () => {
    currentPage = 1;
    loadData();
  });

  loadData();
});
*/

export function init() {
  const filterBtn = document.getElementById("filterBtn");
  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      currentPage = 1;
      loadData();
    });
  }

  const sizeSelect = document.getElementById("size-select");
  if (sizeSelect) {
    sizeSelect.addEventListener("change", () => {
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

  const response = await getAllCatatan({
    page: currentPage,
    size,
    search,
    sortBy,
    sortDir,
    deleted,
  });
  if (response.status === "success") {
    renderTable(response.data);
    renderPagination(response);
  } else {
    document.getElementById(
      "catatanTableBody"
    ).innerHTML = `<tr><td colspan="6" class="text-center text-danger">Gagal memuat data</td></tr>`;
  }
}

function renderTable(rows) {
  const tbody = document.getElementById("catatanTableBody");
  tbody.innerHTML = "";

  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center">Tidak ada data ditemukan</td></tr>`;
    return;
  }
  console.log(rows);

  for (const row of rows) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.isi}</td>
      <td>${row.kategori ?? "-"}</td>
      <td>${row.status ? "Aktif" : "Nonaktif"}</td>
      <td>${new Date(row.updated_at).toLocaleString()}</td>
      <td>
        
        ${
          row.deleted_at
            ? `
          <button class="btn btn-sm btn-success btn-restore" data-id="${row.id}">Restore</button>
          <button class="btn btn-sm btn-danger btn-force" data-id="${row.id}">Hapus Permanen</button>
        `
            : `
          <a href="#/edit?id=${row.id}" class="btn btn-sm btn-warning">Edit</a>
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
      if (confirm("Yakin ingin menghapus catatan ini?")) {
        await softDeleteCatatan(btn.dataset.id);
        loadData();
      }
    });
  });

  document.querySelectorAll(".btn-restore").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await restoreCatatan(btn.dataset.id);
      loadData();
    });
  });

  document.querySelectorAll(".btn-force").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (
        confirm("Yakin ingin menghapus PERMANEN? Ini tidak bisa dikembalikan!")
      ) {
        await forceDeleteCatatan(btn.dataset.id);
        loadData();
      }
    });
  });
}
