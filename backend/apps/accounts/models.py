from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    number = models.CharField(max_length=12, unique=True)
    full_name = models.CharField(max_length=200)
    bio = models.TextField(max_length=500, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "number"
    REQUIRED_FIELDS = ["full_name"]

    class Meta:
        db_table = "users"

    def __str__(self):
        return self.full_name
