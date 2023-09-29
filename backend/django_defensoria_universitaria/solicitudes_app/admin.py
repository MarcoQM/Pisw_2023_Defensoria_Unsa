from django.contrib import admin
from solicitudes_app.models import Solicitud, TipoSolicitud, RolSolicitud

# Register your models here.
admin.site.register(Solicitud)
admin.site.register(TipoSolicitud)
admin.site.register(RolSolicitud)