import React, { useEffect, useState, useCallback } from "react";
import { 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView, 
    TouchableOpacity, 
    Alert, 
    Modal 
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import styles from "../Home/styles";
import { apiEndpoint, access_token } from "../../config/Constants";

const MedicamentosScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [medicamentos, setMedicamentos] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMedicamentoId, setSelectedMedicamentoId] = useState(null);

    // Busca os medicamentos do servidor
    const fetchMedicamentos = async () => {
        try {
            const token = await AsyncStorage.getItem(access_token);
            if (!token) throw new Error("Token não encontrado");

            const response = await axios.get(`${apiEndpoint}/medicamentos/`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            setMedicamentos(response.data);
        } catch (err) {
            console.error("Erro ao buscar medicamentos:", err);
            if (err.response?.status === 401) {
                navigation.navigate("Login");
            }
        }
    };

    // Deleta um medicamento pelo ID
    const handleDeleteMedicamento = async (id) => {
        try {
            const token = await AsyncStorage.getItem(access_token);
            if (!token) throw new Error("Token não encontrado");

            const response = await axios.delete(`${apiEndpoint}/medicamentos/${id}/`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (response.status === 204) {
                fetchMedicamentos();
                setIsModalVisible(false);
                Alert.alert("Sucesso", "Medicamento excluído com sucesso.");
            }
        } catch (err) {
            console.error("Erro ao excluir medicamento:", err);
            Alert.alert("Erro", "Não foi possível excluir o medicamento.");
        }
    };

    // Atualiza a lista de medicamentos ao focar na tela
    useEffect(() => {
        if (isFocused) {
            fetchMedicamentos();
        }
    }, [isFocused]);

    // Exibe o modal de confirmação
    const confirmDelete = (id) => {
        setSelectedMedicamentoId(id);
        setIsModalVisible(true);
    };

    // Componente de renderização do medicamento
    const MedicamentoCard = ({ data }) => (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{data.nome}</Text>
            <Text style={styles.cardSubtitle}>
                <Text style={styles.boldText}>Dose:</Text> {data.dose}
            </Text>
            <Text style={styles.cardSubtitle}>
                <Text style={styles.boldText}>Intervalo:</Text> {data.intervalo_horas} horas
            </Text>
            <Text style={styles.cardSubtitle}>
                <Text style={styles.boldText}>Recomendação:</Text> {data.recomendacao || "Nenhuma recomendação"}
            </Text>
            <View style={styles.cardButtonContainer}>
                <TouchableOpacity
                    style={[styles.excludeButton, styles.halfWidthButton]}
                    onPress={() => confirmDelete(data.id)}
                >
                    <Text style={styles.textButton}>Excluir Medicamento</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuIconContainer}>
                        <Icon name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity> */}
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTextRegular}>Medicamentos</Text>
                    </View>
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

                {/* Modal de confirmação */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Tem certeza que deseja excluir este medicamento?</Text>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalCancelButton]}
                                    onPress={() => setIsModalVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalConfirmDeleteButton]}
                                    onPress={() => handleDeleteMedicamento(selectedMedicamentoId)}
                                >
                                    <Text style={styles.modalButtonText}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    );
};

export default MedicamentosScreen;
