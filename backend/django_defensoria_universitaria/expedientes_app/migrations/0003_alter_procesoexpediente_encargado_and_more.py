# Generated by Django 4.2.5 on 2023-09-29 05:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expedientes_app', '0002_alter_expediente_fecha_proceso_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='procesoexpediente',
            name='encargado',
            field=models.TextField(max_length=50),
        ),
        migrations.AlterField(
            model_name='procesoexpediente',
            name='organo_universitario',
            field=models.TextField(max_length=60),
        ),
    ]
