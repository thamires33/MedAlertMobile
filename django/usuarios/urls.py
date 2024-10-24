from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(r'usuarios', views.UsuarioViewSet, basename='api-usuario')
router.register(r'pacientes', views.PacienteViewSet, basename='api-paciente')
router.register(r'medicos', views.MedicoViewSet, basename='api-medico')

urlpatterns = [
    path('', include(router.urls)),
]