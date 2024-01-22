from django.db import models
from sedes_app.models import Sede
import uuid
from uuid import uuid4
from datetime import date
import os
from django.contrib.auth.models import User
from  rest_framework.authtoken.models import Token

# Create your models here.
class TipoSolicitud(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.nombre
    
class EstadoSolicitud(models.Model):
    nombre = models.CharField(max_length=20)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
     
    def __str__(self):
        return self.nombre

class Solicitud(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    codigo_expediente = models.CharField(max_length=20, unique=True, editable=False)  # Campo para el código de expediente
    rol = models.CharField(max_length=30, null=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    dni = models.CharField(max_length=8)
    cui = models.CharField(max_length=8, null=True, blank=True)
    sede = models.ForeignKey(Sede, on_delete=models.PROTECT)
    direccion = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    correo = models.CharField(max_length=30)
    tipo_solicitud = models.ForeignKey(TipoSolicitud, on_delete=models.PROTECT)
    descripcion = models.CharField(max_length=250)
    organo_universitario = models.CharField(max_length=80, null=True)
    encargado = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    estado_solicitud = models.ForeignKey(EstadoSolicitud, on_delete=models.PROTECT, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if not self.codigo_expediente:
            # Obtener el año actual
            year = date.today().year
            # Obtener la última solicitud del año actual (si existe)
            ultima_solicitud = Solicitud.objects.filter(codigo_expediente__contains=f"-{year}").order_by('-codigo_expediente').first()
            if ultima_solicitud:
                # Obtener el número actual de la solicitud
                numero_actual = int(ultima_solicitud.codigo_expediente.split('DU')[0])
                # Generar el nuevo número de solicitud
                nuevo_numero = numero_actual + 1
            else:
                # No hay solicitudes para este año, comenzar desde 1
                nuevo_numero = 1
            # Generar el nuevo código de expediente
            self.codigo_expediente = f"{nuevo_numero:04d}DU-{year}"
        super(Solicitud, self).save(*args, **kwargs)
        
    def __str__(self):
        return self.codigo_expediente
    
def archivo_ruta(instance, filename):
    # Generar un nombre de archivo único con el UUID
    nombre_archivo, extension = os.path.splitext(filename)
    nombre_archivo = str(uuid4())
    
    # Obtener el código de expediente de la instancia de solicitud
    codigo_expediente = instance.solicitud.codigo_expediente
    
    # Construir la ruta completa
    ruta = f'solicitudes/{codigo_expediente}/{nombre_archivo}{extension}'
    
    return ruta

class Archivo(models.Model):
    id = models.AutoField(primary_key=True)
    solicitud = models.ForeignKey(Solicitud, on_delete=models.CASCADE, related_name='archivos')
    #nombre = models.CharField(max_length=100)
    archivo = models.FileField(upload_to=archivo_ruta)
    
    def __str__(self):
        return self.solicitud.codigo_expediente
