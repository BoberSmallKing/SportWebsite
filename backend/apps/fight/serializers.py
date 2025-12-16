# fights/serializers.py
from rest_framework import serializers
from .models import Fight
from .services import promote_rating, demote_rating

class FightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fight
        fields = '__all__'
        read_only_fields = ('is_finished',)

    def update(self, instance, validated_data):
        winner = validated_data.get('winner')

        if instance.is_finished:
            raise serializers.ValidationError(
                'Бой уже завершён'
            )

        if winner:
            loser = (
                instance.second_sportsmen
                if winner == instance.first_sportsmen
                else instance.first_sportsmen
            )

            winner.rating = promote_rating(winner.rating)
            loser.rating = demote_rating(loser.rating)

            winner.save()
            loser.save()

            instance.is_finished = True

        return super().update(instance, validated_data)
    
    
