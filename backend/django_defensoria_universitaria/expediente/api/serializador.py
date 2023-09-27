from rest_framework import serializers
from expediente.models import Expediente, EstadoExpediente, ProcesoExpediente
class ExpedienteSerializador(serializers.ModelSerializer):
    class Meta:
        model = Expediente
        fields = '__all__'
    
#    def validate(self, obj):
#        if obj['id'] is not None:
#            raise serializers.ValidationError("Error al ingresar el expediente")
#        return obj

class EstadoExpedienteSerializador(serializers.ModelSerializer):
    class Meta:
        model = EstadoExpediente
        fields = '__all__'

class ProcesoExpedienteSerializador(serializers.ModelSerializer):
    class Meta:
        model = ProcesoExpediente
        fields = '__all__'
    
    def validate(self, data):
        errors = {}

        for field in self.fields.keys():
            if field == 'id':
                pass
            else:
                if data.get(field) is None:
                    errors[field] = "Este campo es requerido."
        if errors:
            raise serializers.ValidationError(errors)
        return data