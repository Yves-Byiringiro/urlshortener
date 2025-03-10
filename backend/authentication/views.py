from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny


from .serializers import (
    UserInfoSerializer,
    RegisterSerializer,
    )
from .utils import get_tokens_for_user
from .models import User


class Register(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        try:
            if serializer.is_valid():
                
                user = User.objects.create(
                    email = serializer.validated_data['email'], 
                    username = serializer.validated_data['username'],
                    password = serializer.validated_data['password']
                ) 

                serialized_user = UserInfoSerializer(user).data
                tokens = get_tokens_for_user(user)

                return Response({
                    "tokens": tokens,
                    "user": serialized_user,
                }, status=status.HTTP_201_CREATED)      
            else:
                return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except:    
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        