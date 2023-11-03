from django.contrib import admin
from procesos_app.models import Proceso, Estado

# Register your models here.
admin.site.register(Proceso)
admin.site.register(Estado)