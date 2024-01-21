from django.db import models
from solicitudes_app.models import Solicitud, EstadoSolicitud
from django.contrib.auth.models import User

# Create your models here.
class Proceso(models.Model):
    solicitud = models.ForeignKey(Solicitud, on_delete=models.PROTECT)
    estado_solicitud = models.ForeignKey(EstadoSolicitud, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    observaciones = models.CharField(max_length=255)
    estado_proceso = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.solicitud.codigo_expediente
    