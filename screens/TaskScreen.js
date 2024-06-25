import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles, { colors } from '../styles';

// Компонент для отображения и редактирования конкретной задачи
const TaskScreen = ({ route, navigation }) => {
  const { taskKey, tasks, setTasks, isDarkTheme, categories } = route.params;

  useEffect(() => {
    // Логирование текущего списка задач при изменении tasks
    console.log('Tasks in TaskScreen:', tasks);
  }, [tasks]);

  const task = tasks.find((t) => t.key === taskKey);

  const [description, setDescription] = useState(task?.description || '');

  // Функция для удаления задачи с подтверждением
  const handleDeleteTask = useCallback(() => {
    Alert.alert(
      "Удаление задачи",
      "Вы уверены, что хотите удалить эту задачу?",
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { 
          text: "Удалить",
          onPress: () => {
            setTasks((prevTasks) => prevTasks.filter((t) => t.key !== taskKey));
            navigation.goBack();
          }
        }
      ],
      { cancelable: true }
    );
  }, [taskKey, setTasks, navigation]);

  // Функция для сохранения описания задачи
  const handleSaveDescription = useCallback(() => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.key === taskKey ? { ...t, description } : t
      )
    );
    navigation.goBack();
  }, [taskKey, description, setTasks, navigation]);

  // Если задача не найдена, отображаем соответствующее сообщение
  if (!task) {
    return (
      <View style={isDarkTheme ? styles.darkTheme.container : styles.lightTheme.container}>
        <Text style={isDarkTheme ? styles.darkTheme.taskText : styles.lightTheme.taskText}>Задача не найдена</Text>
      </View>
    );
  }

  const category = categories.find((c) => c.key === task.category)?.value || 'Без категории';

  return (
    <View style={isDarkTheme ? styles.darkTheme.container : styles.lightTheme.container}>
      {/* Отображение названия задачи */}
      <Text style={isDarkTheme ? styles.darkTheme.taskText : styles.lightTheme.taskText}>{task.value}</Text>
      {/* Отображение категории задачи */}
      <Text style={isDarkTheme ? styles.darkTheme.taskCategory : styles.lightTheme.taskCategory}>Категория: {category}</Text>
      {/* Поле ввода для добавления описания задачи */}
      <TextInput
        style={isDarkTheme ? [styles.darkTheme.input, styles.darkTheme.inputBorder] : styles.lightTheme.input}
        placeholder="Добавить описание"
        placeholderTextColor={isDarkTheme ? colors.textPrimaryDark : colors.textPrimaryLight}
        value={description}
        onChangeText={setDescription}
      />
      {/* Кнопка для сохранения описания задачи */}
      <TouchableOpacity style={isDarkTheme ? styles.darkTheme.addButton : styles.lightTheme.addButton} onPress={handleSaveDescription}>
        <Text style={isDarkTheme ? styles.darkTheme.addButtonText : styles.lightTheme.addButtonText}>Сохранить</Text>
      </TouchableOpacity>
      {/* Кнопка для удаления задачи */}
      <TouchableOpacity onPress={handleDeleteTask} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Удалить задачу</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskScreen;
