from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from usuarios_app.api.serializers import UserSerializer
from django.middleware import csrf
from django.http import JsonResponse
from django.core.mail import send_mail
from django_defensoria_universitaria.settings import EMAIL_HOST_USER
import json
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.template.loader import render_to_string

def enviar_email(email, reset_url):
    subject = 'Defensoría Universitaria - Restablecer Contraseña'
    template = 'reset_password_email.html'
    context = {'reset_url': reset_url}
    html_message = render_to_string(template, context)
    #message = f'Haga clic en el siguiente enlace para restablecer su contraseña: {reset_url}'
    send_mail(
        subject,
        '',#message,
        EMAIL_HOST_USER,  # Cambia esto al remitente que desees
        [email],
        fail_silently=False,
        html_message = html_message
    )
@csrf_exempt
def restablecer(request,uid,token):
    if request.method == 'POST':
        data = json.loads(request.body)
        nueva_contrasenia = data.get('contrasenia')
        v_nueva_contrasenia = data.get('v_contrasenia')
        if(nueva_contrasenia == v_nueva_contrasenia):
            try:
                user_id = User.objects.get(pk=uid).pk
            except (TypeError, ValueError, OverflowError, User.DoesNotExist):
                user_id = None
            
            if user_id is not None and default_token_generator.check_token(User.objects.get(pk=user_id), token):
                # Restablecer la contraseña para el usuario
                user = User.objects.get(pk=user_id)
                user.set_password(nueva_contrasenia)
                user.save()
                return JsonResponse({'message': 'Contraseña restablecida con éxito.'})
            else:
                return JsonResponse({'error': 'Token inválido.'}, status=400)
        else:
            return JsonResponse({'error': 'Contraseñas distintas'}, status=405)
        
    else:
        return JsonResponse({'error': 'Se requiere un método POST.'}, status=405)
@csrf_exempt
def generar_token_uid(request,protocolo,dominio,puerto):
    
    if request.method == 'POST':
       
        data = json.loads(request.body)
        
        email = data.get('email')
        
        #user = User.objects.get(email=email)
        try:
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            return JsonResponse({"Error": "Correo Electrónico no Válido."})
        uid=user.pk
        token = default_token_generator.make_token(user)
        current_site = get_current_site(request)
        #domain = current_site.domain
        #site_name = current_site.name
      
        
        #reset_url = 'http://' + site_name + "/api/restablecer/" + str(uid) + "/" + token +"/"
        #http://localhost:5173/restablecer/4/45asdf
        #reset_url = 'http://' + 'localhost:5173' + "/restablecer/" + str(uid) + "/" + token
        puertovalido=''
        if puerto is not None:
            puertovalido = ':'+str(puerto)
        
        reset_url = protocolo + '//' + dominio + puertovalido +'/restablecer/' + str(uid) + "/" + token
        print(reset_url)
        enviar_email(email,reset_url)
        return JsonResponse({"Mensaje":"Confirmación enviada - Sigue las instrucciones del correo para cambiar tu contraseña."})
    else:
        return JsonResponse()
def obtener_csrf_token(request):
    # Obtener el token CSRF
    csrf_token = csrf.get_token(request)
    # Devolver el token CSRF en un JSON
    response_data = {'csrf_token': csrf_token}
    return JsonResponse(response_data)

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