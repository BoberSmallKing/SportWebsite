from django.db import models
from apps.sportsmen.models import Sportsmen


class Fight(models.Model):
    first_sportsmen = models.ForeignKey(
        Sportsmen,
        on_delete=models.CASCADE,
        related_name='first_fights'
    )
    second_sportsmen = models.ForeignKey(
        Sportsmen,
        on_delete=models.CASCADE,
        related_name='second_fights'
    )

    date = models.DateField()
    is_rating = models.BooleanField(default=True)

    winner = models.ForeignKey(
        Sportsmen,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='wins'
    )

    is_finished = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Fight'
        verbose_name_plural = 'Fights'
        ordering = ['-date']

    def __str__(self):
        return f'{self.first_sportsmen} vs {self.second_sportsmen}'
