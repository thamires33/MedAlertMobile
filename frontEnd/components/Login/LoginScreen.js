import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Animated, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Google from 'expo-auth-session/providers/google'; // OAuth
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage para persistência
import * as WebBrowser from 'expo-web-browser'; // OAuth
import * as LocalAuthentication from 'expo-local-authentication';
import axios from 'axios';  // Incluindo axios para a requisição API
import css from './styles';
import { apiEndpoint, access_token, refresh_token} from '../../config/Constants'; // Defina o endpoint da API

WebBrowser.maybeCompleteAuthSession(); // OAuth

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false); // Definindo o estado de loading
    const fadeAnim = useState(new Animated.Value(0))[0];

    //#region OAuth
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '869491331341-ikr79v21hqeg2bjkv7a6c46cfo2doe1v.apps.googleusercontent.com',
        iosClientId: '869491331341-ikr79v21hqeg2bjkv7a6c46cfo2doe1v.apps.googleusercontent.com',
        androidClientId: '869491331341-ddmrcksm97vb14lg5nqnaua90emkqdrg.apps.googleusercontent.com',
        webClientId: '869491331341-ikr79v21hqeg2bjkv7a6c46cfo2doe1v.apps.googleusercontent.com',
    });

    const callAuthGoogle = () => {
        promptAsync();
    };

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            handleGoogleSignIn(authentication);
        }
    }, [response]);

    const handleGoogleSignIn = async (authentication) => {
        try {
            const userInfoResponse = await fetch(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers: { Authorization: `Bearer ${authentication.accessToken}` },
                }
            );

            const userInfo = await userInfoResponse.json();
            await AsyncStorage.setItem('@user', JSON.stringify(userInfo)); // Usando AsyncStorage
            Alert.alert('Login Successful', `Welcome ${userInfo.name}`);
            navigation.navigate('Drawer');
        } catch (error) {
            Alert.alert('Error', 'Something went wrong during login');
        }
    };
    //#endregion

    //#region card de alerta
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
    //#endregion

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);  // Ativa o estado de loading
        try {
            // Ajuste na requisição da API Django
            const response = await axios.post(`${apiEndpoint}/login/`, {
                email: email,
                password: senha,
            });

            // Verifica se o token foi retornado
            if (response.data.access) {
                await AsyncStorage.setItem(access_token, response.data.access); // Usando AsyncStorage para persistir o token
                await AsyncStorage.setItem(refresh_token, response.data.refresh);
                Alert.alert('Login realizado com sucesso!');
                navigation.navigate('Drawer');
            } else {
                Alert.alert('Erro', 'Token não encontrado. Verifique a resposta da API.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao fazer login. Verifique suas credenciais.');
        } finally {
            setLoading(false);  // Desativa o estado de loading
        }
    };

    //#region autenticação biométrica
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
            navigation.navigate('Drawer');
        } else {
            Alert.alert('Falha', 'Autenticação falhou. Tente novamente.');
        }
    };
    //#endregion

    return (
        <KeyboardAvoidingView style={[css.container, css.darkbg]} behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
            <View style={css.logo_login}>
                <Image
                    source={require('../../assets/Login/logo.png')}
                    style={css.logo}
                />
                <Text style={css.login_title}>Login</Text>
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
                    keyboardType='email-address'
                   autoCapitalize='none'
                />

                <View style={css.passwordContainer}>
                    <TextInput
                        style={css.login__input}
                        placeholder='Senha:'
                        secureTextEntry={!isPasswordVisible}
                        onChangeText={setSenha}
                        autoCapitalize='none'
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

                <TouchableOpacity style={css.googleButton} onPress={callAuthGoogle}>
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
