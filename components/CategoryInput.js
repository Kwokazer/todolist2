import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles, { colors } from '../styles'; // убедимся, что стили и цвета импортированы правильно

const CategoryInput = ({ onAddCategory, isDarkTheme }) => {
  const [category, setCategory] = useState('');

  const handleAddCategory = () => {
    if (category.length > 0) {
      onAddCategory(category);
      setCategory('');
    }
  };

  return (
    <View style={isDarkTheme ? styles.darkTheme.inputWrapper : styles.lightTheme.inputWrapper}>
      <View style={isDarkTheme ? styles.darkTheme.inputContainer : styles.lightTheme.inputContainer}>
        <TextInput
          style={isDarkTheme ? styles.darkTheme.input : styles.lightTheme.input}
          placeholder="Добавить новую категорию"
          placeholderTextColor={isDarkTheme ? colors.textPrimaryDark : colors.textPrimaryLight}
          value={category}
          onChangeText={setCategory}
        />
        <TouchableOpacity style={isDarkTheme ? styles.darkTheme.addButton : styles.lightTheme.addButton} onPress={handleAddCategory}>
          <Text style={isDarkTheme ? styles.darkTheme.addButtonText : styles.lightTheme.addButtonText}>Добавить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryInput;
