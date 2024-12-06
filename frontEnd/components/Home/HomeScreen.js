import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, SafeAreaView, Keyboard, ScrollView, TouchableOpacity, BackHandler, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
<<<<<<< HEAD
import styles from "./styles";
import { apiEndpoint, access_token } from "../../config/Constants";
=======
import Modal from 'react-native-modal';
import styles from "./styles"; 
import { apiEndpoint } from "../../config/Constants";

>>>>>>> dependencies
const HomeScreen = () => {
    const navigation = useNavigation();
    const [alarmes, setAlarmes] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade da Modal
    const [currentMedicine, setCurrentMedicine] = useState(null); // Para guardar o medicamento atual
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

    // Função para abrir a Modal e salvar o medicamento atual
    const handleTakeMedicine = (medicine) => {
        setCurrentMedicine(medicine); // Define o medicamento atual
        setModalVisible(true); // Abre a Modal
    };

    // Função para marcar medicamento como tomado
    const handleConfirmTakeMedicine = async () => {
        const medicineId = String(currentMedicine.id);  // Converte o id para string
        const alarmTime = currentMedicine.alarmTime;

        try {
            const medicineStatus = await AsyncStorage.getItem(`${medicineId}_${alarmTime}`);
            if (!medicineStatus) {
                await AsyncStorage.setItem(`${medicineId}_${alarmTime}`, 'tomado');  // Marca como tomado
                console.log("Medicamento tomado!");
            } else {
                console.log("Medicamento já marcado como tomado");
            }
    
            // Atualiza o estado de alarmes para refletir a mudança
            const updatedAlarmes = alarmes.map((item) => {
                if (item.id === currentMedicine.id && item.alarme.inicio === alarmTime) {
                    return { ...item, tomado: true };  // Marca o medicamento como tomado
                }
                return item;
            });
    
            setAlarmes(updatedAlarmes);  // Atualiza os alarmes na tela
            setModalVisible(false); // Fecha a Modal após a confirmação
        } catch (error) {
            console.log("Erro ao salvar no AsyncStorage:", error);
        }
    };

    // Componente de renderização da lista de alarmes
    function Listagem({ data }) {
        const alarmTime = new Date(data.alarme.inicio);  // Pegue o horário do alarme único
        const alarmKey = `${data.id}_${alarmTime.toISOString()}`;

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

                <View style={styles.alarmCard}>
                    <Text style={styles.cardSubtitle}>
                        <Text style={styles.boldText}>Alarme:</Text> {alarmTime.toLocaleString()}
                    </Text>

                    {/* Exibindo o ícone de check apenas se o medicamento for marcado como tomado */}
                    {data.tomado && (
                        <Icon name="check-circle" size={24} color="green" style={styles.checkIcon} />
                    )}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => handleTakeMedicine({ id: data.id, alarme: data.alarme, alarmTime: alarmTime.toISOString() })} 
                        >
                            <Text style={styles.actionButtonText}>Tomar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
<<<<<<< HEAD
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

=======
>>>>>>> dependencies
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
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Alarm')}
                    >
                        <Text style={styles.actionButtonText}>Adicionar Remédio</Text>
                    </TouchableOpacity>
                </View>

                {/* Modal para confirmação */}
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={() => setModalVisible(false)} 
                    onBackButtonPress={() => setModalVisible(false)} 
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Você tomou o medicamento {currentMedicine ? currentMedicine.medicamento : ''}?</Text>
                        <TouchableOpacity style={styles.button} onPress={handleConfirmTakeMedicine}>
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    );
};

export default HomeScreen;
