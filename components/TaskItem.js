import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

// компонент для детального отображения таски, внутри контейнер, в компоненте Text отображается текст заданный для таски
const TaskItem = ({ task }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{task}</Text>
    </View>
  );
};

export default TaskItem;
