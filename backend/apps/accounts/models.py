from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    full_name = models.CharField(max_length=200)
    bio = models.TextField(max_length=500)
    number = models.DecimalField(max_digits=11, decimal_places=0, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    USERNAME_FIELD = 'number'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return self.full_name
    
class Sportsmen(models.Model):
    full_name = models.CharField(max_length=200)
    photo = models.ImageField(upload_to='sportsmen_photos/',blank=True,null=True)
    description = models.TextField(max_length=1000)
    number = models.DecimalField(max_digits=11, decimal_places=0, unique=True, blank=True,null=True)
    achievement = models.TextField(
        help_text="Каждое достижение с новой строки"
    )

    RATING_CHOICES = [
        ('red', 'Красный'),
        ('green', 'Зеленый'),
        ('diamond', 'Алмазный'),
        ('gold', 'Золотой'),
    ]

    rating = models.CharField(
        max_length=10,
        choices=RATING_CHOICES,
        default='green'
    )

    def get_achievements_list(self):
        return [a.strip() for a in self.achievement.split('\n') if a.strip()]

    def __str__(self):
        return self.full_name
    
    



