# Generated by Django 4.2.5 on 2024-01-21 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('procesos_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='proceso',
            old_name='estado',
            new_name='estado_solicitud',
        ),
        migrations.AddField(
            model_name='proceso',
            name='estado_proceso',
            field=models.BooleanField(default=True),
        ),
    ]
