from rest_framework import serializers
from .models import Fight, SportSection
from .services import apply_fight_result

class FightSerializer(serializers.ModelSerializer):
    rating_changes = serializers.SerializerMethodField()
    first_sportsmen_name = serializers.CharField(source='first_sportsmen.full_name', read_only=True)
    second_sportsmen_name = serializers.CharField(source='second_sportsmen.full_name', read_only=True)
    
    first_sportsmen_rating = serializers.IntegerField(source='first_sportsmen.rating', read_only=True)
    second_sportsmen_rating = serializers.IntegerField(source='second_sportsmen.rating', read_only=True)
    
    discipline_display = serializers.SerializerMethodField()

    class Meta:
        model = Fight
        fields = (
            'id', 'first_sportsmen', 'second_sportsmen', 'winner', 
            'date', 'is_rating', 'is_finished', 'count_rounds','section',
            'first_sportsmen_name', 'second_sportsmen_name',
            'first_sportsmen_rating', 'second_sportsmen_rating',
            'discipline_display', 'rating_changes'
        )
        read_only_fields = ('is_finished',)

    def get_discipline_display(self, obj):
        if obj.section and obj.section.sport:
            return f"{obj.section.sport.name} — {obj.section.name}"
        return "Unknown Discipline"

    def get_rating_changes(self, obj):
        return getattr(obj, '_rating_diffs', None)

    def update(self, instance, validated_data):
        if instance.is_finished:
            raise serializers.ValidationError("Бой уже завершён")

        winner = validated_data.get('winner')

        if winner:
            if winner not in (instance.first_sportsmen, instance.second_sportsmen):
                raise serializers.ValidationError("Победитель не участвует в бою")

            loser = (
                instance.second_sportsmen
                if winner == instance.first_sportsmen
                else instance.first_sportsmen
            )

            rating_diffs = None

            if instance.is_rating:
                rating_diffs = apply_fight_result(winner, loser)
            
            instance._rating_diffs = rating_diffs
            instance.is_finished = True
            instance.winner = winner

        return super().update(instance, validated_data)

class SportSectionSerializer(serializers.ModelSerializer):
    sport = serializers.SerializerMethodField()

    class Meta:
        model = SportSection
        fields = ("id", "name", "sport")

    def get_sport(self, obj):
        return {
            "id": obj.sport.id,
            "name": obj.sport.name,
            "slug": obj.sport.slug,
        }