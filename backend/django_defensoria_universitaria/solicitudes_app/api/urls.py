from django.urls import path
from solicitudes_app.api.views import ListarSolicitudAV, DetalleSolicitudAV, ListarArchivoAV, DetalleArchivoAV, ListarTipoSolicitudAV, DetalleTipoSolicitudAV

urlpatterns = [
    #Solicitud
    path('', ListarSolicitudAV.as_view(), name='listar-solicitudes'),
    path('<str:pk>', DetalleSolicitudAV.as_view(), name='detalle-solicitud'),
    
    #Archivo
    path('archivos/', ListarArchivoAV.as_view(), name='listar-archivos'),
    path('archivos/<int:pk>', DetalleArchivoAV.as_view(), name='detalle-archivo'),
    
    #Tipo Solicitud
    path('tipo/', ListarTipoSolicitudAV.as_view(), name='listar-tipo-solicitud'),
    path('tipo/<int:pk>', DetalleTipoSolicitudAV.as_view(), name='detalle-solicitud'),
]
