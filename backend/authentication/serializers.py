from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import User



class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username'] 


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(required=False)
    email = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, min_length=6)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise ValidationError("A user with this email already exists.")
        return value

    def validate(self, data):
        if 'password' in data and len(data['password']) < 6:
            raise ValidationError("Password must be at least 6 characters long.")
        return data

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise ValidationError("Invalid email or password.")

        if not user.check_password(password):
            raise ValidationError("Invalid email or password.")

        return user

class LogoutSerialiazer(serializers.Serializer):
    refresh = serializers.CharField()
    
    def validate(self, data):
        refresh = data.get('refresh')
        if not refresh:
            raise serializers.ValidationError("Refresh token is required")
        return data