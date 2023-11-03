from django.db import models
from solicitudes_app.models import Solicitud
from django.contrib.auth.models import User

# Create your models here.
class Estado(models.Model):
    nombre = models.CharField(max_length=20)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
     
    def __str__(self):
        return self.nombre

class Proceso(models.Model):
    solicitud = models.ForeignKey(Solicitud, on_delete=models.PROTECT)
    estado = models.ForeignKey(Estado, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    observaciones = models.CharField(max_length=255)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.solicitud.codigo_expediente
    