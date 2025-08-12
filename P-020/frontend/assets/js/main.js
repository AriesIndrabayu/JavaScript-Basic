import { router } from "./router.js";
import { initReloadButton } from "./component/reload.js";

initReloadButton();
console.log("📦 main.js loaded");

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);
