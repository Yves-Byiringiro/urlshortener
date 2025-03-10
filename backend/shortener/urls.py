from django.urls import path
from .views import ShortenURL, GetOriginalURL, ShortenURLAnalytics


urlpatterns = [
    path('shorten', ShortenURL.as_view()),
    path('urls', ShortenURL.as_view()),
    path('<str:short_code>', GetOriginalURL.as_view()), 
    path('analytics/<str:shortUrl>', ShortenURLAnalytics.as_view()),
]
