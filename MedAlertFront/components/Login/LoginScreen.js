import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import css from './styles';



const LoginScreen = ({ navigation }) => {
    const [display, setDisplay] = useState('none');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];
    const [isChecked, setIsChecked] = useState(false);

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
    //#endregion

    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleLogin = () => {

        const isValidLogin = username === 'root' && password === 'root';

        if (!isValidLogin) {
            setShowAlert(true);
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
                    onChangeText={(text) => setUsername(text)} />

                <View style={css.passwordContainer}>
                    <TextInput style={css.login__input} placeholder='Senha:' secureTextEntry={!isPasswordVisible}
                        onChangeText={(text) => setPassword(text)} />

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

                <TouchableOpacity style={css.googleButton} onPress={handleLogin}>
                    <Image
                        source={require('../../assets/Login/google.png')}
                        style={css.googleIcon}
                    />
                    <Text style={css.googleButtonText}>Conta Google</Text>
                </TouchableOpacity>
                
                <View style={css.checkboxContainer}>
                    <Text style={css.checkboxText2}> Clicando em entrar, você concorda com nossos
                    <Text style={css.checkboxText1}> Termos de Serviço </Text> e
                    <Text style={css.checkboxText1}> Política de Privacidade </Text> </Text>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen; 