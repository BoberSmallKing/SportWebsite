from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
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
            raise serializers.ValidationError(
                {"password": "Passwords do not match"}
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")
        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user
    
    
class UserLoginSerializer(serializers.Serializer):
    number = serializers.DecimalField(max_digits=11, decimal_places=0)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        number = attrs.get("number")
        password = attrs.get("password")

        user = authenticate(
            request=self.context.get("request"),
            number=number,
            password=password
        )

        if not user:
            raise serializers.ValidationError("Неверный номер или пароль")

        if not user.is_active:
            raise serializers.ValidationError("Аккаунт отключён")

        attrs["user"] = user
        return attrs
            
        
    
