from django.db import models
from .manager import UserManager
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.hashers import make_password, check_password


class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, blank=True, null=True)
    password_hash = models.CharField(max_length=128, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = UserManager()

    def set_password(self, raw_password):
        self.password_hash = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password_hash)
    

    def has_perm(self, perm, obj=None):
        return self.is_superuser or self.is_staff

    def has_module_perms(self, app_label):
        return self.is_superuser or self.is_staff