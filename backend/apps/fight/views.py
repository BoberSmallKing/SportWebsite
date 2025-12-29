from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import Fight, SportSection
from .serializers import FightSerializer, SportSectionSerializer


class FightViewSet(ModelViewSet):
    serializer_class = FightSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Fight.objects.filter(
            first_sportsmen__coach=user
        )

    def perform_create(self, serializer):
        serializer.save()


class SportSectionViewSet(ReadOnlyModelViewSet):
    """
    Только чтение:
    - список разделов
    - один раздел
    """
    serializer_class = SportSectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = SportSection.objects.select_related("sport")

        sport_slug = self.request.query_params.get("sport")
        if sport_slug:
            queryset = queryset.filter(sport__slug=sport_slug)

        return queryset