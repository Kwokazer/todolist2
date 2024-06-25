import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ImageBackground, Text, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInput from '../components/TaskInput';
import CategoryInput from '../components/CategoryInput';
import TaskItem from '../components/TaskItem';
import { scheduleNotification } from '../utils/Notification'; // Импорт функции уведомлений
import styles, { colors } from '../styles';

const ToDoScreen = ({ navigation, isDarkTheme }) => {
  const [tasks, setTasks] = useState([]); // Локальное состояние для хранения списка задач
  const [categories, setCategories] = useState([]); // Локальное состояние для хранения списка категорий
  const [backgroundImage, setBackgroundImage] = useState(null); // Состояние для хранения URI фона

  useEffect(() => {
    // Загрузка задач из локального хранилища при монтировании компонента
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks', error);
      }
    };
    loadTasks();

    // Загрузка категорий из локального хранилища при монтировании компонента
    const loadCategories = async () => {
      try {
        const storedCategories = await AsyncStorage.getItem('categories');
        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
        }
      } catch (error) {
        console.error('Failed to load categories', error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    // Сохранение задач в локальное хранилище при изменении списка задач
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks', error);
      }
    };
    saveTasks();
  }, [tasks]);

  useEffect(() => {
    // Сохранение категорий в локальное хранилище при изменении списка категорий
    const saveCategories = async () => {
      try {
        await AsyncStorage.setItem('categories', JSON.stringify(categories));
      } catch (error) {
        console.error('Failed to save categories', error);
      }
    };
    saveCategories();
  }, [categories]);

  // Функция добавления задачи
  const addTask = (task, category) => {
    if (task.length > 0 && category) {
      // Добавление задачи в список и планирование уведомления
      setTasks((prevTasks) => [...prevTasks, { key: Math.random().toString(), value: task, category }]);
      scheduleNotification(task); // Планируем уведомление
    }
  };

  // Функция добавления категории
  const addCategory = (category) => {
    if (category.length > 0) {
      // Добавление категории в список
      setCategories((prevCategories) => [...prevCategories, { key: Math.random().toString(), value: category }]);
    }
  };

  // Функция удаления задачи
  const removeTask = (taskKey) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.key !== taskKey));
  };

  // Функция удаления категории и связанных с ней задач
  const removeCategory = (categoryKey) => {
    setCategories((prevCategories) => prevCategories.filter((category) => category.key !== categoryKey));
    setTasks((prevTasks) => prevTasks.filter((task) => task.category !== categoryKey));
  };

  // Рендеринг задач по категориям
  const renderTasksByCategory = () => {
    return categories.map((category) => (
      <View key={category.key} style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <Text style={isDarkTheme ? styles.darkTheme.categoryText : styles.lightTheme.categoryText}>{category.value}</Text>
          <Button title="Удалить" onPress={() => removeCategory(category.key)} color={colors.primary} />
        </View>
        <FlatList
          data={tasks.filter((task) => task.category === category.key)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('TaskScreen', { taskKey: item.key, tasks, setTasks, isDarkTheme, categories })}>
              <TaskItem task={item.value} isDarkTheme={isDarkTheme} onRemove={() => removeTask(item.key)} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
          style={isDarkTheme ? styles.darkTheme.list : styles.lightTheme.list}
        />
      </View>
    ));
  };

  // Получение стиля для фона
  const getBackgroundStyle = () => {
    if (backgroundImage) {
      return { uri: backgroundImage };
    } else {
      return isDarkTheme ? styles.darkTheme.background : styles.lightTheme.background;
    }
  };

  return (
    <ImageBackground source={backgroundImage ? { uri: backgroundImage } : null} style={isDarkTheme ? styles.darkTheme.background : styles.lightTheme.background}>
      <ScrollView style={isDarkTheme ? styles.darkTheme.container : styles.lightTheme.container}>
        <TaskInput onAddTask={addTask} categories={categories} isDarkTheme={isDarkTheme} />
        <CategoryInput onAddCategory={addCategory} isDarkTheme={isDarkTheme} />
        {renderTasksByCategory()}
      </ScrollView>
    </ImageBackground>
  );
};

export default ToDoScreen;
