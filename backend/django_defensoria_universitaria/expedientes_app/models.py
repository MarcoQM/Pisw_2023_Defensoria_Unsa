from django.db import models
from solicitudes_app.models import Solicitud

class EstadoExpediente(models.Model):
    nombre = models.CharField(max_length=20)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.nombre
    
class Expediente(models.Model):
    solicitud = models.OneToOneField(Solicitud, on_delete=models.CASCADE)
    numero = models.CharField(max_length=10) #Queda pendiente el tipo y formato '00001'
    estado = models.ForeignKey(EstadoExpediente, on_delete=models.CASCADE)
    fecha_solicitado = models.DateTimeField(auto_now_add=True)
    fecha_recibido = models.DateTimeField(auto_now_add=True)
    fecha_proceso = models.DateTimeField(auto_now_add=True)
    fecha_terminado = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.numero
    
class ProcesoExpediente(models.Model):
    expediente = models.OneToOneField(Expediente, on_delete=models.CASCADE)
    encargado = models.TextField(max_length=50) #Revisar cuando hagamos el modelo usuario
    organo_universitario = models.TextField(max_length=60)
    titulo = models.TextField(max_length=100)
    descripcion = models.TextField(max_length=250)
    usuario = models.IntegerField() #Consultar
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.encargado