import api from "../api/api";

export async function register(data) {
  const res = await api.post("/auth/register/", data);
  saveTokens(res.data);
  return res.data;
}

export async function login(data) {
  const res = await api.post("/auth/login/", data);
  saveTokens(res.data);
  return res.data;
}

export function logout(refresh) {
  localStorage.removeItem("refresh");
  return api.post("/auth/logout/", { refresh_token: refresh });
}

function saveTokens(data) {
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
}
