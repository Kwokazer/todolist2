import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as Picker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles';

const ImagePicker = ({ onImageSelected }) => {
  const pickImage = async () => {
    try {
      const permissionResult = await Picker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const result = await Picker.launchImageLibraryAsync({
        mediaTypes: Picker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        onImageSelected(result.assets[0].uri);
      } else {
        console.log('User cancelled image picker');
      }
    } catch (error) {
      console.error('Failed to pick image', error);
      alert('Failed to pick image');
    }
  };

  return (
    <View style={styles.imagePickerContainer}>
      <TouchableOpacity onPress={pickImage}>
        <Icon name="photo-library" size={30} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

export default ImagePicker;
