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
    template: "./templates/form.html", // Reuse form template for edit
    script: "./assets/js/pages/form.js",
  },
};

async function loadTemplate(templatePath) {
  const response = await fetch(templatePath);
  return response.text();
  // await loadTemplate('./templates/list.html') -. return string isi file HTML
}

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
  console.log("LoadScript dipanggil untuk: ", scriptPath);
  try {
    const version = Date.now();
    const fullPath =
      location.origin +
      "/" +
      scriptPath.replace(/^\.?\//, "") +
      `?v=${version}`;
    console.log("--> fullPath: ", fullPath);
    const module = await import(/* @vite-ignore */ fullPath);
    console.log("module loaded via import(): ", fullPath);
    if (typeof module.init === "function") {
      module.init(); // panggil fungsi init()
    } else {
      console.log("Tidak ditemukan init() di ", scriptPath);
    }
    return module;
  } catch (err) {
    console.log("Gagal load module: ", scriptPath, err);
  }
}

export async function router() {
  const hash = window.location.hash || "#/list";
  // http://localhost:5000/#/list?page=1&size=5
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
