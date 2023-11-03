from rest_framework import serializers
from solicitudes_app.models import Solicitud, Archivo

class ArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivo
        fields = '__all__' 
        # fields = ('id', 'nombre', 'archivo')

class SolicitudSerializer(serializers.ModelSerializer):
    
    archivos = ArchivoSerializer(many=True, read_only=True)  # Relaciona el modelo ArchivoSolicitud
    sede_nombre = serializers.CharField(source='sede.nombre', read_only=True)  # Incluye el nombre de la sede en lugar del ID

    class Meta: 
        model = Solicitud
        # fields = '__all__' 
        fields = ('id', 'codigo_expediente', 'rol', 'nombre', 'apellido', 'dni', 'cui', 'direccion',
                  'telefono', 'correo', 'tipo_solicitud', 'descripcion', 'organo_universitario',
                  'fecha_creacion', 'fecha_modificacion', 'sede', 'sede_nombre', 'archivos')