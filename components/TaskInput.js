import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Modal, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles, { colors } from '../styles';

// Компонент для ввода новой задачи
const TaskInput = ({ onAddTask, categories, isDarkTheme }) => {
  const [task, setTask] = useState(''); // Состояние для хранения текста задачи
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.key || ''); // Состояние для хранения выбранной категории
  const [modalVisible, setModalVisible] = useState(false); // Состояние для управления видимостью модального окна

  // Эффект для установки начальной категории, если она единственная
  useEffect(() => {
    if (categories.length === 1) {
      setSelectedCategory(categories[0].key);
    }
  }, [categories]);

  // Обработчик добавления задачи
  const handleAddTask = () => {
    if (task.length > 0 && selectedCategory) {
      onAddTask(task, selectedCategory); // Вызов функции добавления задачи с текстом и категорией
      setTask(''); // Очистка текстового поля после добавления задачи
    }
  };

  return (
    // Внешний контейнер, который меняет стиль в зависимости от текущей темы (темная или светлая)
    <View style={isDarkTheme ? styles.darkTheme.inputWrapper : styles.lightTheme.inputWrapper}>
      {/* Внутренний контейнер для ввода задачи */}
      <View style={isDarkTheme ? styles.darkTheme.inputContainer : styles.lightTheme.inputContainer}>
        {/* Поле ввода для текста задачи */}
        <TextInput
          style={isDarkTheme ? styles.darkTheme.input : styles.lightTheme.input}
          placeholder="Добавить новую задачу"
          placeholderTextColor={isDarkTheme ? colors.textPrimaryDark : colors.textPrimaryLight}
          value={task}
          onChangeText={setTask}
          testID="taskInputField"
        />
        {/* Если категорий больше одной, отображаем кнопку выбора категории и модальное окно */}
        {categories.length > 1 ? (
          <>
            {/* Кнопка для открытия модального окна с выбором категории */}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={isDarkTheme ? styles.darkTheme.pickerButton : styles.lightTheme.pickerButton}>
              <Text style={isDarkTheme ? styles.darkTheme.pickerButtonText : styles.lightTheme.pickerButtonText}>
                {categories.find((cat) => cat.key === selectedCategory)?.value || 'Выберите категорию'}
              </Text>
            </TouchableOpacity>
            {/* Модальное окно для выбора категории */}
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {/* Компонент Picker для выбора категории */}
                  <Picker
                    selectedValue={selectedCategory}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                  >
                    {categories.map((category) => (
                      <Picker.Item key={category.key} label={category.value} value={category.key} />
                    ))}
                  </Picker>
                  {/* Кнопка для закрытия модального окна */}
                  <Button title="Готово" onPress={() => setModalVisible(false)} />
                </View>
              </View>
            </Modal>
          </>
        ) : (
          // Если категория одна или их нет, отображаем текст с категорией или предложением добавить категорию
          <Text style={isDarkTheme ? styles.darkTheme.singleCategoryText : styles.lightTheme.singleCategoryText}>
            {categories[0]?.value || 'Добавьте категорию'}
          </Text>
        )}
        {/* Кнопка для добавления задачи */}
        <TouchableOpacity
          style={isDarkTheme ? styles.darkTheme.addButton : styles.lightTheme.addButton}
          onPress={handleAddTask}
          testID="addTaskButton"
        >
          <Text style={isDarkTheme ? styles.darkTheme.addButtonText : styles.lightTheme.addButtonText}>Добавить з</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskInput;
