# Generated by Django 4.2.5 on 2023-10-29 16:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('solicitudes_app', '0003_rename_nombrearchivo_archivosolicitud_nombre'),
    ]

    operations = [
        migrations.AlterField(
            model_name='archivosolicitud',
            name='solicitud',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='archivos', to='solicitudes_app.solicitud'),
        ),
    ]
