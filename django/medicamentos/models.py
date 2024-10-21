from django.db import models

class Medicamento(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    dosagem = models.CharField(max_length=50)
    unidade = models.CharField(max_length=10)

    def __str__(self):
        return self.nome
