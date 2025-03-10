from rest_framework import serializers
from .models import URL, URLClickAnalytics


class URLSerializer(serializers.Serializer):
    long_url = serializers.URLField(required=True)

class ShortenURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = URL
        fields = ['short_code', 'long_url', 'clicks', 'created_at']

class ShortenURLAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = URLClickAnalytics
        fields = ['device', 'country', 'ip_address', 'created_at']
