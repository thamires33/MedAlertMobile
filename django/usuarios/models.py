from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .constants import ESTADOS_BRASIL, ESPECIALIDADES

class Usuario(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

class Medico(models.Model):
    user = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    crm = models.CharField(max_length=10)
    estado = models.CharField(max_length=2, choices=ESTADOS_BRASIL)
    especialidade = models.CharField(max_length=3, choices=ESPECIALIDADES)

    class Meta:
        unique_together = ('crm', 'estado')

    def __str__(self):
        return f'CRM/{self.estado} {self.crm}'
    
class Paciente(models.Model):
    user = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    nome = models.CharField(max_length=255)
    idade = models.IntegerField()
    patologia = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.nome} - ({self.email})"