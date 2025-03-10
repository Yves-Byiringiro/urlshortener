from urllib.parse import urlparse
from rest_framework import status
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import URL, URLClickAnalytics
from .serializers import URLSerializer, ShortenURLSerializer, ShortenURLAnalyticsSerializer
from .utils import is_valid_url, generate_short_code

class ShortenURL(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        serializer = URLSerializer(data=request.data)

        if not serializer.is_valid():
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = request.user
            long_url = serializer.data.get('long_url')

            if not is_valid_url(long_url):
                return Response({"error": "Invalid URL"}, status=status.HTTP_400_BAD_REQUEST)

            url_instance, created = URL.objects.get_or_create(long_url=long_url, user_id=user)
            if created:
                url_instance.short_code = generate_short_code()
                url_instance.save()

            short_url = request.build_absolute_uri(f"/{url_instance.short_code}")
            return Response({"short_url": short_url}, status=status.HTTP_201_CREATED)    
        except:
            return Response({"error": 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get(self, request):
        try:
            user = request.user
            user_urls = URL.objects.filter(user_id=user)
            serializer_urls = ShortenURLSerializer(user_urls, many=True).data
            return Response({"urls": serializer_urls}, status=status.HTTP_200_OK)
        except:
            return Response({"error": 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

