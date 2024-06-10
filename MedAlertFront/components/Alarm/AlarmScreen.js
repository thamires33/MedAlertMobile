import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import css from './styles';

const AlarmScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View style={css.container}>
      <ScrollView style={css.scrollView}>
        <View style={css.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={css.menuIconContainer}>
            <Icon name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <View style={css.headerTextContainer}>
            <Text style={css.headerTextRegular}>MedAlert</Text>
          </View>
          <TouchableOpacity style={css.profileIconContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }} // Aqui você pode usar a imagem de perfil do usuário
              style={css.profileIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default AlarmScreen;