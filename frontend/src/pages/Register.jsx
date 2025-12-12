import { useState } from "react";
import api from "../api/api";
import { register as registerUser } from "../services/authService";

function Register() {
  const [form, setForm] = useState({
    username: "",
    full_name: "",
    bio: "",
    number: "",
    password: "",
    password_confirm: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.password_confirm) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      const data = await registerUser(form);

      api.defaults.headers.common["Authorization"] = "Bearer " + data.access;

      setSuccess("Регистрация успешна!");
    } catch (err) {
      console.error(err);
      setError("Ошибка регистрации. Проверьте данные.");
    }
  }

  return (
    <div style={{ maxWidth: 450, margin: "40px auto" }}>
      <h2>Регистрация</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>Логин (username)</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Логин"
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Полное имя</label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            placeholder="Полное имя"
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Номер телефона</label>
          <input
            type="text"
            name="number"
            value={form.number}
            onChange={handleChange}
            placeholder="Введите номер"
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Биография</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="О себе"
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Пароль</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Пароль"
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Повторите пароль</label>
          <input
            type="password"
            name="password_confirm"
            value={form.password_confirm}
            onChange={handleChange}
            placeholder="Повторите пароль"
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit" style={{ padding: 10, width: "100%" }}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Register;
