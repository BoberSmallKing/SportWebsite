from django.db import models
from django.conf import settings


class Sportsmen(models.Model):
    coach = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='sportsmen')
    full_name = models.CharField(max_length=200)
    photo = models.ImageField(upload_to='sportsmen_photos/', default='sportsmen_photos/default.jpg')
    description = models.TextField()
    achievement = models.TextField(
        help_text="Каждое достижение с новой строки"
    )

    RATING_CHOICES = [
        ('gold', 'Золотой'),
        ('diamond', 'Алмазный'),
        ('green', 'Зеленый'),
        ('red', 'Красный'),
    ]

    rating = models.CharField(
        max_length=10,
        choices=RATING_CHOICES,
        default='green'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_achievements_list(self):
        return [a.strip() for a in self.achievement.split('\n') if a.strip()]

    def __str__(self):
        return self.full_name
    
