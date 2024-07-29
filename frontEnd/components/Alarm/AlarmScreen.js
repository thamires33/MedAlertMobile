import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Button, Switch, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker'; // Camera
import styles from "./styles";
import { apiEndpoint } from '../../config/Constants';

const AlarmScreen = () => {
  const [medicamento, setMedicamento] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [unidade, setUnidade] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [image, setImage] = useState(null); // Camera
  const navigation = useNavigation();
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);

  const toggleSwitch = () => setIsAlarmEnabled(previousState => !previousState);

  const handleCadastro = async () => {
    const token = await AsyncStorage.getItem('token');
    const data = {
      medicamento,
      dosagem,
      unidade,
      frequencia,
      imageUri: image // Camera
    };
    console.log(data);
    fetch(`${apiEndpoint}/alarme`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Alarme cadastrado com sucesso') {
        Alert.alert('Sucesso', 'Alarme cadastrado com sucesso');
        console.log('Success:', data);
        navigation.navigate('Home', { update: true });
      } else {
        Alert.alert('Erro', data.message || 'Erro desconhecido');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      Alert.alert('Erro', 'Erro ao conectar ao servidor');
    });
  };
//#region camera
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a câmera.');
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
//#endregion
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIconContainer}>
            <Icon name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextRegular}>MedAlert</Text>
          </View>
          <TouchableOpacity style={styles.profileIconContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }} // Imagem de perfil do usuário
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cadastrar Remédios</Text>
          <View style={styles.separator} />

          <Text style={styles.label}>Medicamento</Text>
          <TextInput style={styles.input} placeholder="Nome do medicamento" value={medicamento} onChangeText={setMedicamento} />

          <View style={styles.row}>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Dosagem</Text>
              <TextInput style={styles.input} placeholder="Dose" value={dosagem} onChangeText={setDosagem} />
            </View>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Unidade</Text>
              <TextInput style={styles.input} placeholder="Unidade" value={unidade} onChangeText={setUnidade} />
            </View>
          </View>

          <Text style={styles.label}>Frequência</Text>
          <TextInput style={styles.input} placeholder="Frequência" value={frequencia} onChangeText={setFrequencia} />

          <View style={styles.row}>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Horário</Text>
              <TextInput style={styles.input} placeholder="Horário" />
            </View>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Alarme</Text>
              <Switch
                onValueChange={toggleSwitch}
                value={isAlarmEnabled}
              />
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