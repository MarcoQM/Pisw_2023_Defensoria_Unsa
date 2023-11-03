from django.urls import path
from procesos_app.api.views import ListarProcesoAV, ListarEstadoAV, DetalleEstadoAV, DetalleProcesoAV

urlpatterns = [
    #Estado
    path('estados/', ListarEstadoAV.as_view(), name='listar-estado-proceso'),
    path('estados/<int:pk>', DetalleEstadoAV.as_view(), name='detalle-estado-proceso'),
    
    #Proceso
    path('', ListarProcesoAV.as_view(), name='listar-procesos'),
    path('<int:pk>', DetalleProcesoAV.as_view(), name='detalle-proceso'),
]