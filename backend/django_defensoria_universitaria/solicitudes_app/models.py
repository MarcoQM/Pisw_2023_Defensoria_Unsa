from django.db import models
from sedes_app.models import Sede
import uuid

# Create your models here.
class RolSolicitud(models.Model):
    nombre = models.CharField(max_length=20)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.nombre
    
class TipoSolicitud(models.Model):
    nombre = models.CharField(max_length=20)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.nombre
    
class Solicitud(models.Model):
    rol = models.ForeignKey(RolSolicitud, on_delete=models.CASCADE) 
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    dni = models.CharField(max_length=8)
    cui = models.CharField(max_length=8)
    sede = models.ForeignKey(Sede, on_delete=models.CASCADE)
    direccion = models.CharField(max_length=80)
    telefono = models.CharField(max_length=15)
    correo = models.CharField(max_length=30)
    tipo = models.ForeignKey(TipoSolicitud, on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=250)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.nombre