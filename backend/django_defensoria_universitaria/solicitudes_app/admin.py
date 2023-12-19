from django.contrib import admin
from solicitudes_app.models import TipoSolicitud, Solicitud, Archivo

# Register your models here.
admin.site.register(TipoSolicitud)
admin.site.register(Solicitud)
admin.site.register(Archivo)