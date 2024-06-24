import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from '../styles';

// компонент для добавления тасок использует локальнео состояние для хранения тасок
const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  // функция для обработки добавления: вызывает функцию с полученной через пропс таской, после добавления поле очищается
  const handleAddTask = () => {
    onAddTask(task);
    setTask('');
  };

  // обернул во вью для предотвращения обрезки тени, onChangeText обновляет состояние при изменение текста, при нажатии на кнопку добавить вызывается функция для добавления
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Добавить новую задачу"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Добавить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskInput;
