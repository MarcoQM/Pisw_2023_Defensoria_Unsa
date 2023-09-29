from django.db import models
import uuid

# Create your models here.

class Sede(models.Model):
    # Campo UUID
    #uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    #id = models.IntegerField(primary_key=True)
    # Otros campos del modelo
    nombre = models.CharField(max_length=250)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.nombre
