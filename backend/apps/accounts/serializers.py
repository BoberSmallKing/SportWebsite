from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from .models import User
from .services import create_telegraph_account

class UserRegistrationSerializer(serializers.ModelSerializer):
    number = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="Заявка с этим номером уже подана"
            )
        ]
    )

    password = serializers.CharField(
        write_only=True,
        validators=[validate_password]
    )
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("number", "full_name", "bio", "password", "password_confirm")

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError({
                "password": "Пароли не совпадают"
            })
        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        try:
            telegraph_data = create_telegraph_account(user.full_name)
            user.acess_token = telegraph_data['access_token']
            user.author_name = telegraph_data['author_name']
            user.url_main_page = telegraph_data['url']
        except Exception as e:
            raise serializers.ValidationError({"telegraph_error": "Не удалось создать страницу в Telegraph"})

        user.save()
        return user
    
    
class UserLoginSerializer(serializers.Serializer):
    number = serializers.CharField(max_length=12)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        number = attrs.get("number")
        password = attrs.get("password")

        user = authenticate(
            request=self.context.get("request"),
            number=number,
            password=password
        )
        
        if not user.is_approved:
            raise serializers.ValidationError({
        "status": "pending_approval",
        "detail": "Ваша заявка на регистрацию еще находится на рассмотрении."
    })
        if not user:
            raise serializers.ValidationError("Неверный номер или пароль")

        if not user.is_active:
            raise serializers.ValidationError("Аккаунт отключён")

        attrs["user"] = user
        return attrs
            
        
    
