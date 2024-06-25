import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Modal, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles, { colors } from '../styles';

const TaskInput = ({ onAddTask, categories, isDarkTheme }) => {
  const [task, setTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.key || '');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (categories.length === 1) {
      setSelectedCategory(categories[0].key);
    }
  }, [categories]);

  const handleAddTask = () => {
    if (task.length > 0 && selectedCategory) {
      onAddTask(task, selectedCategory);
      setTask('');
    }
  };

  return (
    <View style={isDarkTheme ? styles.darkTheme.inputWrapper : styles.lightTheme.inputWrapper}>
      <View style={isDarkTheme ? styles.darkTheme.inputContainer : styles.lightTheme.inputContainer}>
        <TextInput
          style={isDarkTheme ? styles.darkTheme.input : styles.lightTheme.input}
          placeholder="Добавить новую задачу"
          placeholderTextColor={isDarkTheme ? colors.textPrimaryDark : colors.textPrimaryLight}
          value={task}
          onChangeText={setTask}
        />
        {categories.length > 1 ? (
          <>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={isDarkTheme ? styles.darkTheme.pickerButton : styles.lightTheme.pickerButton}>
              <Text style={isDarkTheme ? styles.darkTheme.pickerButtonText : styles.lightTheme.pickerButtonText}>
                {categories.find((cat) => cat.key === selectedCategory)?.value || 'Выберите категорию'}
              </Text>
            </TouchableOpacity>
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Picker
                    selectedValue={selectedCategory}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                  >
                    {categories.map((category) => (
                      <Picker.Item key={category.key} label={category.value} value={category.key} />
                    ))}
                  </Picker>
                  <Button title="Готово" onPress={() => setModalVisible(false)} />
                </View>
              </View>
            </Modal>
          </>
        ) : (
          <Text style={isDarkTheme ? styles.darkTheme.singleCategoryText : styles.lightTheme.singleCategoryText}>
            {categories[0]?.value || 'Добавьте категорию'}
          </Text>
        )}
        <TouchableOpacity style={isDarkTheme ? styles.darkTheme.addButton : styles.lightTheme.addButton} onPress={handleAddTask}>
          <Text style={isDarkTheme ? styles.darkTheme.addButtonText : styles.lightTheme.addButtonText}>Добавить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskInput;
