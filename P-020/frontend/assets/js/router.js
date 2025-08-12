// frontend/assets/js/router.js

const routes = {
  "#/list": {
    template: "./templates/list.html",
    script: "./assets/js/pages/list.js",
  },
  "#/form": {
    template: "./templates/form.html",
    script: "./assets/js/pages/form.js",
  },
  "#/edit": {
    template: "./templates/form.html",
    script: "./assets/js/pages/form.js",
  },
};

// Load template HTML
async function loadTemplate(templatePath) {
  const response = await fetch(templatePath);
  return response.text();
}

// Load module script via dynamic import
async function loadScript(scriptPath) {
  console.log("▶️ loadScript dipanggil untuk:", scriptPath);
  try {
    const version = Date.now();
    const fullPath =
      location.origin +
      "/" +
      scriptPath.replace(/^\.?\//, "") +
      `?v=${version}`;
    // tambahkan `?v=${Date.now()}` Supaya perubahan file JavaScript langsung terbaca

    console.log("→ fullPath:", fullPath);

    const module = await import(/* @vite-ignore */ fullPath);
    console.log("✅ Module loaded via import():", fullPath);

    if (typeof module.init === "function") {
      module.init(); // 🔥 Panggil fungsi init() jika tersedia
    } else {
      console.warn("⚠️ Tidak ditemukan init() di", scriptPath);
    }

    return module;
  } catch (err) {
    console.error("❌ Gagal load module:", scriptPath, err);
    throw err;
  }
}

function showDevElements() {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    console.log("🧪 Dev mode aktif → Menampilkan elemen data-dev-only");
    document
      .querySelectorAll("[data-dev-only]")
      .forEach((el) => el.classList.remove("d-none"));
  }
}

// Router utama
export async function router() {
  const hash = window.location.hash || "#/list";
  const routeKey = hash.split("?")[0];
  const route = routes[routeKey];

  console.log("🔍 Current hash:", hash);
  console.log("🔍 routeKey:", routeKey);
  console.log("🔍 route found:", route);

  if (!route) {
    console.warn("⚠️ Route tidak ditemukan untuk hash:", routeKey);
    document.getElementById(
      "app"
    ).innerHTML = `<div class="alert alert-danger">Halaman tidak ditemukan!</div>`;
    return;
  }

  try {
    const html = await loadTemplate(route.template);
    document.getElementById("app").innerHTML = html;
    await loadScript(route.script);
    showDevElements(); // ✅ Panggil setelah HTML & JS dimuat
  } catch (err) {
    document.getElementById(
      "app"
    ).innerHTML = `<div class="alert alert-danger">Gagal memuat halaman.</div>`;
    console.error("Router Error:", err);
  }
}
