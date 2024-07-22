import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
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
    // Implementar lógica de atualização de perfil
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
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
