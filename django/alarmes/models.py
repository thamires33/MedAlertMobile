from django.db import models

class Alarme(models.Model):
    id = models.AutoField(primary_key=True)
    fk_medicamento = models.ForeignKey('Medicamento', on_delete=models.CASCADE)
    imagemUri = models.URLField()

    def __str__(self):
        return f"Alarme para {self.fk_medicamento.nome}"
