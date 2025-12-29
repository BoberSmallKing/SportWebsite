from django.db import models
from apps.sportsmen.models import Sportsmen

class Sport(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name = "Sport"
        verbose_name_plural = "Sports"

    def __str__(self):
        return self.name


class SportSection(models.Model):
    sport = models.ForeignKey(
        Sport,
        on_delete=models.CASCADE,
        related_name="sections"
    )
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Sport section"
        verbose_name_plural = "Sport sections"
        unique_together = ("sport", "name")

    def __str__(self):
        return f"{self.sport.name} — {self.name}"


class Fight(models.Model):
    first_sportsmen = models.ForeignKey(
        Sportsmen,
        on_delete=models.CASCADE,
        related_name="first_fights"
    )
    second_sportsmen = models.ForeignKey(
        Sportsmen,
        on_delete=models.CASCADE,
        related_name="second_fights"
    )

    section = models.ForeignKey(
        SportSection,
        on_delete=models.PROTECT,
        related_name="fights"
    )

    date = models.DateField()
    is_rating = models.BooleanField(default=True)
    count_rounds = models.PositiveIntegerField(default=0)

    winner = models.ForeignKey(
        Sportsmen,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="wins"
    )

    is_finished = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Fight"
        verbose_name_plural = "Fights"
        ordering = ["-date"]

    def __str__(self):
        return f"{self.first_sportsmen} vs {self.second_sportsmen} ({self.section})"

