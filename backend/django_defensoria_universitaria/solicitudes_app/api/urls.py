from django.contrib import admin
from django.urls import path,include

from solicitudes_app.api.views import ListarRolesSolicitudAV, DetalleRolesSolicitudAV
from solicitudes_app.api.views import ListarTipoSolicitudAV, DetalleTipoSolicitudAV
from solicitudes_app.api.views import ListarSolicitudAV, DetalleSolicitudAV

urlpatterns = [
    #Roles solicitud
    path('', ListarSolicitudAV.as_view(), name='listar-solicitudes'),
    path('<int:pk>', DetalleSolicitudAV.as_view(), name='detalle-solicitud'),

    #Tipo de solicitud
    path('tipo/', ListarTipoSolicitudAV.as_view(), name='listar-tipo-solicitudes'),
    path('tipo/<int:pk>', DetalleTipoSolicitudAV.as_view(), name='detalle-tipo-solicitud'),

    #Solicitud
    path('rol/', ListarRolesSolicitudAV.as_view(), name='listar-roles-solicitudes'),
    path('rol/<int:pk>', DetalleRolesSolicitudAV.as_view(), name='detalle-rol-solicitud'),
]