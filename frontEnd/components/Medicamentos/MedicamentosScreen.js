import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, SafeAreaView, Keyboard, ScrollView, TouchableOpacity, BackHandler, Alert, Modal } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import styles from "../Home/styles";
import { apiEndpoint, access_token } from "../../config/Constants";

const MedicamentosScreen = () => {
    const navigation = useNavigation();
    const [medicamentos, setMedicamentos] = useState([]);
    const isFocused = useIsFocused();

    // Função para buscar os medicamentos do servidor
    const fetchAllMedicamentos = async () => {
        try {
            const token = await AsyncStorage.getItem(access_token);
            if (!token) {
                throw new Error('Token não encontrado');
            }

            const response = await axios.get(`${apiEndpoint}/medicamentos/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setMedicamentos(response.data);
            Keyboard.dismiss(); // Fecha o teclado caso esteja aberto
        } catch (err) {
            console.log('Erro ao buscar medicamentos:', err);
            if (err.response && err.response.status === 401) {
                navigation.navigate('Login');
            }
        }
    };

    // Busca medicamentos sempre que a tela está visível
    useEffect(() => {
        if (isFocused) {
            fetchAllMedicamentos();
        }
    }, [isFocused]);

    // Componente de renderização da lista de medicamentos
    function MedicamentoCard({ data }) {
        return (
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{data.nome}</Text>
                <Text style={styles.cardSubtitle}>
                    <Text style={styles.boldText}>Dosagem:</Text> {data.dosagem} {data.unidade}
                </Text>
                <Text style={styles.cardSubtitle}>
                    <Text style={styles.boldText}>Frequência:</Text> {data.frequencia} horas
                </Text>
                <Text style={styles.cardSubtitle}>
                    <Text style={styles.boldText}>Data:</Text> {new Date(data.data).toLocaleDateString()}
                </Text>
                <Text style={styles.cardSubtitle}>
                    <Text style={styles.boldText}>Horário:</Text> {data.horario}
                </Text>
                {/* {data.imagem && (
                    <Image source={{ uri: data.imagem }} style={styles.cardImage} />
                )} */}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    {/* <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIconContainer}>
                        <Icon name="menu" size={24} color="#000" />
                    </TouchableOpacity> */}
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTextRegular}>Medicamentos</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.profileIconContainer}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Image
                            source={{ uri: 'https://via.placeholder.com/150' }}
                            style={styles.profileIcon}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
                    {medicamentos.length > 0 ? (
                        medicamentos.map((item, index) => (
                            <MedicamentoCard key={index.toString()} data={item} />
                        ))
                    ) : (
                        <View style={styles.noAlarmMessage}>
                            <Text style={styles.noAlarmText}>Nenhum medicamento encontrado.</Text>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('Cadastro')}
                    >
                        <Text style={styles.txtAddButton}>Adicionar Medicamento</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default MedicamentosScreen;
