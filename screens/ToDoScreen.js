import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInput from '../components/TaskInput';
import TaskItem from '../components/TaskItem';
import ImagePicker from '../components/ImagePicker';
import styles from '../styles';

// экран для отображения и добавления тасок
const ToDoScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]); // локальное состояние для хранения списка задач
  const [backgroundImage, setBackgroundImage] = useState(null); // состояние для хранения URI фона

  useEffect(() => {
    // загрузка задач из локального хранилища при монтировании компонента
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
  }, []);

  useEffect(() => {
    // сохранение задач в локальное хранилище при изменении списка задач
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks', error);
      }
    };
    saveTasks();
  }, [tasks]);

  const addTask = (task) => {
    if (task.length > 0) {
      setTasks((prevTasks) => [...prevTasks, { key: Math.random().toString(), value: task }]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TaskScreen', { task: item.value })}>
      <TaskItem task={item.value} />
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={backgroundImage ? { uri: backgroundImage } : null} style={styles.background}>
      <View style={styles.container}>
        <TaskInput onAddTask={addTask} />
        <ImagePicker onImageSelected={setBackgroundImage} />
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          style={styles.list}
        />
      </View>
    </ImageBackground>
  );
};

export default ToDoScreen;
