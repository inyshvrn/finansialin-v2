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

  const { body, headers: customHeaders, ...restOptions } = options;

  // 1. Cek apakah datanya berupa File (FormData) untuk fitur OCR
  const isFormData = typeof window !== "undefined" && body instanceof FormData;

  const headers = {
    Accept: "application/json",
    ...(customHeaders || {}),
  };

  // 2. JANGAN set Content-Type ke JSON jika kita mengirim File Gambar
  if (body && !isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const fetchConfig = {
    ...restOptions,
    headers,
  };

  // 3. Jika FormData, biarkan formatnya asli. Jika JSON, baru di-stringify.
  if (body) {
    fetchConfig.body = isFormData
      ? body
      : typeof body === "object"
      ? JSON.stringify(body)
      : body;
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
    let errorMessage = `Request failed (${response.status})`;

    if (data) {
      if (data.errors) {
        errorMessage = Object.values(data.errors).flat().join(" | ");
      } else if (data.message) {
        errorMessage = data.message;
      }
    }

    throw new Error(errorMessage);
  }

  return data;
}