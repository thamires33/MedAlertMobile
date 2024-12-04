import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Switch,
  Alert,
} from "react-native";
import * as Calendar from "expo-calendar";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import { apiEndpoint } from "../../config/Constants";
import getUserIdFromToken from "../../utils/getUserId";
import { access_token } from "../../config/Constants";
import DateInput from "../Inputs/DateInput";
import TimeInput from "../Inputs/TimeInput";
import { format } from "date-fns";

const AlarmScreen = () => {
  const [nome, setNome] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [unidade, setUnidade] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState("");
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão Negada",
          "Permissões do calendário são necessárias."
        );
      }
    })();
  }, []);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const toggleSwitch = () =>
    setIsAlarmEnabled((previousState) => !previousState);

  const handleCadastro = async () => {
    Alert.alert("Cadastro", "Cadastrando medicamento...");

    try {
      const token = await AsyncStorage.getItem(access_token);

      if (!token) {
        Alert.alert("Erro", "Token de autenticação não encontrado.");
        return;
      }

      const userId = getUserIdFromToken(token);

      if (!userId) {
        Alert.alert("Erro", "Usuário inválido ou token expirado.");
        return;
      }

      // Formate data e horario para o formato esperado
      const formattedDate = format(data, "yyyy-MM-dd"); // Para a data
      const formattedTime = format(selectedTime, "HH:mm"); // Para o horário

      const dados = {
        usuario: userId,
        nome,
        dosagem,
        unidade,
        frequencia,
        data: formattedDate,
        horario: formattedTime,
        imagem: image,
      };

      const response = await fetch(`${apiEndpoint}/medicamentos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      });

      const result = await response.json();

      if (response.status === 201) {
        Alert.alert("Sucesso", "Medicamento cadastrado com sucesso!");
        navigation.navigate("Home", { update: true });
      } else {
        Alert.alert("Erro", result.message || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", "Erro ao conectar ao servidor");
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de permissão para acessar a câmera."
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.menuIconContainer}
          >
            <Icon name="menu" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTextRegular}>MedAlert</Text>

          <TouchableOpacity style={styles.profileIconContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }} // Imagem de perfil do usuário
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cadastrar medicamentos</Text>
          <View style={styles.separator} />

          <Text style={styles.label}>Nome do medicamento</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do medicamento"
            value={nome}
            onChangeText={setNome}
          />

          <View style={styles.row}>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Dosagem</Text>
              <TextInput
                style={styles.input}
                placeholder="Dose"
                value={dosagem}
                onChangeText={setDosagem}
              />
            </View>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Unidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Unidade"
                value={unidade}
                onChangeText={setUnidade}
              />
            </View>
          </View>

          {/* <View>
            <DateInput onDateChange={setData} />
            <Text>Data selecionada: {format(data, "yyyy-MM-dd")}</Text>
          </View>

          <View>
            <TimeInput onTimeChange={handleTimeChange} />
            <Text>Hora para envio: {format(selectedTime, "HH:mm")}</Text>
          </View> */}

          <View style={styles.row}>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Frequência</Text>
              <TextInput
                style={styles.input}
                placeholder="Frequência"
                keyboardType="numeric"
                value={frequencia}
                onChangeText={setFrequencia}
              />
            </View>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Alarme</Text>
              <Switch onValueChange={toggleSwitch} value={isAlarmEnabled} />
            </View>
          </View>

          <TouchableOpacity onPress={openCamera} style={styles.cameraButton}>
            <Icon name="camera-alt" size={24} color="#000" />
            <Text style={styles.cameraButtonText}>Tirar Foto</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.takenPhoto} />}

          <Button title="Cadastrar" onPress={handleCadastro} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AlarmScreen;
