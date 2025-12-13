from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from .models import Sportsmen
from .serializers import SportsmenSerializer
from .permissions import IsOwner

class SportsmenViewSet(ModelViewSet):
    serializer_class = SportsmenSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Sportsmen.objects.filter(coach=self.request.user)

    def perform_create(self, serializer):
        serializer.save(coach=self.request.user)