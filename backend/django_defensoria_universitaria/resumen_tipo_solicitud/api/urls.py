from django.urls import path,include
from resumen_tipo_solicitud.api.views import ResumenReporteAV, ResumenTarjetasAV, GraficoBarrasAV, GraficoLineasAV, GraficoCircularAV
urlpatterns = [
    #Estado
    path('resumen/', ResumenTarjetasAV.as_view(), name='resumen-tarjetas'),
    path('gBarras/', GraficoBarrasAV.as_view(), name='grafico-barras'),
    #path('sedes/',lista_sedes),
    path('gCircular/',GraficoCircularAV.as_view(), name='grafico-circular'),
    path('gFechas/', GraficoLineasAV.as_view(), name='grafico-lineas'),
    path('resumenReporte/', ResumenReporteAV.as_view(), name='grafico-lineas'),
    ]