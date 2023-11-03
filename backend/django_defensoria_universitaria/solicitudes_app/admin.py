from django.contrib import admin
from solicitudes_app.models import Solicitud, Archivo

# Register your models here.
admin.site.register(Solicitud)
admin.site.register(Archivo)