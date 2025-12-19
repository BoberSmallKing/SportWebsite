from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login
from rest_framework.views import APIView


from .models import User
from .serializers import *

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({
            'user': UserRegistrationSerializer(user).data,
            'message': 'Заявка на регистрацию отправлена. Ожидайте одобрения администратором.'
        }, status=status.HTTP_201_CREATED)
        

class RegistrationStatusView(APIView):
    permission_classes = []  # Доступно без токена

    def post(self, request):
        number = request.data.get("number")
        if not number:
            return Response({"detail": "Номер телефона обязателен"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(number=number)
            return Response({
                "exists": True,
                "is_approved": user.is_approved,
                "is_active": user.is_active
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"exists": False}, status=status.HTTP_200_OK)

        
        

class LoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        login(request, user)
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserRegistrationSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'User login succesfully'
        }, status=status.HTTP_200_OK)
        
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data.get('refresh_token')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        return Response({
            'message': 'Logout successful!'
        }, status=status.HTTP_200_OK)
    except Exception:
        return Response({
            'error': 'Invalid token'
        }, status=status.HTTP_400_BAD_REQUEST)

