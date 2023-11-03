from django.urls import path
from solicitudes_app.api.views import ListarSolicitudAV, DetalleSolicitudAV, ListarArchivoAV, DetalleArchivoAV

urlpatterns = [
    #Solicitud
    path('', ListarSolicitudAV.as_view(), name='listar-solicitudes'),
    path('<str:pk>', DetalleSolicitudAV.as_view(), name='detalle-solicitud'),
    
    #Archivo
    path('archivos/', ListarArchivoAV.as_view(), name='listar-archivos'),
    path('archivos/<int:pk>', DetalleArchivoAV.as_view(), name='detalle-archivo'),
]
