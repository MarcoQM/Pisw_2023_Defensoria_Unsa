from django.db import models
from solicitudes_app.models import Solicitud, EstadoSolicitud
from django.contrib.auth.models import User

# Create your models here.
class Proceso(models.Model):
    solicitud = models.ForeignKey(Solicitud, on_delete=models.PROTECT)
    estado_solicitud = models.ForeignKey(EstadoSolicitud, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    observaciones = models.CharField(max_length=255) # descripcion del proceso
    estado_proceso = models.BooleanField(default=True)
    organo_universitario_encargado = models.CharField(max_length=100, null=True) 
    estado_situacional = models.CharField(max_length=100, null=True) 
    remitido = models.CharField(max_length=100, null=True) 
    recomendacion = models.CharField(max_length=100, null=True) 
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.solicitud.codigo_expediente
    