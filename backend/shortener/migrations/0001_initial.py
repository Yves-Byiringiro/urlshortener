# Generated by Django 5.1.7 on 2025-03-10 04:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='URL',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('short_code', models.CharField(max_length=50, unique=True)),
                ('long_url', models.URLField()),
                ('created_at', models.DateField(auto_now_add=True)),
                ('clicks', models.IntegerField(default=0)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='URLClickAnalytics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device', models.CharField(blank=True, max_length=50, null=True)),
                ('country', models.CharField(blank=True, max_length=100, null=True)),
                ('ip_address', models.GenericIPAddressField(blank=True, null=True)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('url', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shortener.url')),
            ],
        ),
        migrations.AddIndex(
            model_name='url',
            index=models.Index(fields=['short_code'], name='shortener_u_short_c_50dfff_idx'),
        ),
    ]
