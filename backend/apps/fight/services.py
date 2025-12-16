RATING_ORDER = ['diamond', 'gold']


def promote_rating(current):
    if current not in RATING_ORDER:
        return current

    idx = RATING_ORDER.index(current)
    if idx < len(RATING_ORDER) - 1:
        return RATING_ORDER[idx + 1]
    return current


def demote_rating(current):
    if current not in RATING_ORDER:
        return current

    idx = RATING_ORDER.index(current)
    if idx > 0:
        return RATING_ORDER[idx - 1]
    return current
