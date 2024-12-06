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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "./styles";
import { apiEndpoint, access_token } from "../../config/Constants";
import getUserIdFromToken from "../../utils/getUserId";

const AlarmScreen = () => {
  const [medicamento, setMedicamento] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [unidade, setUnidade] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null); // Camera
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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

  const toggleSwitch = () => setIsAlarmEnabled((prevState) => !prevState);

  const handleDateConfirm = (selectedDate) => {
    setDate(selectedDate);
    setDatePickerVisibility(false);
  };

  const createCalendarEvent = async () => {
    try {
      const defaultCalendarSource = Platform.OS === "ios"
        ? await Calendar.getDefaultCalendarAsync()
        : { isLocalAccount: true, name: "MedAlert" };

      const calendarId = await Calendar.createCalendarAsync({
        title: "MedAlert",
        color: "blue",
        entityType: Calendar.EntityTypes.EVENT,
        source: defaultCalendarSource,
        name: "MedAlert",
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });

      await Calendar.createEventAsync(calendarId, {
        title: `Tomar ${medicamento}`,
        startDate: date,
        endDate: new Date(date.getTime() + 30 * 60 * 1000), // +30 minutos
        notes: `Dosagem: ${dosagem} ${unidade}. Frequência: ${frequencia} horas.`,
        timeZone: "GMT",
      });

      Alert.alert("Sucesso", "Evento adicionado ao calendário!");
    } catch (error) {
      console.error("Erro ao criar evento no calendário:", error);
      Alert.alert("Erro", "Não foi possível criar o evento.");
    }
  };

  const handleCadastro = async () => {
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

      const formData = new FormData();
      formData.append("usuario", userId);
      formData.append("nome", medicamento);
      formData.append("dosagem", dosagem);
      formData.append("unidade", unidade);
      formData.append("frequencia", frequencia);
      formData.append("data", date.toISOString().split("T")[0]); // YYYY-MM-DD
      formData.append("horario", date.toISOString().split("T")[1].slice(0, 5)); // HH:MM
      formData.append("alarme", isAlarmEnabled.toString());

      if (image) {
        const fileName = image.split("/").pop();
        formData.append("imagem", {
          uri: image,
          type: "image/png",
          name: fileName,
        });
      }

      const response = await fetch(`${apiEndpoint}/medicamentos/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Medicamento cadastrado com sucesso!");
        await createCalendarEvent(); // Cria o evento no calendário
        navigation.navigate("Home", { update: true });
      } else {
        Alert.alert("Erro", result.message || "Erro desconhecido.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", "Erro ao conectar ao servidor.");
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cadastrar Remédios</Text>
          <View style={styles.separator} />

          <Text style={styles.label}>Medicamento</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do medicamento"
            value={medicamento}
            onChangeText={setMedicamento}
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

          <Text style={styles.label}>Frequência (em horas)</Text>
          <TextInput
            style={styles.input}
            placeholder="Frequência"
            keyboardType="numeric"
            value={frequencia}
            onChangeText={setFrequencia}
          />

          <Text style={styles.label}>Data e Hora</Text>
          <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
            <Text style={styles.input}>{date.toLocaleString()}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleDateConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />

          <Text style={styles.label}>Alarme</Text>
          <Switch onValueChange={toggleSwitch} value={isAlarmEnabled} />

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
