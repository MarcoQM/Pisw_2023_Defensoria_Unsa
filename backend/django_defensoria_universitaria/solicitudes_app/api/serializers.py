from rest_framework import serializers
from solicitudes_app.models import Solicitud, RolSolicitud, TipoSolicitud

class SolicitudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solicitud
        fields = '__all__' 
        
class RolSolicitudSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolSolicitud
        fields = '__all__'
    
class TipoSolicitudSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoSolicitud
        fields = '__all__' 