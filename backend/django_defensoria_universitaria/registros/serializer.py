from rest_framework import serializers
from .models import Registro

class  RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model=Registro
        #fields=('id','ROLES_CHOICES','IPO_SOLICITUD_CHOICES','rol','otro_rol','nombre','apellido','dni','cui','area_sede','numero_telefonico','correo_electronico','tipo_solicitud','sustentacion_solicitud','autoriza_notificacion','archivos_adjuntos')
        fields='__all__'