from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Fight
from .serializers import FightSerializer


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
