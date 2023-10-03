from rest_framework import viewsets
from .serializer import RegistroSerializer
from .models import Registro
# Create your views here.

class RegistroView(viewsets.ModelViewSet):
    serializer_class=RegistroSerializer
    queryset=Registro.objects.all()
