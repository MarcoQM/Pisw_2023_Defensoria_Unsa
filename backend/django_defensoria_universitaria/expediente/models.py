from django.db import models

class Expediente(models.Model):
    id                  = models.AutoField(primary_key=True)
    idSolicitud         = models.IntegerField()
    codigo              = models.CharField(max_length=10)
    idEstadoExpediente  = models.IntegerField()
    fechaSolicitado     = models.DateTimeField()
    fechaRecibido       = models.DateTimeField()
    fechaProceso        = models.DateTimeField()
    fechaTerminado      = models.DateTimeField()
    
    
class EstadoExpediente(models.Model):
    id                  = models.AutoField(primary_key=True)
    nombre              = models.CharField(max_length=10)
    estado              = models.BooleanField(default=True)
    fechaCreacion       = models.DateTimeField()
    fechaModificacion   = models.DateTimeField()

class ProcesoExpediente(models.Model):
    id                  = models.AutoField(primary_key=True)
    idExpediente        = models.IntegerField()
    encargado           = models.TextField()
    organoUniversitario = models.TextField()
    titulo              = models.TextField()
    descripcion         = models.TextField()
    idEstadoExpediente  = models.IntegerField()
    idUsuario           = models.IntegerField()
    fechaCreacion       = models.DateTimeField()
    fechaModificacion   = models.DateTimeField()