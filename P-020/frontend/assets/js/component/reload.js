// component/reload.js
// frontend/assets/js/component/reload.js
export function initReloadButton() {
  const reloadBtn = document.getElementById("btnReloadDev");
  if (!reloadBtn) return;

  reloadBtn.addEventListener("click", () => {
    console.log("🔁 Reload (Dev Mode) dengan cache busting");

    // Paksa browser ambil ulang dari server dengan:
    // - Mengubah hash (untuk router SPA)
    // - Menambahkan timestamp ke query string (untuk busting cache)

    const url = new URL(window.location.href);

    // Tetapkan ke route utama atau biarkan tetap di posisi sekarang
    const hash = window.location.hash || "#/list";
    // url.hash = hash;
    url.hash = `${hash}?nocache=${Date.now()}`; // ⬅️ Tambahkan cache buster di hash

    // Tambahkan query string untuk cache buster
    url.searchParams.set("devcache", Date.now());

    // Redirect ke versi baru
    window.location.href = url.toString();
  });
}
