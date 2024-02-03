from django.urls import path
from procesos_app.api.views import ListarProcesoAV, DetalleProcesoAV, ListarSolicitudProcesoAV

urlpatterns = [    
    #Proceso
    path('', ListarProcesoAV.as_view(), name='listar-procesos'),
    path('<int:pk>', DetalleProcesoAV.as_view(), name='detalle-proceso'),
    path('solicitud/<str:pk>', ListarSolicitudProcesoAV.as_view(), name='solicitud-procesos'),
]