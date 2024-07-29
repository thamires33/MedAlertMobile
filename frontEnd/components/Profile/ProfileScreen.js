import React, { useState } from 'react';
import { Button, Image, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { apiEndpoint } from '../../config/Constants';

export default function ImagePicker() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar sua galeria!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (image) {
      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append('image', {
        uri: image,
        name: filename,
        type: type,
      });
      formData.append('usuario_id', '1'); // Substitua com o ID real do usuário

      try {
        const response = await fetch(`${apiEndpoint}/upload`, {
          method: 'POST',
          body: formData,
      //    headers: {
      //      'Content-Type': 'multipart/form-data',
      //    },
        });

        if (response.ok) {
          const data = await response.json();
          Alert.alert('Sucesso', 'Upload bem-sucedido!');
          console.log(data);
        } else {
          throw new Error('Erro ao fazer upload da imagem.');
        }
      } catch (error) {
        Alert.alert('Erro', error.message);
        console.error(error);
      }
    } else {
      Alert.alert('Nenhuma Imagem Selecionada', 'Por favor, selecione uma imagem para fazer o upload.');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Selecionar Imagem" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {image && <Button title="Upload" onPress={uploadImage} />}
    </View>
  );
}
