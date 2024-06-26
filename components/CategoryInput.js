import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles, { colors } from '../styles';

const CategoryInput = ({ onAddCategory, isDarkTheme }) => {
  const [category, setCategory] = useState('');
  const [error, setError] = useState(''); // Состояние для хранения сообщения об ошибке

  const handleAddCategory = () => {
    if (category.length > 0) {
      if (onAddCategory(category)) {
        setCategory('');
        setError('');
      } else {
        setError('Категория с таким именем уже существует');
      }
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
          testID="categoryInputField"
        />
        <TouchableOpacity
          style={isDarkTheme ? styles.darkTheme.addButton : styles.lightTheme.addButton}
          onPress={handleAddCategory}
          testID="addCategoryButton"
        >
          <Text style={isDarkTheme ? styles.darkTheme.addButtonText : styles.lightTheme.addButtonText}>Добавить к</Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    </View>
  );
};

export default CategoryInput;
