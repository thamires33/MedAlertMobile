import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Animated, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import css from './styles';
import { apiEndpoint } from '../../config/Constants'; // Certifique-se que o apiEndpoint esteja configurado corretamente

const CadastroScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        if (showAlert) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [showAlert]);

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

        if (senha.length < 8) {
            setShowAlert(true);
            Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres');
            return;
        }

        setLoading(true); // Inicia o loading

        try {
            const response = await fetch(`${apiEndpoint}/registro/`, { // A rota do registro no backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha, confirm_senha: confirmSenha }), // Enviando email, senha e confirm_senha
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Cadastro realizado com sucesso', 'Agora você pode fazer o login.');
                navigation.navigate('Login');
            } else {
                setShowAlert(true);
                Alert.alert('Erro', data.message || 'Erro ao realizar cadastro.');
            }
        } catch (error) {
            console.error('Erro ao fazer cadastro:', error);
            Alert.alert('Erro', 'Erro ao conectar ao servidor');
        } finally {
            setLoading(false); // Finaliza o loading
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
                <TextInput
                    style={css.cadastro__input}
                    placeholder='Usuário:'
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <View style={css.passwordContainer}>
                    <TextInput
                        style={css.cadastro__input}
                        placeholder='Senha:'
                        secureTextEntry={!isPasswordVisible}
                        onChangeText={(text) => setSenha(text)}
                        value={senha}
                    />
                    <TouchableOpacity onPress={handlePasswordVisibility} style={css.icon}>
                        <Icon
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>

                <View style={css.passwordContainer}>
                    <TextInput
                        style={css.cadastro__input}
                        placeholder='Confirmar Senha:'
                        secureTextEntry={!isConfirmPasswordVisible}
                        onChangeText={(text) => setConfirmSenha(text)}
                        value={confirmSenha}
                    />
                    <TouchableOpacity onPress={handleConfirmPasswordVisibility} style={css.icon}>
                        <Icon
                            name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={css.cadastro__button}
                    onPress={handleCadastro}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={css.cadastro__buttonText}>Cadastrar</Text>
                    )}
                </TouchableOpacity>

                <View style={css.checkboxContainer}>
                    <Text style={css.checkboxText2}>
                        Clicando em cadastrar, você concorda com nossos
                        <Text style={css.checkboxText1}> Termos de Serviço </Text> e
                        <Text style={css.checkboxText1}> Política de Privacidade </Text>
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default CadastroScreen;
