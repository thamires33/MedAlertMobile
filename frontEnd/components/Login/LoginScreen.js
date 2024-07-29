import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Animated, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import css from './styles';
import { apiEndpoint } from '../../config/Constants';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];

    // Configura a animação do alerta
    useEffect(() => {
        if (showAlert) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }).start(() => setShowAlert(false));
                }, 3000);
            });
        }
    }, [showAlert, fadeAnim]);

    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // Realiza o login com email e senha
    const handleLogin = async () => {
        try {
            const response = await fetch(`${apiEndpoint}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (data.success) {
                // Salva o token JWT no AsyncStorage
                await AsyncStorage.setItem('token', data.token);
                navigation.navigate('Home');
                console.log('Login bem-sucedido');
            } else {
                setShowAlert(true);
                Alert.alert('Erro', data.message);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            Alert.alert('Erro', 'Erro ao conectar ao servidor');
        }
    };

    // Realiza o login com autenticação biométrica
    const handleBiometricLogin = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
            Alert.alert('Erro', 'O dispositivo não suporta autenticação biométrica.');
            return;
        }

        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
            Alert.alert('Erro', 'Nenhum método de autenticação biométrica está registrado.');
            return;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Autentique-se',
            fallbackLabel: 'Usar senha',
        });

        if (result.success) {
            // Se a autenticação biométrica for bem-sucedida, navega para a tela principal
            navigation.navigate('Home');
        } else {
            Alert.alert('Falha', 'Autenticação falhou. Tente novamente.');
        }
    };

    return (
        <KeyboardAvoidingView style={[css.container, css.darkbg]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={css.logo_login}>
                <Image
                    source={require('../../assets/Login/logo.png')}
                    style={css.logo}
                />
                <Text style={css.login_title}>MedAlert</Text>
            </View>

            {showAlert && (
                <Animated.View style={[css.alertContainer, { opacity: fadeAnim }]}>
                    <Text style={css.alertText}>Usuário ou senha inválidos!</Text>
                </Animated.View>
            )}

            <View style={css.login__form}>

                <TextInput
                    style={css.login__input}
                    placeholder='Usuário:'
                    onChangeText={setEmail}
                />

                <View style={css.passwordContainer}>
                    <TextInput
                        style={css.login__input}
                        placeholder='Senha:'
                        secureTextEntry={!isPasswordVisible}
                        onChangeText={setSenha}
                    />

                    <TouchableOpacity onPress={handlePasswordVisibility} style={css.icon}>
                        <Icon
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={css.login__button} onPress={handleLogin}>
                    <Text style={css.login__buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={css.login__buttonB} onPress={handleBiometricLogin}>
                    <Text style={css.login__buttonText}>Entrar com Biometria</Text>
                </TouchableOpacity>

                <View style={css.dividerContainer}>
                    <View style={css.divider} />
                    <Text style={css.dividerText}> OU CONTINUE COM </Text>
                    <View style={css.divider} />
                </View>

                <TouchableOpacity style={css.googleButton} onPress={handleLogin}>
                    <Image
                        source={require('../../assets/Login/google.png')}
                        style={css.googleIcon}
                    />
                    <Text style={css.googleButtonText}>Conta Google</Text>
                </TouchableOpacity>

                <View style={css.miudosContainer2}>
                    <Text style={css.miudosText4}>
                        Não possui uma conta?
                        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                            <Text style={css.miudosText3}> Cadastre-se </Text>
                        </TouchableOpacity>
                    </Text>
                </View>

                <View style={css.miudosContainer}>
                    <Text style={css.miudosText2}> Clicando em entrar, você concorda com nossos
                        <Text style={css.miudosText1}> Termos de Serviço </Text> e
                        <Text style={css.miudosText1}> Política de Privacidade </Text> </Text>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
