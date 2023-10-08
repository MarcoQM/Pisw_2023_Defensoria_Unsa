from django.contrib import admin
from django.urls import path,include
#EXPEDIENTE
from expedientes_app.api.views import ListarExpedientesAV, DetalleExpedienteAV
#EstadoExpediente
from expedientes_app.api.views import ListarEstadosExpedienteAV, DetalleEstadoExpedienteAV
#ProcesoExpediente
from expedientes_app.api.views import ListarProcesosExpedienteAV, DetalleProcesoExpedienteAV

urlpatterns = [
    #Expediente
    path('', ListarExpedientesAV.as_view(), name='listar-expedientes'),
    path('<int:pk>', DetalleExpedienteAV.as_view(), name='detalle-expediente'),

    #EstadoExpediente
    path('estados/', ListarEstadosExpedienteAV.as_view(), name='listar-estado-expedientes'),
    path('estado/<int:pk>', DetalleEstadoExpedienteAV.as_view(), name='detalle-estado-expediente'),

    #ProcesoExpediente
    path('procesos/', ListarProcesosExpedienteAV.as_view(), name='listar-proceso-expedientes'),
    path('proceso/<int:pk>', DetalleProcesoExpedienteAV.as_view(), name='detalle-rpoceso-expediente'),
    
]
