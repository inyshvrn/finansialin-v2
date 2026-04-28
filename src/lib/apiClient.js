const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/backend";

// Cache store for GET requests
const cache = new Map();
const CACHE_TTL = 30 * 1000; // 30 seconds

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

const normalizePath = (path) => {
  return path.startsWith('/') ? path : `/${path}`;
};

async function fetchWithRetryAndTimeout(url, options = {}, retries = 2) {
  const timeout = 10000; // 10 seconds
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  // Link user signal if provided
  const userSignal = options.signal;
  if (userSignal) {
    userSignal.addEventListener('abort', () => controller.abort());
  }

  const fetchOptions = {
    ...options,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, fetchOptions);
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    
    // Don't retry if user explicitly aborted
    if (userSignal && userSignal.aborted) {
      throw error;
    }
    
    if (retries > 0) {
      return fetchWithRetryAndTimeout(url, options, retries - 1);
    }
    throw error;
  }
}

async function request(method, path, body = null, options = {}) {
  const normalizedPath = normalizePath(path);
  const url = `${API_BASE_URL}${normalizedPath}`;
  
  const token = getAccessToken();
  const headers = {
    Accept: "application/json",
    ...(body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Handle Cache for GET
  const cacheKey = url;
  if (method === 'GET' && !options.noCache) {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
  }

  const fetchOptions = {
    ...options,
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetchWithRetryAndTimeout(url, fetchOptions);
  
  let data = null;
  const raw = await response.text();
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }

  if (method === 'GET') {
    cache.set(cacheKey, { data, timestamp: Date.now() });
  }

  return data;
}

export const apiGet = (path, options) => request('GET', path, null, options);
export const apiPost = (path, body, options) => request('POST', path, body, options);
export const apiPut = (path, body, options) => request('PUT', path, body, options);
export const apiDelete = (path, options) => request('DELETE', path, null, options);
