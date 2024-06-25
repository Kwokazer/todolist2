import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles, { colors } from '../styles';

// Компонент для ввода новой категории
const CategoryInput = ({ onAddCategory, isDarkTheme }) => {
  const [category, setCategory] = useState(''); // Состояние для хранения текста новой категории

  // Обработчик добавления категории
  const handleAddCategory = () => {
    if (category.length > 0) {
      onAddCategory(category); // Вызов функции добавления категории с текстом категории
      setCategory(''); // Очистка текстового поля после добавления категории
    }
  };

  return (
    // Внешний контейнер, который меняет стиль в зависимости от текущей темы (темная или светлая)
    <View style={isDarkTheme ? styles.darkTheme.inputWrapper : styles.lightTheme.inputWrapper}>
      {/* Внутренний контейнер для ввода категории */}
      <View style={isDarkTheme ? styles.darkTheme.inputContainer : styles.lightTheme.inputContainer}>
        {/* Поле ввода для текста новой категории */}
        <TextInput
          style={isDarkTheme ? styles.darkTheme.input : styles.lightTheme.input}
          placeholder="Добавить новую категорию"
          placeholderTextColor={isDarkTheme ? colors.textPrimaryDark : colors.textPrimaryLight}
          value={category}
          onChangeText={setCategory}
        />
        {/* Кнопка для добавления категории */}
        <TouchableOpacity style={isDarkTheme ? styles.darkTheme.addButton : styles.lightTheme.addButton} onPress={handleAddCategory}>
          <Text style={isDarkTheme ? styles.darkTheme.addButtonText : styles.lightTheme.addButtonText}>Добавить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryInput;
