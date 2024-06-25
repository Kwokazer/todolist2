import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles, { colors } from '../styles';

const TaskScreen = ({ route, navigation }) => {
  const { taskKey, tasks, setTasks, isDarkTheme, categories } = route.params;

  useEffect(() => {
    console.log('Tasks in TaskScreen:', tasks);
  }, [tasks]);

  const task = tasks.find((t) => t.key === taskKey);

  const [description, setDescription] = useState(task?.description || '');

  const handleDeleteTask = () => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.key !== taskKey));
    navigation.goBack();
  };

  const handleSaveDescription = () => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.key === taskKey ? { ...t, description } : t
      )
    );
    navigation.goBack();
  };

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
      <Text style={isDarkTheme ? styles.darkTheme.taskText : styles.lightTheme.taskText}>{task.value}</Text>
      <Text style={isDarkTheme ? styles.darkTheme.taskCategory : styles.lightTheme.taskCategory}>Категория: {category}</Text>
      <TextInput
        style={isDarkTheme ? [styles.darkTheme.input, styles.darkTheme.inputBorder] : styles.lightTheme.input}
        placeholder="Добавить описание"
        placeholderTextColor={isDarkTheme ? colors.textPrimaryDark : colors.textPrimaryLight}
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={isDarkTheme ? styles.darkTheme.addButton : styles.lightTheme.addButton} onPress={handleSaveDescription}>
        <Text style={isDarkTheme ? styles.darkTheme.addButtonText : styles.lightTheme.addButtonText}>Сохранить</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteTask} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Удалить задачу</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskScreen;
