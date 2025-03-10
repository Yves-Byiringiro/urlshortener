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