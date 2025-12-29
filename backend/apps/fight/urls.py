from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("fights", views.FightViewSet, basename="fights")
router.register("sections", views.SportSectionViewSet, basename="sections")
urlpatterns = router.urls



