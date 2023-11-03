from rest_framework import serializers
from procesos_app.models import Proceso, Estado

class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = '__all__' 

class ProcesoSerializer(serializers.ModelSerializer):
    #estado = serializers.CharField(source='estado.nombre')  # Incluye el nombre del estado en lugar del ID
    estado_nombre = serializers.CharField(source='estado.nombre', read_only=True)  # Incluye el nombre del estado en lugar del ID

    class Meta: 
        model = Proceso
        fields = '__all__' 