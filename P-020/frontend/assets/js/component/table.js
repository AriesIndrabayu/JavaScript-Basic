// frontend/assets/js/component/table.js

export function renderEmptyTable(
  selector,
  colCount,
  message = "Tidak ada data ditemukan"
) {
  const tbody = document.querySelector(selector);
  if (tbody) {
    tbody.innerHTML = `<tr><td colspan="${colCount}" class="text-center text-muted">${message}</td></tr>`;
  }
}
