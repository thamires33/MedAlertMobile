<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Button, Switch, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';
import DateTimePicker from '@react-native-community/datetimepicker';
=======
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Button, Switch, Alert } from 'react-native';
>>>>>>> 0b8fd46f02b0c189c4c7d6e80eff601c0ee3bd0a
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
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null); // Camera
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Permissões do calendário são necessárias.');
      }
    })();
  }, []);

  const toggleSwitch = () => setIsAlarmEnabled(previousState => !previousState);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (event.type === "set") {
      setDate(currentDate);
    }
    setShowDatePicker(false);
  };

  const handleCadastro = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert('Erro', 'Token de autenticação não encontrado.');
        return;
      }

      const data = {
        medicamento,
        dosagem,
        unidade,
        frequencia,
        imageUri: image // Camera
      };

      const response = await fetch(`${apiEndpoint}/alarme`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      //#region Evento Calendario
      if (result.message === 'Alarme cadastrado com sucesso') {
        Alert.alert('Sucesso', 'Alarme cadastrado com sucesso');

        try {
          const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
          const defaultCalendar = calendars.find(calendar => calendar.source.name === 'Default') || calendars[0];

          if (defaultCalendar) {
            const eventDetails = {
              title: medicamento,
              startDate: date,
              endDate: new Date(date.getTime() + 60 * 60 * 1000),
              timeZone: Calendar.DEFAULT,
              notes: `${dosagem} ${unidade} - Frequência: ${frequencia} horas`,
              recurrenceRule: {
                frequency: Calendar.Frequency.HOURLY,
                interval: parseInt(frequencia),
              },
            };
            await Calendar.createEventAsync(defaultCalendar.id, eventDetails);
            Alert.alert('Evento Criado', 'O evento foi adicionado ao calendário.');
          } else {
            Alert.alert('Erro', 'Calendário padrão não foi encontrado.');
          }
        } catch (error) {
          console.error('Erro ao criar evento:', error);
          Alert.alert('Erro', 'Erro ao criar evento no calendário. Verifique as permissões e tente novamente.');
        }

        navigation.navigate('Home', { update: true });
      } else {
        Alert.alert('Erro', result.message || 'Erro desconhecido');
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Erro ao conectar ao servidor');
    }
  };
  //#endregion

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
          <TouchableOpacity 
            style={styles.profileIconContainer}
            onPress={() => navigation.navigate('ProfileScreen')}
          >
            <Image
      //        source={{ uri: 'https://via.placeholder.com/150' }} // Imagem de perfil do usuário
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

          <Text style={styles.label}>Frequência (em horas)</Text>
          <TextInput style={styles.input} placeholder="Frequência" keyboardType="numeric" value={frequencia} onChangeText={setFrequencia} />

          <View style={styles.row}>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Data e Hora</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.input}>{date.toLocaleString()}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
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
