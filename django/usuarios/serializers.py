from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from usuarios.models import Usuario, Paciente, Medico

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email']

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'

class MedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medico
        fields = '__all__'

class RegistroSerializer(serializers.ModelSerializer):
    username = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=Usuario.objects.all())]
            )
    first_name = serializers.CharField(max_length=30, required=False)
    last_name = serializers.CharField(max_length=30, required=False)
    password1 = serializers.CharField(min_length=8, write_only=True)
    password2 = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = Usuario
        fields = ['username', 'email', 'first_name', 'last_name', 'password1', 'password2']

    
    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError({'password': 'As senhas não coincidem.'})
        return data

    def create(self, validated_data):
        user = Usuario.objects.create_user(
            username=validated_data['username'],
            email=validated_data['username'],
            first_name=validated_data.get('first_name', None),
            last_name=validated_data.get('last_name', None)
        )
        user.set_password(validated_data['password1'])
        user.save()
        return user