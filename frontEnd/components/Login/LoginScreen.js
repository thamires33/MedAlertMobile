import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import css from './styles';
import { apiEndpoint } from '../../config/Constants';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];

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

    const handleGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info:', userInfo);

            // Você pode precisar enviar os dados para o seu servidor
            // e armazenar o token de autenticação, se necessário.

            await AsyncStorage.setItem('token', userInfo.idToken); // ou outro token relevante
            navigation.navigate('Home');
        } catch (error) {
            console.error('Erro ao fazer login com o Google:', error);
            Alert.alert('Erro', 'Erro ao conectar ao servidor');
        }
    };

    return (
        <KeyboardAvoidingView style={[css.container, css.darkbg]}>
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
                <TextInput style={css.login__input} placeholder='Usuário:'
                    onChangeText={(text) => setEmail(text)} />

                <View style={css.passwordContainer}>
                    <TextInput style={css.login__input} placeholder='Senha:' secureTextEntry={!isPasswordVisible}
                        onChangeText={(text) => setSenha(text)} />

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

                <View style={css.dividerContainer}>
                    <View style={css.divider} />
                    <Text style={css.dividerText}> OU CONTINUE COM </Text>
                    <View style={css.divider} />
                </View>

                <TouchableOpacity style={css.googleButton} onPress={handleGoogleLogin}>
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
