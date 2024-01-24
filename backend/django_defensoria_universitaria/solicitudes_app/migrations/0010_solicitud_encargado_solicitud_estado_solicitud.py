# Generated by Django 4.2.5 on 2024-01-22 04:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('solicitudes_app', '0009_remove_solicitud_encargado_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='solicitud',
            name='encargado',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='solicitud',
            name='estado_solicitud',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='solicitudes_app.estadosolicitud'),
        ),
    ]
