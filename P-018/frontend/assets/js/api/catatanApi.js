const BASE_URL = "http://localhost:7000/api/catatan";

export async function getAllCatatan(params = {}) {
  const query = new URLSearchParams({
    page: params.page || 1,
    size: params.size || 10,
    search: params.search || "",
    sort_by: params.sortBy || "updated_at",
    sort_dir: params.sortDir || "desc",
    deleted: params.deleted || "0",
  });

  console.log(`${BASE_URL}?${query.toString()}`);

  try {
    const res = await fetch(`${BASE_URL}?${query.toString()}`);
    return await res.json();
  } catch (err) {
    console.error("getAllCatatan Error:", err);
    return { status: "error", message: "Gagal mengambil data catatan." };
  }
}

export async function getCatatanById(id) {
  try {
    console.log(`${BASE_URL}/${id}`);
    const res = await fetch(`${BASE_URL}/${id}`);
    return await res.json();
  } catch (err) {
    console.error("getCatatanById Error:", err);
    return { status: "error", message: "Gagal mengambil data." };
  }
}

export async function createCatatan(data) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("createCatatan Error:", err);
    return { status: "error", message: "Gagal menambahkan catatan." };
  }
}

export async function updateCatatan(id, data) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("updateCatatan Error:", err);
    return { status: "error", message: "Gagal mengubah catatan." };
  }
}

export async function softDeleteCatatan(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return await res.json();
  } catch (err) {
    console.error("softDeleteCatatan Error:", err);
    return { status: "error", message: "Gagal menghapus catatan." };
  }
}

export async function restoreCatatan(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}/restore`, { method: "PATCH" });
    return await res.json();
  } catch (err) {
    console.error("restoreCatatan Error:", err);
    return { status: "error", message: "Gagal merestore catatan." };
  }
}

export async function forceDeleteCatatan(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}/force`, { method: "DELETE" });
    return await res.json();
  } catch (err) {
    console.error("forceDeleteCatatan Error:", err);
    return { status: "error", message: "Gagal menghapus permanen catatan." };
  }
}
