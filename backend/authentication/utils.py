from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken


def get_tokens_for_user(user):

    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "expires_at": str(timezone.now().astimezone() + refresh.access_token.lifetime),
    }