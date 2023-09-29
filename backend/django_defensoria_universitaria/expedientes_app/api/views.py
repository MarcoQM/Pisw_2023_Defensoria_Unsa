from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from expedientes_app.api.serializers import ExpedienteSerializer,EstadoExpedienteSerializer,ProcesoExpedienteSerializer
from expedientes_app.models import Expediente,EstadoExpediente,ProcesoExpediente

#============================================================================
#===============================Expediente===================================
#============================================================================

class ListarExpedientesAV(APIView):
    def get(self, request):
        expedientes = Expediente.objects.all()
        serializer = ExpedienteSerializer(expedientes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        try:
            serializer = ExpedienteSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)
        
class DetalleExpedienteAV(APIView):
    def get(self, request, pk):
        try:
            expdiente = Expediente.objects.get(pk=pk)
        except Expediente.DoesNotExist:
            return Response({'error':'Expediente no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ExpedienteSerializer(expdiente)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            expediente = Expediente.objects.get(pk=pk)
            expediente.delete()
            return Response({"mensaje": "Expediente eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except Expediente.DoesNotExist:
            return Response({"error": "El expediente no existe."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            expediente = Expediente.objects.get(pk=pk)
            serializer = ExpedienteSerializer(expediente, data=request.data)
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
        estado_expediente = EstadoExpediente.objects.all()
        serializer = EstadoExpedienteSerializer(estado_expediente, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        try:
            serializer = EstadoExpedienteSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)
     
class DetalleEstadoExpedienteAV(APIView):
    def get(self, request, pk):
        try:
            estado_expediente = EstadoExpediente.objects.get(pk=pk)
        except EstadoExpediente.DoesNotExist:
            return Response({'error':'Estado de expediente no encontrada.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = EstadoExpedienteSerializer(estado_expediente)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            estado = EstadoExpediente.objects.get(pk=pk)
            estado.delete()
            return Response({"mensaje": "Estado eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except EstadoExpediente.DoesNotExist:
            return Response({"error": "El estado no existe."}, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, pk):
        try:
            estado = EstadoExpediente.objects.get(pk=pk)
            serializer = EstadoExpedienteSerializer(estado, data=request.data)
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
        proceso_expedientes = ProcesoExpediente.objects.all()
        serializer = ProcesoExpedienteSerializer(proceso_expedientes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        try:
            serializer = ProcesoExpedienteSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)
    
class DetalleProcesoExpedienteAV(APIView):
    def get(self, request, pk):
        try:
            proceso_expediente = ProcesoExpediente.objects.get(pk=pk)
        except ProcesoExpediente.DoesNotExist:
            return Response({'error':'Sede no encontrada.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProcesoExpedienteSerializer(proceso_expediente)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            proceso_expediente = ProcesoExpediente.objects.get(pk=pk)
            proceso_expediente.delete()
            return Response({"mensaje": "Proceso expediente eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except ProcesoExpediente.DoesNotExist:
            return Response({"error": "El Proceso expediente no existe."}, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, pk):
        try:
            proceso_expediente = ProcesoExpediente.objects.get(pk=pk)
            serializer = ProcesoExpedienteSerializer(proceso_expediente, data=request.data)
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