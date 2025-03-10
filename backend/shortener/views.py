from urllib.parse import urlparse
from rest_framework import status
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import URL, URLClickAnalytics
from .serializers import URLSerializer, ShortenURLSerializer, ShortenURLAnalyticsSerializer
from .utils import is_valid_url, generate_short_code, get_device, get_location, get_ip_address


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

class GetOriginalURL(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, short_code):
        try:
            url_instance = URL.objects.get(short_code=short_code)

            device = get_device(request)
            location = get_location(request)
            ip_address = get_ip_address(request)

            URLClickAnalytics.objects.create(
                url=url_instance,
                device=device,
                country=location,
                ip_address=ip_address
            )

            url_instance.clicks += 1
            url_instance.save()

            return Response({"long_url": url_instance.long_url}, status=status.HTTP_200_OK)
        except URL.DoesNotExist:
            return Response({"error": "URL not found"}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"error": 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ShortenURLAnalytics(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, shortUrl):
        try:
            parsed_url = urlparse(shortUrl)
            short_code = parsed_url.path.strip('/') if parsed_url.netloc else shortUrl.strip('/')

            if not short_code:
                return Response({"error": "Invalid short URL"}, status=status.HTTP_400_BAD_REQUEST)

            url_instance = URL.objects.get(short_code=short_code)

            url_analytics = URLClickAnalytics.objects.filter(url=url_instance)
            serialized_url_analytics = ShortenURLAnalyticsSerializer(url_analytics, many=True).data
            return Response({"analytics": serialized_url_analytics}, status=status.HTTP_200_OK)
        except URL.DoesNotExist:
            return Response({"error": "URL provided not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
