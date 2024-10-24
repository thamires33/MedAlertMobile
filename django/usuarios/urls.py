from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

router = DefaultRouter()

router.register(r'usuarios', views.UsuarioViewSet, basename='api-usuario')
router.register(r'pacientes', views.PacienteViewSet, basename='api-paciente')
router.register(r'medicos', views.MedicoViewSet, basename='api-medico')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('registro/', views.RegistroUsuario.as_view(), name='auth_register'),
]