from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.http import JsonResponse
from solicitudes_app.models import TipoSolicitud, Solicitud, EstadoSolicitud
from solicitudes_app.models import EstadoSolicitud as Estado
from procesos_app.models import Proceso

#from django.views.decorators.csrf import csrf_exempt
from sedes_app.models import Sede
from datetime import datetime


class ResumenTarjetasAV(APIView):
    def get(self, request):
        tipoSolicitud = TipoSolicitud.objects.all()
        print(tipoSolicitud)
        estados = Estado.objects.all()
        resumen = {}
        for ts in tipoSolicitud:
            resumen[ts.nombre]={}
            for e in estados:
                resumen[ts.nombre][e.nombre]=0
        print(resumen)

        solicitudes = Solicitud.objects.all()
        cant_solicitudes = len(solicitudes)
        for s in solicitudes:
            try:
                #temp = Proceso.objects.get(solicitud = s.id, estado_proceso = True)
                temp = Proceso.objects.filter(solicitud = s.id, estado_proceso = True).first() #True para traer los procesos activos
                resumen[s.tipo_solicitud.nombre][temp.estado_solicitud.nombre]=resumen[s.tipo_solicitud.nombre][temp.estado_solicitud.nombre]+1
            except Proceso.DoesNotExist:
                pass#print("temp es nulo")

        return JsonResponse({"resumen":resumen})

class GraficoBarrasAV(APIView):
    def get(self, request): #dependencia por tipo de solicitud
      
        año_actual = datetime.now().year
        sedes_tipo_solicitud = []
        try:
            #nombreSede = Sede.objects.get(id=id).nombre
            sedes = Sede.objects.all()
            for sede in sedes:
                idSede = sede.id

                tipoSolicitudPorSede={}
            
                tipoSolicitud = TipoSolicitud.objects.all()
                for ts in tipoSolicitud:
                    tipoSolicitudPorSede[ts.nombre]=0
                
                try:
                    solicitudes = Solicitud.objects.filter(sede = idSede, fecha_creacion__year=año_actual)
                    for s in solicitudes:
                        tipoSolicitudPorSede[s.tipo_solicitud.nombre] = tipoSolicitudPorSede[s.tipo_solicitud.nombre] +1
                    sedes_tipo_solicitud.append({idSede:tipoSolicitudPorSede})
                        
                    #return JsonResponse({idSede:tipoSolicitudPorSede})
                except Solicitud.DoesNotExist:
                    pass#print("temp es nulo") 
        except Sede.DoesNotExist:
            return JsonResponse({})
        
        return JsonResponse({"gbarras":sedes_tipo_solicitud})
           
    
class GraficoCircularAV(APIView):
    def get(self, request): #estado de solicitudes cantidad
        print(request.data)
        año_actual = datetime.now().year
        procesoDatosCircular={}

        estados = Estado.objects.all()
        
        for e in estados:
            procesoDatosCircular[e.nombre]=0
        
        try:
            solicitudes = Solicitud.objects.filter(fecha_creacion__year=año_actual)
            for s in solicitudes:
                proceso = Proceso.objects.filter(solicitud = s.id, estado_proceso = True) #True para traer los procesos activos
                for p in proceso:
                    procesoDatosCircular[p.estado_solicitud.nombre] = procesoDatosCircular[p.estado_solicitud.nombre] +1

        except Solicitud.DoesNotExist:
            pass#print("temp es nulo")    
        return JsonResponse({"gCircular":procesoDatosCircular})

class GraficoLineasAV(APIView):
    def get(self, request):
        anio_actual = datetime.now().year
        resumenPorMes = [
            {"ENERO": {}},
            {"FEBRERO": {}},
            {"MARZO": {}},
            {"ABRIL": {}},
            {"MAYO": {}},
            {"JUNIO": {}},
            {"JULIO": {}},
            {"AGOSTO": {}},
            {"SEPTIEMBRE": {}},
            {"OCTUBRE": {}},
            {"NOVIEMBRE": {}},
            {"DICIEMBRE": {}},
        ]
        tipoSolicitud = TipoSolicitud.objects.all()
        for ts in tipoSolicitud:
            for mes in resumenPorMes:
                for nombre_mes, datos_mes in mes.items():
                    datos_mes[ts.nombre]=0
        
        try:
            solicitudes = Solicitud.objects.filter(fecha_creacion__year=anio_actual)
            for s in solicitudes:
                for nombre_mes, datos_mes in resumenPorMes[s.fecha_creacion.month-1].items():
                    datos_mes[s.tipo_solicitud.nombre]=datos_mes[s.tipo_solicitud.nombre]+1

        except Solicitud.DoesNotExist:
            pass#print("temp es nulo")  

        return JsonResponse({"glineas":resumenPorMes})
    
class ResumenReporteAV(APIView):
    def get(self, request):
        anio_actual = datetime.now().year
        data_resumen = {}
        estados_solicitud = EstadoSolicitud.objects.all()
        for es in estados_solicitud:
            solicitudes = Solicitud.objects.filter(fecha_creacion__year=anio_actual, estado_solicitud = es.id)
            data_resumen[es.nombre] = solicitudes.count()
        return JsonResponse({"gResumenReporte": data_resumen})