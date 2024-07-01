import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Button, Switch, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";

const AlarmScreen = () => {
  const navigation = useNavigation();
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);

  const toggleSwitch = () => setIsAlarmEnabled(previousState => !previousState);

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
          <TextInput style={styles.input} placeholder="Nome do medicamento" />

          <View style={styles.row}>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Dosagem</Text>
              <TextInput style={styles.input} placeholder="Dose" />
            </View>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Unidade</Text>
              <TextInput style={styles.input} placeholder="Unidade" />
            </View>
          </View>

          <Text style={styles.label}>Frequência</Text>
          <TextInput style={styles.input} placeholder="Frequência" />

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

          <Button title="Cadastrar" onPress={() => { /* Lógica para cadastrar */ }} />
        </View>
      </ScrollView>
    </View>
  );
};
export default AlarmScreen;