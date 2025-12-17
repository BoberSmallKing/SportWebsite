import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/authService";
import api from "../api/api";

import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import FormError from "../components/ui/FormError";
import { validateField } from "../utils/validators";

function Login() {
  const [form, setForm] = useState({
    number: "",
    password: ""
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
    setTouched({ number: true, password: true });

    return Object.values(newErrors).every(e => !e);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    if (!validateForm()) return;
    try {
      const data = await login({
        number: form.number,
        password: form.password
      });
  
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access}`;
      navigate("/")
    } catch {
      setServerError("Неверный номер телефона или пароль");
    }
  }
  

  return (
    <AuthLayout title="Вход">
      <form onSubmit={handleSubmit} noValidate>
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

        <FormError message={serverError} />

        <Button type="submit">Войти</Button>
        <p className="auth-under-text">Вы подали заявку? <a style={{color: "red"}} href="/register">Заявка</a></p>
      </form>
    </AuthLayout>
  );
}

export default Login;
