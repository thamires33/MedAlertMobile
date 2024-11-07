import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import css from './styles'; 
import { apiEndpoint } from '../../config/Constants';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [userType, setUserType] = useState('paciente');
    const [idade, setIdade] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch(`${apiEndpoint}/registro/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    username,
                    first_name: firstName,
                    last_name: lastName,
                    password1,
                    password2,
                    user_type: userType,
                    idade: parseInt(idade)
                })
            });

            const data = await response.json();

            if (data.success) {
                Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
                //navigation.navigate('Home');
            } else {
                Alert.alert('Erro no cadastro', data.message || 'Erro desconhecido');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            Alert.alert('Erro', 'Erro ao conectar ao servidor');
        }
    };

    return (
        <View style={css.login__form}>
            <Text style={css.login_title}>Cadastro</Text>
            <TextInput
                style={css.login__input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={css.login__input}
                placeholder="Nome de Usuário"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={css.login__input}
                placeholder="Primeiro Nome"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={css.login__input}
                placeholder="Último Nome"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={css.login__input}
                placeholder="Senha"
                secureTextEntry
                value={password1}
                onChangeText={setPassword1}
            />
            <TextInput
                style={css.login__input}
                placeholder="Confirme a Senha"
                secureTextEntry
                value={password2}
                onChangeText={setPassword2}
            />
            <TextInput
                style={css.login__input}
                placeholder="Idade"
                keyboardType="numeric"
                value={idade}
                onChangeText={setIdade}
            />
            <TouchableOpacity style={css.login__button} onPress={handleRegister}>
                <Text style={css.login__buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;