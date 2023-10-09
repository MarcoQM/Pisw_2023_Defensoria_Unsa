from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from registros import   views

router=routers.DefaultRouter()
router.register(r'registros',views.RegistroView, 'registros')

urlpatterns = [
    path("api/v1/",include(router.urls)),
    path('docs/',include_docs_urls(title="Registros API"))
]
#me genera las rutas get, post, put y delete