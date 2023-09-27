from django.contrib import admin
from django.urls import path,include
#EXPEDIENTE
from expediente.api.views import ListarExpedientesAV,IngresarExpedienteAV,EliminarExpedienteAV,ModificarExpedienteAV
#EstadoExpediente
from expediente.api.views import ListarEstadosExpedienteAV,IngresarEstadoExpedienteAV,EliminarEstadoExpedienteAV,ModificarEstadoExpedienteAV
#ProcesoExpediente
from expediente.api.views import ListarProcesosExpedienteAV,IngresarProcesoExpedienteAV,EliminarProcesoExpedienteAV,ModificarProcesoExpedienteAV

urlpatterns = [
    #Expediente
    path('listarExpedientes/', ListarExpedientesAV.as_view(), name='listarExpedientes'),
    path('ingresarExpediente/', IngresarExpedienteAV.as_view(), name='ingresarExpedientes'),
    path('eliminarExpediente/', EliminarExpedienteAV.as_view(), name='eliminarExpedientes'),
    path('modificarExpediente/', ModificarExpedienteAV.as_view(), name='modificarExpediente'),


    #EstadoExpediente
    path('listarEstadosExpediente/', ListarEstadosExpedienteAV.as_view(), name='listarExpedientes'),
    path('ingresarEstadoExpediente/', IngresarEstadoExpedienteAV.as_view(), name='ingresarExpedientes'),
    path('eliminarEstadoExpediente/', EliminarEstadoExpedienteAV.as_view(), name='eliminarExpedientes'),
    path('modificarEstadoExpediente/', ModificarEstadoExpedienteAV.as_view(), name='modificarExpediente'),

    #ProcesoExpediente
    path('listarProcesosExpediente/', ListarProcesosExpedienteAV.as_view(), name='listarProcesosExpediente'),
    path('ingresarProcesoExpediente/', IngresarProcesoExpedienteAV.as_view(), name='ingresarProcesoExpediente'),
    path('eliminarProcesoExpediente/', EliminarProcesoExpedienteAV.as_view(), name='eliminarProcesoExpediente'),
    path('modificarProcesoExpediente/', ModificarProcesoExpedienteAV.as_view(), name='modificarProcesoExpediente'),
]
