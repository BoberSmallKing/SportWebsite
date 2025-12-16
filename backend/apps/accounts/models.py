from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    username = None
    
    full_name = models.CharField(max_length=200)
    bio = models.TextField(max_length=500)
    number = models.DecimalField(max_digits=11, decimal_places=0, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    USERNAME_FIELD = 'number'
    REQUIRED_FIELDS = []
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return self.full_name
    

    



