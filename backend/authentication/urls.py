from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .views import Register, Login


urlpatterns = [
    path('register', Register.as_view(), name='register'),
    path('login', Login.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),
    path('token', TokenObtainPairView.as_view()),
]
