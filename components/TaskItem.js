import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from './ImagePicker';
import styles from '../styles';

const TaskItem = ({ task, isDarkTheme, onRemove, onImageSelected }) => {
  const [backgroundImage, setBackgroundImage] = useState(task.image || null);

  const showDeleteConfirmation = () => {
    Alert.alert(
      "Удаление задачи",
      "Вы уверены, что хотите удалить эту задачу?",
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { text: "Удалить", onPress: onRemove }
      ],
      { cancelable: true }
    );
  };

  const handleImageSelected = (uri) => {
    setBackgroundImage(uri);
    onImageSelected(task.key, uri);
  };

  return (
    <ImageBackground source={{ uri: backgroundImage }} style={styles.taskImage}>
      <View style={isDarkTheme ? styles.darkTheme.taskContainer : styles.lightTheme.taskContainer}>
        <Text style={isDarkTheme ? styles.darkTheme.taskText : styles.lightTheme.taskText}>{task.value}</Text>
        <ImagePicker onImageSelected={handleImageSelected} />
        <TouchableOpacity
          onPress={showDeleteConfirmation}
          accessibilityRole="button"
          testID={`removeTaskButton-${task.value}`}
        >
          <Icon name="close" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default TaskItem;
