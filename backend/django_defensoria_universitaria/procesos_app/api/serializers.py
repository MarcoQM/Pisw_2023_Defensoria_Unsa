from rest_framework import serializers
from procesos_app.models import Proceso

class ProcesoSerializer(serializers.ModelSerializer):
    #estado = serializers.CharField(source='estado.nombre')  # Incluye el nombre del estado en lugar del ID
    estado_solicitud_descripcion = serializers.CharField(source='estado_solicitud.nombre', read_only=True)  
    nombre_usuario = serializers.CharField(source='user.username', read_only=True)  
    class Meta: 
        model = Proceso
        #fields = '__all__' 
        fields = ('id', 'observaciones', 'estado_proceso', 
                  'fecha_creacion', 'solicitud',
                  'organo_universitario_encargado', 'estado_situacional',
                  'remitido', 'recomendacion',  'estado_solicitud', 
                  'estado_solicitud_descripcion', 'user', 'nombre_usuario')