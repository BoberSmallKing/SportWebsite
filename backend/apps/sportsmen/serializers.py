from rest_framework import serializers
from .models import Sportsmen

class SportsmenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sportsmen
        fields = "__all__"
        read_only_fields = ("coach",)