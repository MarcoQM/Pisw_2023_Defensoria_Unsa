# Generated by Django 4.2.5 on 2024-01-22 03:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('solicitudes_app', '0008_estadosolicitud_solicitud_encargado_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='solicitud',
            name='encargado',
        ),
        migrations.RemoveField(
            model_name='solicitud',
            name='estado_solicitud',
        ),
    ]
