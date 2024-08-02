import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../../actions/profileActions';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);
  const [nome, setNome] = useState(profile.nome);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);

  useEffect(() => {
    const userId = 'userId'; // substitua pelo identificador do usuário autenticado
    dispatch(fetchProfile(userId));
  }, [dispatch]);

  const handleUpdateProfile = () => {
    const updatedProfile = {
      id_usuario: profile.id_usuario,
      nome,
      email,
      avatar
    };
    dispatch(updateProfile(updatedProfile));
  };

  return (
    <View style={styles.container}>
      <Text>Nome:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Text>Avatar URL:</Text>
      <TextInput
        value={avatar}
        onChangeText={setAvatar}
        style={styles.input}
      />
      {avatar ? <Image source={{ uri: avatar }} style={styles.avatar} /> : null}
      <Button title="Atualizar Perfil" onPress={handleUpdateProfile} />
    </View>
  );
};


export default ProfileScreen;
