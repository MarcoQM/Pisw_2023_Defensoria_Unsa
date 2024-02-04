from django.http import JsonResponse
from solicitudes_app.models import TipoSolicitud,Solicitud
from solicitudes_app.models import EstadoSolicitud as Estado
from procesos_app.models import Proceso
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import json
from django.views.decorators.csrf import csrf_exempt
from sedes_app.models import Sede
from datetime import datetime


def resumen(request):
    tipoSolicitud = TipoSolicitud.objects.all()
    estados = Estado.objects.all()
    resumen = {}
    for ts in tipoSolicitud:
        resumen[ts.nombre]={}
        for e in estados:
            resumen[ts.nombre][e.nombre]=0
        

    solicitudes = Solicitud.objects.all()
    cant_solicitudes = len(solicitudes)
    for s in solicitudes:
        try:
            temp = Proceso.objects.get(solicitud = s.id)
            resumen[s.tipo_solicitud][temp.estado.nombre]=resumen[s.tipo_solicitud][temp.estado.nombre]+1
        except Proceso.DoesNotExist:
            pass#print("temp es nulo")

    return JsonResponse({"resumen":resumen})

def grafico_barras(request): #dependencia por tipo de solicitud
    if request.method == 'GET':
        json_data = json.loads(request.body.decode('utf-8'))
        id = json_data.get('id')
        año_actual = datetime.now().year
        
        try:
            nombreSede = Sede.objects.get(id=id).nombre

            tipoSolicitudPorSede={}
            
            tipoSolicitud = TipoSolicitud.objects.all()
            for ts in tipoSolicitud:
                tipoSolicitudPorSede[ts.nombre]=0
            
            try:
                solicitudes = Solicitud.objects.filter(sede = id, fecha_creacion__year=año_actual)
                for s in solicitudes:
                    tipoSolicitudPorSede[s.tipo_solicitud] = tipoSolicitudPorSede[s.tipo_solicitud] +1
                return JsonResponse({nombreSede:tipoSolicitudPorSede})
            except Solicitud.DoesNotExist:
                pass#print("temp es nulo") 
        except Sede.DoesNotExist:
            return JsonResponse({})
           
    

def grafico_circular(request): #estado de solicitudes cantidad
    año_actual = datetime.now().year
    procesoDatosCircular={}

    estados = Estado.objects.all()
    
    for e in estados:
        procesoDatosCircular[e.nombre]=0
    
    try:
        solicitudes = Solicitud.objects.filter(fecha_creacion__year=año_actual)
        for s in solicitudes:
            proceso = Proceso.objects.get(solicitud = s.id)
            procesoDatosCircular[proceso.estado.nombre] = procesoDatosCircular[proceso.estado.nombre] +1
            #tipoSolicitudPorSede[s.tipo_solicitud] = tipoSolicitudPorSede[s.tipo_solicitud] +1

    except Solicitud.DoesNotExist:
        pass#print("temp es nulo")    
    return JsonResponse({"gCircular":procesoDatosCircular})

def solicitudes_mes(request):
    año_actual = datetime.now().year
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
        solicitudes = Solicitud.objects.filter(fecha_creacion__year=año_actual)
        for s in solicitudes:
            #print()
            for nombre_mes, datos_mes in resumenPorMes[s.fecha_creacion.month-1].items():
                datos_mes[s.tipo_solicitud]=datos_mes[s.tipo_solicitud]+1
            #print()
            #for nombre_mes, datos_mes in resumenPorMes.items():

                #datos_mes[s.tipo_solicitud]=datos_mes[s.tipo_solicitud]+1
                #tipoSolicitudPorSede[s.tipo_solicitud] = tipoSolicitudPorSede[s.tipo_solicitud] +1

    except Solicitud.DoesNotExist:
        pass#print("temp es nulo")  

    return JsonResponse({"gCircular":resumenPorMes})

def lista_sedes(request):
    #sedes = {}
    sedes = []
    sedesBasedeDatos=Sede.objects.all()
    for s in sedesBasedeDatos:
        sedes.append({"nombre":s.nombre,"id":s.id})
        #sedes[s.nombre]=s.id
    return JsonResponse({"sedes":sedes})