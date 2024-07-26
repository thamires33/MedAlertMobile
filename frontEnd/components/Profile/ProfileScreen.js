import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
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

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const cameraPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        const storagePermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

        return cameraPermission === PermissionsAndroid.RESULTS.GRANTED && storagePermission === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else if (Platform.OS === 'ios') {
      try {
        const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
        const photoLibraryPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

        return cameraPermission === RESULTS.GRANTED && photoLibraryPermission === RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return false;
  };

  const handleImagePicker = async () => {
    const hasPermission = await requestPermissions();
    if (hasPermission) {
      launchImageLibrary({ mediaType: 'photo' }, (response) => {
        if (response.assets) {
          const uri = response.assets[0].uri;
          setProfileData({ ...profileData, profileImage: uri });
        }
      });
    } else {
      Alert.alert('Permissões necessárias', 'Precisamos de permissões para acessar a câmera e a galeria.');
    }
  };

  const handleCamera = async () => {
    const hasPermission = await requestPermissions();
    if (hasPermission) {
      launchCamera({ mediaType: 'photo' }, (response) => {
        if (response.assets) {
          const uri = response.assets[0].uri;
          setProfileData({ ...profileData, profileImage: uri });
        }
      });
    } else {
      Alert.alert('Permissões necessárias', 'Precisamos de permissões para acessar a câmera e a galeria.');
    }
  };

  const handleUpdateProfile = async () => {
    try {
      // Enviar imagem para o servidor e atualizar perfil
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar perfil');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
        <TouchableOpacity onPress={handleCamera} style={styles.editIcon}>
          <Icon name="camera" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImagePicker} style={styles.editIcon}>
          <Icon name="image" size={20} color="#000" />
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
