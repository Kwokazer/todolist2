import React from 'react';
import { View, Button } from 'react-native';
import * as Picker from 'expo-image-picker';
import styles from '../styles';

// компонент для выбора изображения из галереи
const ImagePicker = ({ onImageSelected }) => {
  const pickImage = async () => {
    // Запрос разрешений
    const permissionResult = await Picker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Запуск библиотеки изображений
    const result = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri); // Используем result.uri, так как assets[0].uri не поддерживается expo-image-picker
    } else {
      console.log('User cancelled image picker');
    }
  };

  return (
    <View>
      <Button title="Pick an Image" onPress={pickImage} />
    </View>
  );
};

export default ImagePicker;
