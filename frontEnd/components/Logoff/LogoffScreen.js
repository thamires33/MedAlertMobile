// LogoffScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoffScreen = () => {
  const navigation = useNavigation();

  const handleLogoff = async () => {
    try {
      // Limpa todos os dados do AsyncStorage
      await AsyncStorage.clear();
      // Navega de volta para a tela Home
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao limpar AsyncStorage:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Você tem certeza que deseja sair?</Text>
      <TouchableOpacity onPress={handleLogoff} style={{ padding: 10, backgroundColor: '#007BFF', borderRadius: 5 }}>
        <Text style={{ color: '#fff' }}>Logoff</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoffScreen;
