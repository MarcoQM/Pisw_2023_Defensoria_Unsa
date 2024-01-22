from django.urls import path
from usuarios_app.api.views import ListarUsuariosAV, DetalleUsuarioAV

app_name = 'usuarios_app'

urlpatterns = [
    path('', ListarUsuariosAV.as_view(), name='listar-usuarios'),
    path('<int:pk>', DetalleUsuarioAV.as_view(), name='detalle-usuario'),
]
 
 