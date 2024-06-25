import React from 'react';
import { View, Button } from 'react-native';
import * as Picker from 'expo-image-picker';
import styles from '../styles';

// компонент для выбора изображения из галереи
const ImagePicker = ({ onImageSelected }) => {
  const pickImage = async () => {
    // запрос разрешений на доступ к библиотеке изображений
    const permissionResult = await Picker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      // если разрешение не предоставлено, отображается предупреждение
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.Images, // выбор только изображений
      allowsEditing: true, // пользователь может выбрать изображение и затем обрезать его до желаемого размера
      aspect: [4, 3], // инструмент обрезки будет ограничен пропорциями 4:3
      quality: 1, // качество изображения (1 - наилучшее)
    });

    if (!result.canceled) {
      // если изображение было выбрано, вызывается функция onImageSelected с URI изображения
      onImageSelected(result.uri);
    } else {
      console.log('User cancelled image picker'); // логирование отмены выбора изображения
    }
  };

  return (
    <View>
      <Button title="Выбрать изображение" onPress={pickImage} />
    </View>
  );
};

export default ImagePicker;
