import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Alert, Image } from 'react-native';
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
    const [showAlert, setShowAlert] = useState(false);

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
    
            if (response.ok && data) {
                // Verifica se o cadastro foi bem-sucedido com base na estrutura da resposta
                Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
                navigation.navigate('Login');
            } else {
                // Caso a resposta contenha uma mensagem de erro ou falha
                Alert.alert('Erro no cadastro', data.message || 'Erro desconhecido');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            Alert.alert('Erro', 'Erro ao conectar ao servidor');
        }
    };
    return (
        <KeyboardAvoidingView style={[css.container, css.darkbg]}>

            <View style={css.logo_cadastro}>
                <Image
                    source={require('../../assets/Login/logo.png')}
                    style={css.logo}
                />
                <Text style={css.cadastro_title}>MedAlert</Text>
            </View>

            {showAlert && (
                <Animated.View style={[css.alertContainer, { opacity: fadeAnim }]}>
                    <Text style={css.alertText}>Erro ao fazer cadastro!</Text>
                </Animated.View>
            )}

            <View style={css.login__form}>
                <ScrollView style={css.scrollView}>
                    <View style={css.inputContainer}>
                        <TextInput
                            style={css.cadastro__input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={css.inputContainer}>
                        <TextInput
                            style={css.cadastro__input}
                            placeholder="Nome de Usuário"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>

                    <View style={css.inputContainer}>
                        <TextInput
                            style={css.cadastro__input}
                            placeholder="Primeiro Nome"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                    </View>

                    <View style={css.inputContainer}>
                        <TextInput
                            style={css.cadastro__input}
                            placeholder="Último Nome"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>

                    <View style={css.inputContainer}>
                        <TextInput
                            style={css.cadastro__input}
                            placeholder="Senha"
                            secureTextEntry
                            value={password1}
                            onChangeText={setPassword1}
                        />
                    </View>

                    <View style={css.inputContainer}>
                        <TextInput
                            style={css.cadastro__input}
                            placeholder="Confirme a Senha"
                            secureTextEntry
                            value={password2}
                            onChangeText={setPassword2}
                        />
                    </View>

                    <TextInput
                        style={css.cadastro__input}
                        placeholder="Idade"
                        keyboardType="numeric"
                        value={idade}
                        onChangeText={setIdade}
                    />
                    <TouchableOpacity style={css.cadastro__button} onPress={handleRegister}>
                        <Text style={css.cadastro__buttonText}>Cadastrar</Text>
                    </TouchableOpacity>

                    <View style={css.checkboxContainer}>
                        <Text style={css.checkboxText2}> Clicando em cadastrar, você concorda com nossos
                            <Text style={css.checkboxText1}> Termos de Serviço </Text> e
                            <Text style={css.checkboxText1}> Política de Privacidade </Text> </Text>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};
export default RegisterScreen;