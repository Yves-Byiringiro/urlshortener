from django.urls import path
from .views import ShortenURL


urlpatterns = [
    path('shorten', ShortenURL.as_view()),
]
