const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export function getAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("access_token");
}

export async function apiRequest(path, options = {}) {
  const token = getAccessToken();

  // 1. Ekstrak body secara eksplisit agar tidak tabrakan di fetchConfig
  const { body, headers: customHeaders, ...restOptions } = options;

  const headers = {
    Accept: "application/json",
    ...(body ? { "Content-Type": "application/json" } : {}),
    ...(customHeaders || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const fetchConfig = {
    ...restOptions,
    headers,
  };

  // 2. Stringify body HANYA jika ia berbentuk object
  if (body) {
    fetchConfig.body = typeof body === "object" ? JSON.stringify(body) : body;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, fetchConfig);

  const raw = await response.text();
  let data = null;

  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    // 3. Tangkap pesan error VALIDASI 422 dari Laravel secara spesifik!
    let errorMessage = `Request failed (${response.status})`;

    if (data) {
      if (data.errors) {
        // Jika ada error validasi detail, gabungkan semuanya menjadi 1 kalimat
        errorMessage = Object.values(data.errors).flat().join(" | ");
      } else if (data.message) {
        // Jika hanya error message biasa
        errorMessage = data.message;
      }
    }

    // Lempar error agar bisa ditangkap oleh blok catch di chatbot.jsx
    throw new Error(errorMessage);
  }

  return data;
}
