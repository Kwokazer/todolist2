import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

// экрна для отображения экрана таски, данные получаются из параметров маршрута 
const TaskScreen = ({ route }) => {
  
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.taskText}>{task}</Text>
    </View>
  );
};

export default TaskScreen;
