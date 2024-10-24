from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from usuarios.models import Usuario, Paciente, Medico

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'email', 'first_name', 'last_name']

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'

class MedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medico
        fields = '__all__'

class RegistroSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = ['email', 'password1', 'password2', 'first_name', 'last_name']

    # Validação para verificar se as senhas coincidem
    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("As senhas não coincidem.")
        return data

    def create(self, validated_data):
        # Removemos o campo confirm_password, pois ele não é necessário para criar o usuário
        validated_data.pop('password2')
        
        user = Usuario(
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        user.set_password(validated_data['password1'])
        user.save()
        return user