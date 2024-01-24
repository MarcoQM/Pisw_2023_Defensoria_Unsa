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
    estado_solicitud_nombre = serializers.CharField(source='estado_solicitud.nombre', read_only=True)  
    encargado_nombre = serializers.CharField(source='encargado.username', read_only=True)  

    class Meta: 
        model = Solicitud
        # fields = '__all__' 
        fields = ('id', 'codigo_expediente', 'rol', 'nombre', 'apellido', 'dni', 'cui', 'direccion',
                  'telefono', 'correo', 'solicita', 'expone', 'tipo_solicitud', 'descripcion', 'organo_universitario', 'encargado', 'encargado_nombre',
                  'estado_solicitud', 'estado_solicitud_nombre', 'fecha_creacion', 'fecha_modificacion', 
                  'sede', 'sede_nombre', 'archivos')