import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { apiEndpoint, access_token } from "../../config/Constants";
import styles from "../Alarm/styles";

const MedicamentosScreen = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const token = await AsyncStorage.getItem(access_token);
        if (!token) {
          Alert.alert("Erro", "Token de autenticação não encontrado.");
          return;
        }

        const response = await fetch(`${apiEndpoint}/medicamentos/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const error = await response.json();
          Alert.alert("Erro", error.detail || "Erro ao buscar medicamentos.");
          return;
        }

        const data = await response.json();
        setMedicamentos(data);
      } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
        Alert.alert("Erro", "Erro ao conectar ao servidor.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicamentos();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIconContainer}>
            <Icon name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Seus Medicamentos</Text>
        </View>

        {medicamentos.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum medicamento cadastrado.</Text>
        ) : (
          medicamentos.map((medicamento) => (
            <View key={medicamento.id} style={styles.card}>
              <Text style={styles.cardTitle}>{medicamento.nome}</Text>
              <Text>Dosagem: {medicamento.dosagem} {medicamento.unidade}</Text>
              <Text>Frequência: {medicamento.frequencia} horas</Text>
              <Text>Data: {medicamento.data}</Text>
              <Text>Hora: {medicamento.horario.substring(0, 5)}</Text>
              <Text>Alarme: {medicamento.alarme ? "Ativado" : "Desativado"}</Text>
              {medicamento.imagem && (
                <Image
                  source={{ uri: medicamento.imagem }}
                  style={styles.image}
                />
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default MedicamentosScreen;