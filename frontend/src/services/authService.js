import api from "../api/api";

export async function register(data) {
  const res = await api.post("auth/register/", data);
  saveTokens(res.data);
  return res.data;
}

export async function login(data) {
  const res = await api.post("auth/login/", data);
  saveTokens(res.data);
  return res.data;
}

export async function logout() {
  const refresh = localStorage.getItem("refresh_token");

  if (refresh) {
    await api.post("auth/logout/", { refresh });
  }

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

function saveTokens(data) {
  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);
}
