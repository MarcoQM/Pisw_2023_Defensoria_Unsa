from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from procesos_app.api.serializers import ProcesoSerializer
from solicitudes_app.api.serializers import SolicitudSerializer
from procesos_app.models import Proceso
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from solicitudes_app.models import Solicitud


class ListarProcesoAV(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        is_superuser = request.user.is_superuser
        
        if is_superuser:
            proceso = Proceso.objects.all()
        else:
            user_id = request.user.id
            proceso = Proceso.objects.filter(user_id=user_id)
            
        serializer = ProcesoSerializer(proceso, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        try:
            serializer = ProcesoSerializer(data=request.data)
            if serializer.is_valid():
                # actualizo la solicitud 
                codigo_solicitud = request.data.get('solicitud')
                estado_solicitud = request.data.get('estado_solicitud')
                encargado_solicitud = request.data.get('user')
                
                # Busco el proceso para desactivarlo
                proceso_anterior = Proceso.objects.get(solicitud_id=codigo_solicitud, estado_proceso=True)
                proceso_anterior.estado_proceso = False
                proceso_anterior.save()
                
                # Guardo el proceso
                serializer.save()
                
                solicitud = Solicitud.objects.get(pk=codigo_solicitud)
                solicitud.estado_solicitud_id = estado_solicitud
                solicitud.encargado_id = encargado_solicitud
                solicitud.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)
        
class DetalleProcesoAV(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        try:
            proceso = Proceso.objects.get(pk=pk)
        except Proceso.DoesNotExist:
            return Response({'error':'Proceso no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProcesoSerializer(proceso)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            proceso = Proceso.objects.get(pk=pk)
            proceso.delete()
            return Response({"mensaje": "Proceso eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except Proceso.DoesNotExist:
            return Response({"error": "El proceso no existe."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            proceso = Proceso.objects.get(pk=pk)
            serializer = ProcesoSerializer(proceso, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Proceso.DoesNotExist:
            return Response({"error": "El proceso no existe."}, status=status.HTTP_404_NOT_FOUND)

    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
class ListarSolicitudProcesoAV(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        procesos = Proceso.objects.filter(solicitud=pk)
        serializer = ProcesoSerializer(procesos, many=True)
        return Response(serializer.data)