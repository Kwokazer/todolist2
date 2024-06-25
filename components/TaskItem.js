import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles';

const TaskItem = ({ task, isDarkTheme, onRemove }) => {
  return (
    <View style={isDarkTheme ? styles.darkTheme.taskContainer : styles.lightTheme.taskContainer}>
      <Text style={isDarkTheme ? styles.darkTheme.taskText : styles.lightTheme.taskText}>{task}</Text>
      <TouchableOpacity onPress={onRemove}>
        <Icon name="close" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
