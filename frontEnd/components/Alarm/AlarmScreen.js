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
  const [nome, setNome] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [unidade, setUnidade] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [data, setData] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [image, setImage] = useState(null);
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão Negada", "Permissões do calendário são necessárias.");
      }
    })();
  }, []);

  const toggleSwitch = () => setIsAlarmEnabled((prevState) => !prevState);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const showTimePicker = () => setTimePickerVisible(true);
  const hideTimePicker = () => setTimePickerVisible(false);

  const handleDateConfirm = (date) => {
    setData(date.toISOString().split("T")[0]); // Formato AAAA-MM-DD
    hideDatePicker();
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time.toTimeString().substring(0, 5)); // Formato HH:MM
    hideTimePicker();
  };

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

      const formData = new FormData();
      formData.append("usuario", userId);
      formData.append("nome", nome);
      formData.append("dosagem", dosagem);
      formData.append("unidade", unidade);
      formData.append("frequencia", frequencia);
      formData.append("data", data);
      formData.append("horario", selectedTime);
      formData.append("alarme", isAlarmEnabled.toString());
      formData.append("imagem", image);

      if (image) {
        const fileName = image.split("/").pop();
        formData.append("imagem", {
          uri: image,
          type: "image/png", // Use o tipo de imagem correto (jpeg, png, etc.)
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
        navigation.navigate("Home", { update: true });
      } else {
        console.log("Erro ao cadastrar:", result);
        Alert.alert("Erro", result || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", "Erro ao conectar ao servidor");
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos de permissão para acessar a câmera.");
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
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIconContainer}>
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

          <Text style={styles.label}>Data</Text>
          <TouchableOpacity onPress={showDatePicker} style={styles.input}>
            <Text>{data || "Selecione a data"}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Hora</Text>
          <TouchableOpacity onPress={showTimePicker} style={styles.input}>
            <Text>{selectedTime || "Selecione a hora"}</Text>
          </TouchableOpacity>

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

          {/* Date Picker Modal */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />

          {/* Time Picker Modal */}
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AlarmScreen;
