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
        if (value.length < 8) return "Минимум 8 символов";
        return "";
  
      case "password_confirm":
        if (value !== form.password) return "Пароли не совпадают";
        return "";
  
      case "bio":
        if (value.length > 500) return "Максимум 500 символов";
        return "";
  
      case "first_sportsmen":
        if (!value) return "Выберите первого бойца";
        return "";
  
      case "second_sportsmen":
        if (!value) return "Выберите второго бойца";
        if (value === form.first_sportsmen) return "Боец не может драться сам с собой";
        return "";
  
      case "date":
        if (!value) return "Укажите дату боя";
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return "Нельзя назначить бой на прошедшую дату";
        return "";
  
      default:
        return "";
    }
  }
  