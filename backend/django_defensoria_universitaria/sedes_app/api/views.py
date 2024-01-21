from rest_framework.response import Response
from sedes_app.models import Sede
from sedes_app.api.serializers import SedeSerializer
#from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView

from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

class ListarSedesAV(APIView):
    
    #authentication_classes = [SessionAuthentication, TokenAuthentication]
    #permission_classes = [IsAuthenticatedOrReadOnly]
    #permission_classes = [IsAuthenticated]
    
    
    def get(self, request):
        sedes = Sede.objects.all()
        serializer = SedeSerializer(sedes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        try:
            serializer = SedeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)
        

class DetalleSedeAV(APIView):
    #authentication_classes = [SessionAuthentication, TokenAuthentication]
    #permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        try:
            sede = Sede.objects.get(pk=pk)
        except Sede.DoesNotExist:
            return Response({'error':'Sede no encontrada.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = SedeSerializer(sede)
        return Response(serializer.data)
        
    def delete(self, request, pk):
        try:
            sede = Sede.objects.get(pk=pk)
            sede.delete()
            return Response({"mensaje": "Sede eliminada correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except Sede.DoesNotExist:
            return Response({"error": "La sede no existe."}, status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request, pk):
        try:
            sede = Sede.objects.get(pk=pk)
            serializer = SedeSerializer(sede, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Sede.DoesNotExist:
            return Response({"error": "La sede no existe."}, status=status.HTTP_404_NOT_FOUND)
        
    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)         