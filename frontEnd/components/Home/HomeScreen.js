import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, SafeAreaView, Keyboard, ScrollView, TouchableOpacity, BackHandler, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import styles from "./styles";
import { apiEndpoint } from "../../config/Constants";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [alarmes, setAlarmes] = useState([]);
    const isFocused = useIsFocused();

    const fetchAllAlarmes = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token não encontrado');
            }

            const response = await axios.get(`${apiEndpoint}/alarme`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setAlarmes(response.data);
            Keyboard.dismiss();
        } catch (err) {
            console.log('Erro ao buscar alarmes:', err);
            if (err.response && err.response.status === 401) {
                // Token inválido ou expirado, redirecionar para a tela de login
                navigation.navigate('Login');
            }
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchAllAlarmes();
        }
    }, [isFocused]);

    useFocusEffect(
        useCallback(() => { // Função para impedir retorno para a tela Login
            const onBackPress = () => {
                Alert.alert(
                    "Sair",
                    "Você tem certeza que quer sair do aplicativo?",
                    [
                        { text: "Cancelar", style: "cancel" },
                        { text: "OK", onPress: () => BackHandler.exitApp() }
                    ]
                );
                return true; 
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );

    function Listagem({ data }) {
        return (
            <View style={styles.card}>
                <View style={styles.titleLine}>
                    <Text style={styles.cardTitle}>{data.medicamento} {data.dosagem}mg</Text>
                    <TouchableOpacity>
                        <Image
                            source={{ uri: data.imageUri }} // Renderização da imagem
                            style={styles.cardImage}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.cardSubtitle}>Frequência: A cada {data.frequencia} horas</Text>
                <TouchableOpacity style={styles.takeButton}>
                    <Text style={styles.takeButtonText}>Tomar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIconContainer}>
                        <Icon name="menu" size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTextRegular}>MedAlert</Text>
                    </View>
                    <TouchableOpacity style={styles.profileIconContainer}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/150' }}
                            style={styles.profileIcon}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
                    {alarmes.map((item, index) => (
                        <Listagem key={index.toString()} data={item} />
                    ))}
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('Alarm')}
                    >
                        <Text style={styles.txtAddButton}>Adicionar Remédio</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default HomeScreen;