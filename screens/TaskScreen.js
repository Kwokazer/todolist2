import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles, { colors } from '../styles';

// Компонент для отображения и редактирования конкретной задачи
const TaskScreen = ({ route, navigation }) => {
  const { taskKey, tasks, setTasks, isDarkTheme, categories } = route.params; // Получение параметров маршрута

  useEffect(() => {
    // Логирование текущего списка задач при изменении tasks
    console.log('Tasks in TaskScreen:', tasks);
  }, [tasks]);

  const task = tasks.find((t) => t.key === taskKey); // Поиск задачи по ключу

  const [description, setDescription] = useState(task?.description || ''); // Состояние для хранения описания задачи

  // Функция для удаления задачи
  const handleDeleteTask = () => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.key !== taskKey)); // Фильтрация списка задач для удаления конкретной задачи
    navigation.goBack(); // Возврат на предыдущий экран
  };

  // Функция для сохранения описания задачи
  const handleSaveDescription = () => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.key === taskKey ? { ...t, description } : t
      )
    ); // Обновление задачи с новым описанием
    navigation.goBack(); // Возврат на предыдущий экран
  };

  // Если задача не найдена, отображаем соответствующее сообщение
  if (!task) {
    return (
      <View style={isDarkTheme ? styles.darkTheme.container : styles.lightTheme.container}>
        <Text style={isDarkTheme ? styles.darkTheme.taskText : styles.lightTheme.taskText}>Задача не найдена</Text>
      </View>
    );
  }

  const category = categories.find((c) => c.key === task.category)?.value || 'Без категории'; // Поиск категории задачи

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
