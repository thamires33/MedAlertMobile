from django.db import models

from .constants import ESTADOS_BRASIL, ESPECIALIDADES

class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=255)

    class Meta:
        abstract = True

class Medico(Usuario):
    crm = models.CharField(max_length=20)
    estado = models.CharField(max_length=2, choices=ESTADOS_BRASIL)
    especialidade = models.CharField(max_length=100, choices=ESPECIALIDADES)

    class Meta:
        unique_together = ('crm', 'estado')

    def __str__(self):
        return f'CRM/{self.estado} {self.crm}'
    
class Paciente(Usuario):
    nome = models.CharField(max_length=255)
    idade = models.IntegerField()
    patologia = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.nome} ({self.email})"