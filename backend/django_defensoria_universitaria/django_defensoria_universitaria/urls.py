from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    #path('api/expedientes/', include('expedientes_app.api.urls')),
    path('api/sedes/', include('sedes_app.api.urls')),
    path('api/procesos/', include('procesos_app.api.urls')),
    path('api/solicitudes/', include('solicitudes_app.api.urls')),
    path('api/authentication/', include('dj_rest_auth.urls')),
    path('api/registration/', include('dj_rest_auth.registration.urls')),
    path('api/usuarios/', include('usuarios_app.api.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
