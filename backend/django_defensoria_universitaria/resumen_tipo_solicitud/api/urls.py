from django.urls import path,include
from resumen_tipo_solicitud.api.views import resumen,grafico_barras,lista_sedes,grafico_circular,solicitudes_mes
urlpatterns = [
    #Estado
    path('resumen/', resumen, name='listar-estado-proceso'),
    path('gBarras/',grafico_barras),
    path('sedes/',lista_sedes),
    path('gCircular/',grafico_circular ),
    path('gFechas/',solicitudes_mes),
    ]