import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, ImageBackground, Text, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInput from '../components/TaskInput';
import CategoryInput from '../components/CategoryInput';
import TaskItem from '../components/TaskItem';
import { scheduleNotification } from '../utils/Notification';
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
        alert('Failed to load tasks from storage'); // Уведомление пользователя о неудачной загрузке
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
        alert('Failed to load categories from storage'); // Уведомление пользователя о неудачной загрузке
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
        alert('Failed to save tasks to storage'); // Уведомление пользователя о неудачном сохранении
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
        alert('Failed to save categories to storage'); // Уведомление пользователя о неудачном сохранении
      }
    };
    saveCategories();
  }, [categories]);

  // Функция добавления задачи
  const addTask = useCallback((task, category) => {
    if (task.length > 0 && category) {
      // Добавление задачи в список и планирование уведомления
      setTasks((prevTasks) => [...prevTasks, { key: Math.random().toString(), value: task, category }]);
      scheduleNotification(task); // Планирование уведомления
    }
  }, []);

  // Функция добавления категории
  const addCategory = useCallback((category) => {
    if (category.length > 0) {
      // Проверка на существование категории с таким же именем
      if (!categories.some(cat => cat.value.toLowerCase() === category.toLowerCase())) {
        setCategories((prevCategories) => [...prevCategories, { key: Math.random().toString(), value: category }]);
        return true;
      } else {
        return false;
      }
    }
    return false;
  }, [categories]);
  // Функция удаления задачи
  const removeTask = useCallback((taskKey) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.key !== taskKey));
  }, []);

  const updateTaskImage = useCallback((taskKey, imageUri) => {
    setTasks((prevTasks) => prevTasks.map((task) =>
      task.key === taskKey ? { ...task, image: imageUri } : task
    ));
  }, []);

  // Функция удаления категории и связанных с ней задач
  const removeCategory = useCallback((categoryKey) => {
    setCategories((prevCategories) => prevCategories.filter((category) => category.key !== categoryKey));
    setTasks((prevTasks) => prevTasks.filter((task) => task.category !== categoryKey));
  }, []);

  // Рендеринг задач по категориям
  const renderTasksByCategory = useCallback(() => {
    return categories.map((category) => (
      <View key={category.key} style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <Text
            testID={`category-${category.key}`} // Unique testID for categories
            style={isDarkTheme ? styles.darkTheme.categoryText : styles.lightTheme.categoryText}
          >
            {category.value}
          </Text>
          <Button
            testID={`removeCategoryButton-${category.key}`} // Unique testID for category remove button
            title="Удалить"
            onPress={() => removeCategory(category.key)}
            color={colors.primary}
          />
        </View>
        <FlatList
          data={tasks.filter((task) => task.category === category.key)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('TaskScreen', { taskKey: item.key, tasks, setTasks, isDarkTheme, categories })}>
              <TaskItem
                testID={`task-${item.key}`} // Unique testID for tasks
                task={item}
                isDarkTheme={isDarkTheme}
                onRemove={() => removeTask(item.key)}
                onImageSelected={updateTaskImage} // Новый пропс
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
          style={isDarkTheme ? styles.darkTheme.list : styles.lightTheme.list}
        />
      </View>
    ));
  }, [categories, tasks, isDarkTheme, navigation, removeCategory, removeTask, updateTaskImage]);
  

  // Получение стиля для фона
  const getBackgroundStyle = useCallback(() => {
    if (backgroundImage) {
      return { uri: backgroundImage };
    } else {
      return isDarkTheme ? styles.darkTheme.background : styles.lightTheme.background;
    }
  }, [backgroundImage, isDarkTheme]);

  return (
    <ImageBackground source={backgroundImage ? { uri: backgroundImage } : null} style={getBackgroundStyle()}>
      <ScrollView style={isDarkTheme ? styles.darkTheme.container : styles.lightTheme.container}>
        <TaskInput onAddTask={addTask} categories={categories} isDarkTheme={isDarkTheme} />
        <CategoryInput onAddCategory={addCategory} isDarkTheme={isDarkTheme} />
        {renderTasksByCategory()}
      </ScrollView>
    </ImageBackground>
  );
};

export default ToDoScreen;
