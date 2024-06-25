import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles';

// Компонент для отображения отдельной задачи в списке
const TaskItem = ({ task, isDarkTheme, onRemove }) => {
  // Функция для показа всплывающего окна подтверждения удаления задачи
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

  return (
    // Внешний контейнер для задачи, который меняет стиль в зависимости от текущей темы (темная или светлая)
    <View style={isDarkTheme ? styles.darkTheme.taskContainer : styles.lightTheme.taskContainer}>
      {/* Текстовый элемент для отображения задачи */}
      <Text style={isDarkTheme ? styles.darkTheme.taskText : styles.lightTheme.taskText}>{task}</Text>
      {/* Кнопка для удаления задачи */}
      <TouchableOpacity onPress={showDeleteConfirmation}>
        {/* Иконка кнопки удаления с использованием библиотеки react-native-vector-icons */}
        <Icon name="close" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
