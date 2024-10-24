from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve

v1 = 'api/v1'

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{v1}/alarmes/', include('alarmes.urls')),
    path(f'{v1}/medicamentos/', include('medicamentos.urls')),
    path(f'{v1}/usuarios/', include('usuarios.urls')),
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
    # re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
]
