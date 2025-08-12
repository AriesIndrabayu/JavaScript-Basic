// frontend/assets/js/component/navbar.js

export function renderNavbar() {
  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a class="navbar-brand" href="#">📒 CatatanApp</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#/list">📄 Daftar Catatan</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/form">✏️ Tambah Catatan</a>
          </li>
        </ul>
      </div>
    </nav>
  `;
  document.body.insertAdjacentHTML("afterbegin", navbar);
}
