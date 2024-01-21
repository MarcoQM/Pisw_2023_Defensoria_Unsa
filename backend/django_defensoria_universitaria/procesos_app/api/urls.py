from django.urls import path
from procesos_app.api.views import ListarProcesoAV, DetalleProcesoAV

urlpatterns = [    
    #Proceso
    path('', ListarProcesoAV.as_view(), name='listar-procesos'),
    path('<int:pk>', DetalleProcesoAV.as_view(), name='detalle-proceso'),
]