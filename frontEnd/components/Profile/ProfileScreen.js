import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './styles'; 

const ProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState({
    nome: '',
    endereco: '',
    idade: '',
    telefone: '',
    toqueAlarme: '',
    email: '',
    senha: '',
    profileImage: '',
  });

  const handleEditProfile = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setProfileData({ ...profileData, profileImage: uri });
      }
    });
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();

    formData.append('nome', profileData.nome);
    formData.append('endereco', profileData.endereco);
    formData.append('idade', profileData.idade);
    formData.append('telefone', profileData.telefone);
    formData.append('toqueAlarme', profileData.toqueAlarme);
    formData.append('email', profileData.email);
    formData.append('senha', profileData.senha);

    if (profileData.profileImage) {
      formData.append('profileImage', {
        uri: profileData.profileImage,
        type: 'image/jpeg',
        name: 'profileImage.jpg',
      });
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch('http://localhost:8081/updateProfile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Certifique-se de que o backend aceita esse tipo de conteúdo
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro na atualização do perfil');
      }

      const result = await response.json();
      console.log('Perfil atualizado:', result);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', 'Erro ao atualizar perfil');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
        <TouchableOpacity onPress={handleImagePicker} style={styles.editIcon}>
          <Icon name="camera" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      {['nome', 'endereco', 'idade', 'telefone', 'toqueAlarme', 'email', 'senha'].map((field) => (
        <View key={field} style={styles.infoRow}>
          <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
          <TextInput
            style={styles.input}
            value={profileData[field]}
            onChangeText={(text) => handleEditProfile(field, text)}
            secureTextEntry={field === 'senha'}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
        <Text style={styles.updateButtonText}>Atualizar Perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;