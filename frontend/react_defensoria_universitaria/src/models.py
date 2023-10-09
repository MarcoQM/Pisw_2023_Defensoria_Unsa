from django.db import models

# Definición del modelo para el formulario de Registro de Incidencias
class Registro(models.Model):
    ROLES_CHOICES = (
        ('estudiante', 'Estudiante'),
        ('docente', 'Docente'),
        ('administrativo', 'Administrativo'),
        ('otro', 'Otro'),
    )
    
    TIPO_SOLICITUD_CHOICES = (
        ('queja', 'Queja'),
        ('reclamo', 'Reclamo'),
        ('sugerencia', 'Sugerencia'),
        ('consulta', 'Consulta'),
    )
    
    rol = models.CharField(max_length=20, choices=ROLES_CHOICES)
    otro_rol = models.CharField(max_length=100, blank=True, null=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    dni = models.CharField(max_length=10)
    cui = models.CharField(max_length=10)
    area_sede = models.CharField(max_length=100, blank=True, null=True)
    direccion = models.CharField(max_length=200)
    numero_telefonico = models.CharField(max_length=20)
    correo_electronico = models.EmailField()
    tipo_solicitud = models.CharField(max_length=20, choices=TIPO_SOLICITUD_CHOICES)
    sustentacion_solicitud = models.TextField()
    autoriza_notificacion = models.BooleanField(default=False)
    archivos_adjuntos = models.FileField(upload_to='adjuntos/', blank=True, null=True)

    def __str__(self):
        return f'{self.nombre} {self.apellido} ({self.rol})'

