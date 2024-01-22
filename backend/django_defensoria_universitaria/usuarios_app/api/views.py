from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from usuarios_app.api.serializers import UserSerializer

class ListarUsuariosAV(APIView):
    def get(self, request):
        sedes = User.objects.all()
        serializer = UserSerializer(sedes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                user.set_password(serializer.validated_data['password'])
                user.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)
        
class DetalleUsuarioAV(APIView):
    #authentication_classes = [SessionAuthentication, TokenAuthentication]
    #permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        try:
            sede = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'error':'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(sede)
        return Response(serializer.data)
        
    def delete(self, request, pk):
        try:
            sede = User.objects.get(pk=pk)
            sede.delete()
            return Response({"mensaje": "Usuario eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({"error": "El usuario no existe."}, status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request, pk):
        try:
            sede = User.objects.get(pk=pk)
            serializer = UserSerializer(sede, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "La sede no existe."}, status=status.HTTP_404_NOT_FOUND)
        
    def http_method_not_allowed(self, request, *args, **kwargs):
        # Manejo personalizado de solicitudes HTTP no permitidas
        mensaje = "Método no permitido para esta vista."
        return Response({"error": mensaje}, status=status.HTTP_405_METHOD_NOT_ALLOWED)       