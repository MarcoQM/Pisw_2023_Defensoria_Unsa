from rest_framework import serializers
from solicitudes_app.models import Solicitud, Archivo, TipoSolicitud, EstadoSolicitud

class ArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivo
        fields = '__all__' 
        # fields = ('id', 'nombre', 'archivo')
        
class TipoSolicitudSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoSolicitud
        fields = '__all__' 
        # fields = ('id', 'nombre', 'archivo')

class EstadoSolicitudSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoSolicitud
        fields = '__all__' 

class SolicitudSerializer(serializers.ModelSerializer):
    
    archivos = ArchivoSerializer(many=True, read_only=True)  # Relaciona el modelo ArchivoSolicitud
    sede_nombre = serializers.CharField(source='sede.nombre', read_only=True)  # Incluye el nombre de la sede en lugar del ID

    class Meta: 
        model = Solicitud
        # fields = '__all__' 
        fields = ('id', 'codigo_expediente', 'rol', 'nombre', 'apellido', 'dni', 'cui', 'direccion',
                  'telefono', 'correo', 'tipo_solicitud', 'descripcion', 'organo_universitario', 'encargado',
                  'estado_solicitud', 'fecha_creacion', 'fecha_modificacion', 'sede', 'sede_nombre', 'archivos')