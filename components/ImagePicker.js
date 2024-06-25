import React from 'react';
import { View, Button } from 'react-native';
import * as Picker from 'expo-image-picker';
import styles from '../styles';

// Компонент для выбора изображения из галереи
const ImagePicker = ({ onImageSelected }) => {
  const pickImage = async () => {
    try {
      // Запрос разрешений на доступ к библиотеке изображений
      const permissionResult = await Picker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        // Если разрешение не предоставлено, отображается предупреждение
        alert("Permission to access camera roll is required!");
        return;
      }

      // Запуск выбора изображения из галереи
      const result = await Picker.launchImageLibraryAsync({
        mediaTypes: Picker.MediaTypeOptions.Images, // Выбор только изображений
        allowsEditing: true, // Пользователь может выбрать изображение и затем обрезать его до желаемого размера
        aspect: [4, 3], // Инструмент обрезки будет ограничен пропорциями 4:3
        quality: 1, // Качество изображения (1 - наилучшее)
      });

      if (!result.canceled) {
        // Если изображение было выбрано, вызывается функция onImageSelected с URI изображения
        onImageSelected(result.uri);
      } else {
        // Логирование отмены выбора изображения
        console.log('User cancelled image picker');
      }
    } catch (error) {
      // Обработка ошибок выбора изображения
      console.error('Failed to pick image', error);
      alert('Failed to pick image');
    }
  };

  return (
    <View>
      <Button title="Выбрать изображение" onPress={pickImage} />
    </View>
  );
};

export default ImagePicker;
