from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .constants import ESTADOS_BRASIL, ESPECIALIDADES

class Usuario(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    senha = models.CharField(max_length=255)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)

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