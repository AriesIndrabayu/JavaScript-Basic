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
    template: "./templates/form.html", // Reuse form template for edit
    script: "./assets/js/pages/form.js",
  },
};

async function loadTemplate(templatePath) {
  const response = await fetch(templatePath);
  return response.text();
}

// async function loadScript(scriptPath) {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement("script");
//     script.src = scriptPath;
//     script.type = "module";
//     // script.onload = resolve;
//     script.onload = () => {
//       console.log("✅ Script loaded:", scriptPath); // ✅ cek error
//       resolve();
//     };
//     // script.onerror = reject;
//     script.onerror = (err) => {
//       console.error("❌ Script failed to load:", scriptPath, err);
//       reject(err);
//     };
//     document.body.appendChild(script);
//   });
// }

// async function loadScript(scriptPath) {
//   try {
//     const fullPath = location.origin + "/" + scriptPath.replace(/^\.?\//, "");
//     await import(/* @vite-ignore */ fullPath);
//     console.log("✅ Module loaded:", fullPath);
//   } catch (err) {
//     console.error("❌ Gagal load module:", scriptPath, err);
//     throw err;
//   }
// }

async function loadScript(scriptPath) {
  try {
    const fullPath = location.origin + "/" + scriptPath.replace(/^\.?\//, "");
    const module = await import(/* @vite-ignore */ fullPath);
    console.log("✅ Module loaded:", fullPath);
    return module;
  } catch (err) {
    console.error("❌ Gagal load module:", scriptPath, err);
    throw err;
  }
}

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
    // await loadScript(route.script);
    const module = await loadScript(route.script);
    if (module?.init) {
      module.init();
    }
  } catch (err) {
    document.getElementById(
      "app"
    ).innerHTML = `<div class="alert alert-danger">Gagal memuat halaman.</div>`;
    console.error("Router Error:", err);
  }
}
