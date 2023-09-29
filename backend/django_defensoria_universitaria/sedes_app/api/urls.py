from django.urls import path
from sedes_app.api.views import ListarSedesAV, DetalleSedeAV

app_name = 'sedes_app'

urlpatterns = [
    path('', ListarSedesAV.as_view(), name='listar-sedes'),
    path('<int:pk>', DetalleSedeAV.as_view(), name='detalle-sede'),
]
 
 
