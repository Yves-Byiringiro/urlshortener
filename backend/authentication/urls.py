from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .views import Register


urlpatterns = [
    path('register', Register.as_view(), name='register'),
    path('token/refresh', TokenRefreshView.as_view()),
    path('token', TokenObtainPairView.as_view()),
]
