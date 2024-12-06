import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, SafeAreaView, Keyboard, ScrollView, TouchableOpacity, BackHandler, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import styles from "./styles";
import { apiEndpoint, access_token } from "../../config/Constants";
const HomeScreen = () => {
    const navigation = useNavigation();
    const [alarmes, setAlarmes] = useState([]);
    const isFocused = useIsFocused();

    // Função para buscar os alarmes do servidor
    const fetchAllAlarmes = async () => {
        try {
            const token = await AsyncStorage.getItem(access_token);
            if (!token) {
                throw new Error('Token não encontrado');
            }

            const response = await axios.get(`${apiEndpoint}/receitas/usuario/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setAlarmes(response.data);
            Keyboard.dismiss();  // Fecha o teclado caso esteja aberto
        } catch (err) {
            console.log('Erro ao buscar alarmes:', err);
            if (err.response && err.response.status === 401) {
                // Token inválido ou expirado, redireciona para a tela de login
                navigation.navigate('Login');
            }
        }
    };

    const handleDeleteRecipe = async (id) => {
        try {
            const token = await AsyncStorage.getItem(access_token);
            if (!token) {
                throw new Error('Token não encontrado');
            }

            const response = await axios.delete(`${apiEndpoint}/receitas/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 204) {
                fetchAllAlarmes();
            }
        } catch (err) {
            console.log('Erro ao buscar alarmes:', err);
            if (err.response && err.response.status === 401) {
                // Token inválido ou expirado, redireciona para a tela de login
                navigation.navigate('Login');
            }
        }
    };
    
    // Efetua a busca quando o componente está visível
    useEffect(() => {
        if (isFocused) {
            fetchAllAlarmes();
        }
    }, [isFocused]);

    // Impede que o usuário volte para a tela de login pressionando o botão de voltar
    useFocusEffect(
        useCallback(() => {
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

    // Componente de renderização da lista de alarmes
    function Listagem({ data }) {
        return (
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{data.paciente.first_name} {data.paciente.last_name}</Text>
                <Text style={styles.cardSubtitle}>
                    <Text style={styles.boldText}>Medicamento:</Text> {data.medicamento}
                </Text>
                <Text style={styles.cardSubtitle}>
                    <Text style={styles.boldText}>Dose:</Text> {data.dose}
                </Text>
                <Text style={styles.cardSubtitle}>
                    <Text style={styles.boldText}>Recomendação:</Text> {data.recomendacao || "Nenhuma recomendação específica"}
                </Text>
                <Text style={styles.cardSubtitle}>
                    <Text style={styles.boldText}>Médico responsável:</Text> {data.medico.first_name} {data.medico.last_name}
                </Text>
                <Text style={styles.cardSubtitle}>
                    <Text style={styles.boldText}>Início do alarme:</Text> {new Date(data.alarme.inicio).toLocaleString()}
                </Text>
                <Text style={styles.cardSubtitle}>
                    <Text style={styles.boldText}>Intervalo de horas:</Text> {data.alarme.intervalo_horas}
                </Text>
                <Text style={styles.cardSubtitle}>
                    <Text style={styles.boldText}>Duração do alarme (dias):</Text> {data.alarme.duracao_dias}
                </Text>
                <View style={styles.cardButtonContainer}>
                    <TouchableOpacity style={[styles.excludeButton, styles.halfWidthButton]} onPress={handleDeleteRecipe(data.id)}>
                        <Text style={styles.textButton}>Excluir receita</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.takeButton, styles.halfWidthButton]}>
                        <Text style={styles.textButton}>Tomar</Text>
                    </TouchableOpacity>
                </View>
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
                    <TouchableOpacity style={styles.profileIconContainer}
                        onPress={() => navigation.navigate('Profile')}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/150' }}
                            style={styles.profileIcon}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
                    {alarmes.length > 0 ? (
                        alarmes.map((item, index) => (
                            <Listagem key={index.toString()} data={item} />
                        ))
                    ) : (
                        <View style={styles.noAlarmMessage}>
                            <Text style={styles.noAlarmText}>Nenhum alarme encontrado.</Text>
                        </View>
                    )}
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
