from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from solicitudes_app.api.serializers import RolSolicitudSerializer, TipoSolicitudSerializer, SolicitudSerializer
from solicitudes_app.models import RolSolicitud, TipoSolicitud, Solicitud

class ListarRolesSolicitudAV(APIView):
    def get(self, request):
        roles = RolSolicitud.objects.all()
        serializer = RolSolicitudSerializer(roles, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        try:
            serializer = RolSolicitudSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)
        
class DetalleRolesSolicitudAV(APIView):
    def get(self, request, pk):
        try:
            rol = RolSolicitud.objects.get(pk=pk)
        except RolSolicitud.DoesNotExist:
            return Response({'error':'Rol no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = RolSolicitudSerializer(rol)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            rol = RolSolicitud.objects.get(pk=pk)
            rol.delete()
            return Response({"mensaje": "Rol eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except RolSolicitud.DoesNotExist:
            return Response({"error": "El Rol no existe."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            rol = RolSolicitud.objects.get(pk=pk)
            serializer = RolSolicitudSerializer(rol, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except RolSolicitud.DoesNotExist:
            return Response({"error": "El Rol no existe."}, status=status.HTTP_404_NOT_FOUND)

    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
class ListarTipoSolicitudAV(APIView):
    def get(self, request):
        tipo_solicitudes = TipoSolicitud.objects.all()
        serializer = TipoSolicitudSerializer(tipo_solicitudes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        try:
            serializer = TipoSolicitudSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)
        
class DetalleTipoSolicitudAV(APIView):
    def get(self, request, pk):
        try:
            tipo_solicitud = TipoSolicitud.objects.get(pk=pk)
        except TipoSolicitud.DoesNotExist:
            return Response({'error':'Tipo de solicitud no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TipoSolicitudSerializer(tipo_solicitud)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            tipo_solicitud = TipoSolicitud.objects.get(pk=pk)
            tipo_solicitud.delete()
            return Response({"mensaje": "Tipo solicitud eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except TipoSolicitud.DoesNotExist:
            return Response({"error": "El tipo de solicitud no existe."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            tipo_solicitud = TipoSolicitud.objects.get(pk=pk)
            serializer = TipoSolicitudSerializer(tipo_solicitud, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except TipoSolicitud.DoesNotExist:
            return Response({"error": "El tipo de solicitud no existe."}, status=status.HTTP_404_NOT_FOUND)

    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
class ListarSolicitudAV(APIView):
    def get(self, request):
        solicitudes = Solicitud.objects.all()
        serializer = SolicitudSerializer(solicitudes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        try:
            serializer = SolicitudSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)
        
class DetalleSolicitudAV(APIView):
    def get(self, request, pk):
        try:
            solicitud = Solicitud.objects.get(pk=pk)
        except Solicitud.DoesNotExist:
            return Response({'error':'Tipo de solicitud no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = SolicitudSerializer(solicitud)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            solicitud = Solicitud.objects.get(pk=pk)
            solicitud.delete()
            return Response({"mensaje": "Tipo solicitud eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except Solicitud.DoesNotExist:
            return Response({"error": "El tipo de solicitud no existe."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            solicitud = Solicitud.objects.get(pk=pk)
            serializer = SolicitudSerializer(solicitud, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Solicitud.DoesNotExist:
            return Response({"error": "El tipo de solicitud no existe."}, status=status.HTTP_404_NOT_FOUND)

    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
