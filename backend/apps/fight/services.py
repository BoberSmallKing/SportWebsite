import math
from django.db import transaction

K = 32

def expected_score(rating_a, rating_b):
    return 1 / (1 + 10 ** ((rating_b - rating_a) / 400))

def elo_change(player_rating, opponent_rating, result):
    expected = expected_score(player_rating, opponent_rating)
    return round(K * (result - expected))

@transaction.atomic
def apply_fight_result(winner, loser):
    winner_delta = elo_change(winner.rating, loser.rating, 1)
    if winner_delta <= 0:
        winner_delta = 1
        
    loser_delta = elo_change(loser.rating, winner.rating, 0)
    winner.rating += winner_delta
    loser.rating += loser_delta

    winner.save()
    loser.save()
    return {
        str(winner.id): winner_delta,
        str(loser.id): loser_delta
    }