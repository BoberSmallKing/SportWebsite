from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, number, password=None, **extra_fields):
        if not number:
            raise ValueError("Номер телефона обязателен")

        user = self.model(number=number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, number, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_approved", True)

        return self.create_user(number, password, **extra_fields)
