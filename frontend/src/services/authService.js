import api from "../api/api";

// Регистрация пользователя
export async function register(data) {
  const res = await api.post("auth/register/", data);

  // Если регистрация успешна, сохраняем номер для проверки pending
  if (res.data.user) {
    localStorage.setItem("pending_number", res.data.user.number);
  }

  return res.data; 
}

// Проверка статуса регистрации (exists / is_approved / is_active)
export async function checkRegistrationStatus(number) {
  const res = await api.post("/auth/status/", { number });
  return res.data; // {exists: true/false, is_approved: true/false, is_active: true/false}
}

// Вход пользователя
export async function login(data) {
  const res = await api.post("auth/login/", data);

  if (res.data.status === "pending_approval") {
    localStorage.setItem("pending_number", data.number);
    throw { pending: true }; 
  }

  if (res.data.access && res.data.refresh) {
    saveTokens(res.data);
  }

  return res.data;
}

// Выход пользователя
export async function logout() {
  const refresh = localStorage.getItem("refresh_token");

  if (refresh) {
    try {
      await api.post("auth/logout/", { refresh_token: refresh });
    } catch (err) {
      console.error("Logout error", err);
    }
  }

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  delete api.defaults.headers.common["Authorization"];
}

function saveTokens(data) {
  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);
  api.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
}
