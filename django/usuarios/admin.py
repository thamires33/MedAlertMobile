from django.contrib import admin
from .models import Usuario, Medico, Paciente

admin.site.register(Usuario)
admin.site.register(Medico)
admin.site.register(Paciente)