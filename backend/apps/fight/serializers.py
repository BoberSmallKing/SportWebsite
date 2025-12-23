from rest_framework import serializers
from .models import Fight
from .services import apply_fight_result


class FightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fight
        fields = '__all__'
        read_only_fields = ('is_finished',)

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

            if instance.is_rating:
                apply_fight_result(winner, loser)

            instance.is_finished = True

        return super().update(instance, validated_data)
