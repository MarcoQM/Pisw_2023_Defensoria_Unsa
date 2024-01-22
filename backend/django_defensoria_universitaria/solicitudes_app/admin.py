from django.contrib import admin
from solicitudes_app.models import Solicitud, Archivo, TipoSolicitud, EstadoSolicitud

# Register your models here.
admin.site.register(Solicitud)
admin.site.register(Archivo)
admin.site.register(TipoSolicitud)
admin.site.register(EstadoSolicitud)