from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/expedientes/', include('expedientes_app.api.urls')),
    path('api/sedes/', include('sedes_app.api.urls')),
    path('api/solicitudes/', include('solicitudes_app.api.urls')),
]
