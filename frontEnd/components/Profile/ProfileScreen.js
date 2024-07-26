import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './styles'; // Importando estilos do arquivo styles.js

const ProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState({
    nome: 'Carol Silva Antunes',
    endereco: 'Rua Colômbia, 201',
    idade: '24 anos',
    telefone: '+55 11 98765-4321',
    toqueAlarme: 'Stargaze',
    email: 'carol_silva@outlook.com',
    senha: '********',
    profileImage: 'https://example.com/path/to/profile-pic.jpg',
  });

  const handleEditProfile = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
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
    
    // Adicione o arquivo de imagem
    if (profileData.profileImage) {
      formData.append('profileImage', {
        uri: profileData.profileImage,
        type: 'image/jpeg', // ou o tipo de arquivo correto
        name: 'profileImage.jpg' // ou o nome correto
      });
    }
  
    try {
      const response = await fetch('http://localhost:8081/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Inclua o token se necessário
        },
        body: formData
      });
  
      const result = await response.json();
      console.log('Perfil atualizado:', result);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
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
