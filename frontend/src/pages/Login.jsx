import { useState } from "react";
import api from "../api/api";
import { login } from "../services/authService";

function Login() {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await login({ number, password });
      api.defaults.headers.common["Authorization"] = "Bearer " + data.access;

      alert("Успешный вход!");
    } catch (err) {
      setError("Неверные данные или проблемы с сервером");
      console.error(err);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Вход</h2>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: 15 }}>
          <label>Номер телефона</label>
          <input
            type="text"
            value={number}
            onChange={e => setNumber(e.target.value)}
            placeholder="Введите номер"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Введите пароль"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        {error && (
          <p style={{ color: "red", marginBottom: 15 }}>
            {error}
          </p>
        )}

        <button type="submit" style={{ padding: 10, width: "100%" }}>
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
