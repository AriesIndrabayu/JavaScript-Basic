export function showConfirmModal(message, onConfirm, options = {}) {
  const {
    confirmText = "Ya, Hapus",
    confirmClass = "btn-danger", // default merah
    title = "Konfirmasi",
    headerClass = "bg-danger text-white", // default merah
  } = options;

  const html = `
    <div class="modal fade" id="confirmModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header ${headerClass}">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">${message}</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn ${confirmClass}" id="btnConfirmOk">${confirmText}</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", html);
  const modal = new bootstrap.Modal(document.getElementById("confirmModal"));
  modal.show();

  document.getElementById("btnConfirmOk").onclick = () => {
    modal.hide();
    onConfirm();
  };

  document
    .getElementById("confirmModal")
    .addEventListener("hidden.bs.modal", () => {
      document.getElementById("confirmModal").remove();
    });
}
