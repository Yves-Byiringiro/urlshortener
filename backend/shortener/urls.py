from django.urls import path
from .views import ShortenURL, GetOriginalURL


urlpatterns = [
    path('shorten', ShortenURL.as_view()),
    path('urls', ShortenURL.as_view()),
    path('<str:short_code>', GetOriginalURL.as_view()), 


]
