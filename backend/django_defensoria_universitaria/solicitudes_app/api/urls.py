from django.urls import path
from solicitudes_app.api.views import ListarSolicitudAV, DetalleSolicitudAV, ListarArchivoAV, DetalleArchivoAV, ListarTipoSolicitudAV, DetalleTipoSolicitudAV, ListarEstadoSolicitudAV, DetalleEstadoSolicitudAV, ListarSolicitudExpedienteAV
from rest_framework.documentation import include_docs_urls
urlpatterns = [
    #Solicitud
    path('', ListarSolicitudAV.as_view(), name='listar-solicitudes'),
    path('<str:pk>', DetalleSolicitudAV.as_view(), name='detalle-solicitud'),
    
    #Solicitud por Expediente
    path('expediente/', ListarSolicitudExpedienteAV.as_view(), name='listar-solicitud-expediente'),
    
    #Archivo
    path('archivos/', ListarArchivoAV.as_view(), name='listar-archivos'),
    path('archivos/<int:pk>', DetalleArchivoAV.as_view(), name='detalle-archivo'),
    
    #Tipo Solicitud
    path('tipo/', ListarTipoSolicitudAV.as_view(), name='listar-tipo-solicitud'),
    path('tipo/<int:pk>', DetalleTipoSolicitudAV.as_view(), name='detalle-solicitud'),
    
    #Estado
    path('estados/', ListarEstadoSolicitudAV.as_view(), name='listar-estado-solicitud'),
    path('estados/<int:pk>', DetalleEstadoSolicitudAV.as_view(), name='detalle-estado-solicitud'),
    
    path('docs/',include_docs_urls(title="solicitud api"))
]
