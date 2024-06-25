import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Импорт иконок из библиотеки react-native-vector-icons
import styles from '../styles'; // Импорт стилей из файла styles

// Компонент для отображения отдельной задачи в списке
const TaskItem = ({ task, isDarkTheme, onRemove }) => {
  return (
    // Внешний контейнер для задачи, который меняет стиль в зависимости от текущей темы (темная или светлая)
    <View style={isDarkTheme ? styles.darkTheme.taskContainer : styles.lightTheme.taskContainer}>
      {/* Текстовый элемент для отображения задачи */}
      <Text style={isDarkTheme ? styles.darkTheme.taskText : styles.lightTheme.taskText}>{task}</Text>
      {/* Кнопка для удаления задачи */}
      <TouchableOpacity onPress={onRemove}>
        {/* Иконка кнопки удаления с использованием библиотеки react-native-vector-icons */}
        <Icon name="close" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
