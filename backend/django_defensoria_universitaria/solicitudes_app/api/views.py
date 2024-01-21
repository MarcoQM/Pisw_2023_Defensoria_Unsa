from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from solicitudes_app.api.serializers import SolicitudSerializer, ArchivoSerializer, TipoSolicitudSerializer
from solicitudes_app.models import Solicitud, Archivo, TipoSolicitud

from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny 


class ListarSolicitudAV(APIView):
    #permission_classes = [IsAuthenticatedOrReadOnly]
    permission_classes = [AllowAny]
    
    def get(self, request):
        solicitudes = Solicitud.objects.all()
        serializer = SolicitudSerializer(solicitudes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        try:
            serializer = SolicitudSerializer(data=request.data)
            if serializer.is_valid():
                solicitud_save = serializer.save()
                # Luego de guardar la solicitud, guardo las imagenes
                archivos = request.data.getlist('archivos')  # 'archivos' debe coincidir con el nombre del campo en tu solicitud POST
                solicitud_id = solicitud_save.id
                for archivo in archivos:
                    archivo_serializer = ArchivoSerializer(data={'solicitud': solicitud_id, 'archivo': archivo})
                    if archivo_serializer.is_valid():
                        archivo_serializer.save()
                    else:
                        return Response(archivo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)
        
class DetalleSolicitudAV(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    
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
            return Response('Actualizado', status=status.HTTP_201_CREATED)
            # solicitud = Solicitud.objects.get(pk=pk)
            # serializer = SolicitudSerializer(solicitud, data=request.data)
            # if serializer.is_valid():
            #     solicitud_save = serializer.save()
            #     # Luego de guardar la solicitud, guardo las imagenes
            #     archivos = request.data.getlist('archivos')  # 'archivos' debe coincidir con el nombre del campo en tu solicitud POST
            #     solicitud_id = solicitud_save.id
            #     for archivo in archivos:
            #         archivo_serializer = ArchivoSerializer(data={'solicitud': solicitud_id, 'archivo': archivo})
            #         if archivo_serializer.is_valid():
            #             archivo_serializer.save()
            #         else:
            #             return Response(archivo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            #     return Response(serializer.data, status=status.HTTP_201_CREATED)
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Solicitud.DoesNotExist:
            return Response({"error": "El tipo de solicitud no existe."}, status=status.HTTP_404_NOT_FOUND) 

    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
class ListarArchivoAV(APIView):
    #permission_classes = [IsAuthenticated]
    
    def get(self, request):
        archivos = Archivo.objects.all()
        serializer = ArchivoSerializer(archivos, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        try:
            archivos = request.data.getlist('archivo')  # 'archivos' debe coincidir con el nombre del campo en tu solicitud POST
            solicitud_id = request.data.get('solicitud')
            for archivo in archivos:
                serializer = ArchivoSerializer(data={'solicitud': solicitud_id, 'archivo': archivo})
                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response("Archivos guardados con éxito.", status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    # def post(self, request):
    #     try:
    #         serializer = ArchivoSerializer(data=request.data)
            
    #         print(request.data)
    #         if serializer.is_valid():
    #             serializer.save()
    #             return Response(serializer.data, status=status.HTTP_201_CREATED)
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #     except Exception as e:
    #         return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)
        
class DetalleArchivoAV(APIView):
    def get(self, request, pk):
        try:
            archivo = Archivo.objects.get(pk=pk)
        except Archivo.DoesNotExist:
            return Response({'error':'Archivo no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = SolicitudSerializer(archivo)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            archivo = Archivo.objects.get(pk=pk)
            archivo.delete()
            return Response({"mensaje": "Archivo eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except Archivo.DoesNotExist:
            return Response({"error": "El archivo no existe."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            archivo = Archivo.objects.get(pk=pk)
            serializer = ArchivoSerializer(archivo, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Solicitud.DoesNotExist:
            return Response({"error": "El archivo no existe."}, status=status.HTTP_404_NOT_FOUND)

    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
class ListarTipoSolicitudAV(APIView):
    def get(self, request):
        sedes = TipoSolicitud.objects.all()
        serializer = TipoSolicitudSerializer(sedes, many=True)
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
            sede = TipoSolicitud.objects.get(pk=pk)
        except TipoSolicitud.DoesNotExist:
            return Response({'error':'Tipo de solicitud no encontrada.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TipoSolicitudSerializer(sede)
        return Response(serializer.data)
        
    def delete(self, request, pk):
        try:
            sede = TipoSolicitud.objects.get(pk=pk)
            sede.delete()
            return Response({"mensaje": "Tipo de solicitud eliminada correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except TipoSolicitud.DoesNotExist:
            return Response({"error": "El tipo de solicitud no existe."}, status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request, pk):
        try:
            sede = TipoSolicitud.objects.get(pk=pk)
            serializer = TipoSolicitudSerializer(sede, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except TipoSolicitud.DoesNotExist:
            return Response({"error": "La sede no existe."}, status=status.HTTP_404_NOT_FOUND)
        
    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)         