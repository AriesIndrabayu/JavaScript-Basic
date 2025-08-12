/*
#/list --> ambil file templates/list.html --> render ke <div id="app"></div>
*/

// 1. Mapping route
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

// 2.fungsi load template
async function loadTemplate(tempaltePath) {
  const response = await fetch(tempaltePath);
  return response.text();
}

// 3. Fungsi untuk load script JS

/*
async function loadScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = scriptPath;
    script.type = "module";
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}
*/
async function loadScript(scriptPath) {
  console.log("▶️ loadScript dipanggil untuk:", scriptPath);
  try {
    const version = Date.now();
    const fullPath =
      location.origin +
      "/" +
      scriptPath.replace(/^\.?\//, "") +
      `?v=${version}`;

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

// 4. Router Utama
export async function router() {
  const hash = window.location.hash || "#/list";
  const route = routes[hash.split("?")[0]]; // strip query param if any

  if (!route) {
    document.getElementById(
      "app"
    ).innerHTML = `<div class="alert alert-danger">Halaman tidak ditemukan!</div>`;
    return;
  }

  try {
    const html = await loadTemplate(route.template);
    document.getElementById("app").innerHTML = html;
    await loadScript(route.script);
  } catch (err) {
    document.getElementById(
      "app"
    ).innerHTML = `<div class="alert alert-danger">Gagal memuat halaman.</div>`;
    console.error("Router Error:", err);
  }
}
