from rest_framework import serializers
from .models import Sportsmen

class SportsmenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sportsmen
        fields = ("id", "full_name", "photo", "description", "achievement", "division", "rating")
        read_only_fields = ("coach",)