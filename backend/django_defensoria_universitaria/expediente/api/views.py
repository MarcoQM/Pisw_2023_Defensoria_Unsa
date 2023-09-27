from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from expediente.api.serializador import ExpedienteSerializador,EstadoExpedienteSerializador,ProcesoExpedienteSerializador
from expediente.models import Expediente,EstadoExpediente,ProcesoExpediente

#============================================================================
#===============================Expediente===================================
#============================================================================

class ListarExpedientesAV(APIView):
    def get(self, request):
        expedientes = Expediente.objects.all()
        serializer = ExpedienteSerializador(expedientes, many=True)
        return Response(serializer.data)
    
class IngresarExpedienteAV(APIView):
    def post(self, request):
        try:
            serializer = ExpedienteSerializador(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)
    
    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

class EliminarExpedienteAV(APIView):
    def delete(self, request):
        datos_json = request.data
        id = datos_json.get('id')
        try:
            expediente = Expediente.objects.get(id=id)
            expediente.delete()
            return Response({"mensaje": "Expediente eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except Expediente.DoesNotExist:
            return Response({"error": "El expediente no existe."}, status=status.HTTP_404_NOT_FOUND)

    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

class ModificarExpedienteAV(APIView):
    def put(self, request):
        datos_json = request.data
        id = datos_json.get('id')
        try:
            expediente = Expediente.objects.get(id=id)
            serializer = ExpedienteSerializador(expediente, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Expediente.DoesNotExist:
            return Response({"error": "El expediente no existe."}, status=status.HTTP_404_NOT_FOUND)
    
    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        
#============================================================================
#=========================EstadoExpediente===================================
#============================================================================

class ListarEstadosExpedienteAV(APIView):
    def get(self, request):
        estados = EstadoExpediente.objects.all()
        serializer = EstadoExpedienteSerializador(estados, many=True)
        return Response(serializer.data)
    
class IngresarEstadoExpedienteAV(APIView):
    def post(self, request):
        try:
            serializer = EstadoExpedienteSerializador(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)
    
    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
class EliminarEstadoExpedienteAV(APIView):
    def delete(self, request):
        datos_json = request.data
        id = datos_json.get('id')
        try:
            estado = EstadoExpediente.objects.get(id=id)
            estado.delete()
            return Response({"mensaje": "Estado eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except EstadoExpediente.DoesNotExist:
            return Response({"error": "El estado no existe."}, status=status.HTTP_404_NOT_FOUND)
    
    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

class ModificarEstadoExpedienteAV(APIView):
    def put(self, request):
        datos_json = request.data
        id = datos_json.get('id')
        try:
            estado = EstadoExpediente.objects.get(id=id)
            serializer = EstadoExpedienteSerializador(estado, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except EstadoExpediente.DoesNotExist:
            return Response({"error": "El expediente no existe."}, status=status.HTTP_404_NOT_FOUND)
    
    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

#============================================================================
#=========================ProcesoExpediente==================================
#============================================================================
class ListarProcesosExpedienteAV(APIView):
    def get(self, request):
        procesos = ProcesoExpediente.objects.all()
        serializer = ProcesoExpedienteSerializador(procesos, many=True)
        return Response(serializer.data)
    
class IngresarProcesoExpedienteAV(APIView):
    def post(self, request):
        if not request.data:
            return Response({"mensaje": "La solicitud no contiene datos."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            serializer = ProcesoExpedienteSerializador(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)
    
    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
class EliminarProcesoExpedienteAV(APIView):
    def delete(self, request):
        datos_json = request.data
        id = datos_json.get('id')
        try:
            proceso = ProcesoExpediente.objects.get(id=id)
            proceso.delete()
            return Response({"mensaje": "proceso eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except ProcesoExpediente.DoesNotExist:
            return Response({"error": "El proceso no existe."}, status=status.HTTP_404_NOT_FOUND)
    
    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

class ModificarProcesoExpedienteAV(APIView):
    def put(self, request):
        datos_json = request.data
        id = datos_json.get('id')
        try:
            proceso = ProcesoExpediente.objects.get(id=id)
            serializer = ProcesoExpedienteSerializador(proceso, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ProcesoExpediente.DoesNotExist:
            return Response({"error": "El proceso no existe."}, status=status.HTTP_404_NOT_FOUND)
    
    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)