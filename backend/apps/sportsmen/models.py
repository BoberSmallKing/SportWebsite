from django.db import models
from django.conf import settings
from .ratings import RANKS


class Sportsmen(models.Model):
    coach = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sportsmen'
    )

    full_name = models.CharField(max_length=200)
    photo = models.ImageField(upload_to='sportsmen_photos/', default='sportsmen_photos/default.jpg')
    description = models.TextField()
    achievement = models.TextField(help_text="Каждое достижение с новой строки")

    RATING_CHOICES = [
        ('gold', 'Золотой'),
        ('diamond', 'Алмазный'),
        ('green', 'Зеленый'),
        ('red', 'Красный'),
    ]

    division = models.CharField(max_length=10, choices=RATING_CHOICES, default='red')
    rating = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def update_rank_by_rating(self):
        for division, data in RANKS.items():
            if data["min"] <= self.rating <= data["max"]:
                self.division = division
                return

    def save(self, *args, **kwargs):
        is_new = self.pk is None

        # Если объект создаётся впервые и рейтинг не задан явно
        if is_new and self.rating == 0:
            self.rating = RANKS[self.division]["min"]

        super().save(*args, **kwargs)

    def __str__(self):
        return self.full_name