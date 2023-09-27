from django.contrib import admin
from expediente.models import Expediente,EstadoExpediente,ProcesoExpediente
# Register your models here.
admin.site.register(Expediente)
admin.site.register(EstadoExpediente)
admin.site.register(ProcesoExpediente)
