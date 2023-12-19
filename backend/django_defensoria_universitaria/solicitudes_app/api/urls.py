from django.urls import path
from solicitudes_app.api.views import ListarSolicitudAV, DetalleSolicitudAV, ListarArchivoAV, DetalleArchivoAV, DetalleSolicitudExpedienteAV, ListarTipoSolicitudAV, DetalleTipoSolicitudAV

urlpatterns = [
    #Solicitud
    path('', ListarSolicitudAV.as_view(), name='listar-solicitudes'),
    path('<str:pk>', DetalleSolicitudAV.as_view(), name='detalle-solicitud'),
    
    #Archivo
    path('archivos/', ListarArchivoAV.as_view(), name='listar-archivos'),
    path('archivos/<int:pk>', DetalleArchivoAV.as_view(), name='detalle-archivo'),
    
    #Tipo solicitud
    path('tipos/', ListarTipoSolicitudAV.as_view(), name='listar-tipo-solicitud'),
    path('tipos/<int:pk>', DetalleTipoSolicitudAV.as_view(), name='detalle-tipo-solicitud'),
    
    #Solicitud por numero de expediente
    path('expediente/', DetalleSolicitudExpedienteAV.as_view(), name='listar-solicitudes-numero-expediente'),
]
