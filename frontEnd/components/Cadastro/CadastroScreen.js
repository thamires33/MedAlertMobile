import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import css from './styles';

const CadastroScreen = ({ navigation }) => {
    const [display, setDisplay] = useState('none');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];

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

    const handleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    const handleCadastro = async () => {
        if (senha !== confirmSenha) {
            setShowAlert(true);
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });
    
            const data = await response.json();
    
            if (data.success) {
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
                navigation.navigate('Login');
            } else {
                setShowAlert(true);
                Alert.alert('Erro', data.message);
            }
        } catch (error) {
            console.error('Erro ao fazer cadastro:', error);
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

            <View style={css.cadastro__form}>
                <TextInput style={css.cadastro__input} placeholder='Usuário:'
                    onChangeText={(text) => setEmail(text)} />

                <View style={css.passwordContainer}>
                    <TextInput style={css.cadastro__input} placeholder='Senha:' secureTextEntry={!isPasswordVisible}
                        onChangeText={(text) => setSenha(text)} />

                    <TouchableOpacity onPress={handlePasswordVisibility} style={css.icon}>
                        <Icon
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>

                <View style={css.passwordContainer}>
                    <TextInput style={css.cadastro__input} placeholder='Confirmar Senha:' secureTextEntry={!isConfirmPasswordVisible}
                        onChangeText={(text) => setConfirmSenha(text)} />

                    <TouchableOpacity onPress={handleConfirmPasswordVisibility} style={css.icon}>
                        <Icon
                            name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={css.cadastro__button} onPress={handleCadastro}>
                    <Text style={css.cadastro__buttonText}>Cadastrar</Text>
                </TouchableOpacity>
                
                <View style={css.checkboxContainer}>
                    <Text style={css.checkboxText2}> Clicando em cadastrar, você concorda com nossos
                    <Text style={css.checkboxText1}> Termos de Serviço </Text> e
                    <Text style={css.checkboxText1}> Política de Privacidade </Text> </Text>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
};

export default CadastroScreen;