
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response

from usuarios.models import Usuario, Paciente, Medico
from usuarios.serializers import UsuarioSerializer, PacienteSerializer, MedicoSerializer, RegistroSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer

    def get_queryset(self):
        return Usuario.objects.all()

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

class MedicoViewSet(viewsets.ModelViewSet):
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

class RegistroUsuario(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = RegistroSerializer

