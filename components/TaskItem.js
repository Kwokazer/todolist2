import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles';

const TaskItem = ({ task, isDarkTheme, onRemove }) => {
  const showDeleteConfirmation = () => {
    Alert.alert(
      "Удаление задачи",
      "Вы уверены, что хотите удалить эту задачу?",
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { text: "Удалить", onPress: onRemove }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={isDarkTheme ? styles.darkTheme.taskContainer : styles.lightTheme.taskContainer}>
      <Text style={isDarkTheme ? styles.darkTheme.taskText : styles.lightTheme.taskText}>{task}</Text>
      <TouchableOpacity
        onPress={showDeleteConfirmation}
        accessibilityRole="button"
        testID={`removeTaskButton-${task}`}
      >
        <Icon name="close" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
