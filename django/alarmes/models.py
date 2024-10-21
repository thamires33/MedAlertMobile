from django.db import models

from medicamentos.models import Medicamento

class Alarme(models.Model):
    id = models.AutoField(primary_key=True)
    imagemUri = models.URLField()
    medicamento = models.ForeignKey(Medicamento, on_delete=models.CASCADE)

    def __str__(self):
        return f"Alarme para {self.medicamento.nome}"
