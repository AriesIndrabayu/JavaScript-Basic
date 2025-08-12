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

// ✅ Tambahkan init dan ekspor
export function init() {
  console.log("🔥 list.js → init() dipanggil");

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

  // Jalankan pertama kali
  loadData();
}

async function loadData() {
  const search = document.getElementById("searchInput").value.trim();
  const deleted = document.getElementById("deletedFilter").value;
  const sortBy = document.getElementById("sortBy").value;
  const sortDir = document.getElementById("sortDir").value;
  const sizeSelect = document.getElementById("size-select");
  const size = sizeSelect ? parseInt(sizeSelect.value) : 10;
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
    console.log("📦 Hasil dari API:", res); // 👉 Cek isi
    renderTable(res.data);
    renderPagination(res);
  } catch (err) {
    console.error("❌ ERROR GET:", err);
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

  attachButtonListeners();
}

function renderPagination({ page, total_page }) {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  if (total_page <= 1) return;

  const createPageItem = (
    label,
    targetPage,
    disabled = false,
    active = false
  ) => {
    const li = document.createElement("li");
    li.className = `page-item ${disabled ? "disabled" : ""} ${
      active ? "active" : ""
    }`;
    const btn = document.createElement("button");
    btn.className = "page-link";
    btn.innerHTML = label; // pakai innerHTML untuk ikon
    if (!disabled && !active) {
      btn.addEventListener("click", () => {
        currentPage = targetPage;
        loadData();
      });
    }
    li.appendChild(btn);
    return li;
  };

  // ⏮️ First & ◀️ Prev
  container.appendChild(
    createPageItem('<i class="bi bi-skip-start-fill"></i>', 1, page === 1)
  );
  container.appendChild(
    createPageItem(
      '<i class="bi bi-caret-left-fill"></i>',
      page - 1,
      page === 1
    )
  );

  // 🔢 Halaman sekitar (maksimal 5 tombol numerik)
  let start = Math.max(1, page - 2);
  let end = Math.min(total_page, page + 2);
  if (page <= 2) {
    end = Math.min(5, total_page);
  }
  if (page >= total_page - 1) {
    start = Math.max(1, total_page - 4);
  }

  for (let i = start; i <= end; i++) {
    container.appendChild(createPageItem(i, i, false, i === page));
  }

  // ▶️ Next & ⏭️ Last
  container.appendChild(
    createPageItem(
      '<i class="bi bi-caret-right-fill"></i>',
      page + 1,
      page === total_page
    )
  );
  container.appendChild(
    createPageItem(
      '<i class="bi bi-skip-end-fill"></i>',
      total_page,
      page === total_page
    )
  );
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
      showConfirmModal(
        "Yakin ingin memulihkan catatan ini?",
        async () => {
          const res = await restoreCatatan(id);
          if (res.status === "success") {
            showToast("Catatan berhasil dipulihkan");
            const totalRows = document.querySelectorAll(
              "#catatanTableBody tr"
            ).length;
            if (totalRows === 1) {
              document.getElementById("deletedFilter").value = "0";
              currentPage = 1;
            }
            loadData();
          } else {
            showToast(res.message || "Gagal memulihkan", "error");
          }
        },
        {
          confirmText: "✅ Pulihkan",
          confirmClass: "btn-success",
          title: "Konfirmasi Restore",
          headerClass: "bg-success text-white",
        }
      );
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
            const totalRows = document.querySelectorAll(
              "#catatanTableBody tr"
            ).length;
            if (totalRows === 1) {
              document.getElementById("deletedFilter").value = "0";
              currentPage = 1;
            }
            loadData();
          } else {
            showToast(res.message || "Gagal menghapus permanen", "error");
          }
        }
      );
    });
  });
}
