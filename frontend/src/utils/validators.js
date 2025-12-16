export function validateField(name, value, form = {}) {
    switch (name) {
      case "full_name":
        if (!value.trim()) return "Введите полное имя";
        if (value.length < 3) return "Минимум 3 символа";
        return "";
  
      case "number":
        if (!value.trim()) return "Введите номер телефона";
        if (!/^\+?\d{9,15}$/.test(value))
          return "Неверный формат номера";
        return "";
  
      case "password":
        if (value.length < 6) return "Минимум 8 символов";
        return "";
  
      case "password_confirm":
        if (value !== form.password) return "Пароли не совпадают";
        return "";
  
      case "bio":
        if (value.length > 300) return "Максимум 300 символов";
        return "";
  
      default:
        return "";
    }
  }
  