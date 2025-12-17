import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import FormError from "../components/ui/FormError";
import { validateField } from "../utils/validators";
import api from "../api/api";

function Register() {
  const [form, setForm] = useState({
    full_name: "",
    bio: "",
    number: "",
    password: "",
    password_confirm: ""
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm(prev => ({ ...prev, [name]: value }));

    const error = validateField(name, value, {
      ...form,
      [name]: value
    });

    setErrors(prev => ({ ...prev, [name]: error }));
  }

  function handleBlur(e) {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  }

  function validateForm() {
    const newErrors = {};
    for (const key in form) {
      newErrors[key] = validateField(key, form[key], form);
    }

    setErrors(newErrors);
    setTouched(
      Object.keys(form).reduce((a, k) => ({ ...a, [k]: true }), {})
    );

    return Object.values(newErrors).every(e => !e);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    try {
      const data = await register({
        full_name: form.full_name,
        bio: form.bio,
        number: form.number,
        password: form.password,
        password_confirm: form.password_confirm
      });
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access}`;
    navigate("/")
    } catch {
      setServerError("Ошибка при отправке заявки");
    }
  }

  return (
    <AuthLayout title="Подача заявки">
      <form onSubmit={handleSubmit}>
        <Input
          label="ФИО"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.full_name && errors.full_name}
        />

        <Input
          label="Биография"
          name="bio"
          textarea
          value={form.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.bio && errors.bio}
          placeholder="Коротко о себе и своём опыте"
        />

        <Input
          label="Телефон"
          name="number"
          value={form.number}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.number && errors.number}
        />

        <Input
          label="Пароль"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && errors.password}
        />

        <Input
          label="Повтор пароля"
          type="password"
          name="password_confirm"
          value={form.password_confirm}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password_confirm && errors.password_confirm}
        />

        <FormError message={serverError} />

        <Button type="submit">Отправить заявку</Button>
        <p className="auth-under-text">У Вас есть аккаунт? <a style={{color: "red"}} href="/login">Войти</a></p>
      </form>
    </AuthLayout>
  );
}

export default Register;
