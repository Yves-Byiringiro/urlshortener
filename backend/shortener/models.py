from django.db import models
from django.conf import settings


class URL(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    short_code = models.CharField(max_length=50, unique=True, blank=False, null=False)
    long_url = models.URLField(blank=False, null=False)
    created_at = models.DateField(auto_now_add=True)
    clicks = models.IntegerField(default=0)

    class Meta:
        indexes = [
            models.Index(fields=['short_code']),
        ]

    def __str__(self):
        return self.short_code

class URLClickAnalytics(models.Model):
    url = models.ForeignKey(URL, on_delete=models.CASCADE)
    device = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    