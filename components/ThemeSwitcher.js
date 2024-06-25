import React from 'react';
import { View, Text, Switch } from 'react-native';
import styles from '../styles'; // Импорт стилей из файла styles

// Компонент для переключения темы (светлая/темная)
const ThemeSwitcher = ({ isDarkTheme, toggleTheme }) => {
  return (
    // Внешний контейнер, который меняет стиль в зависимости от текущей темы (темная или светлая)
    <View style={isDarkTheme ? styles.darkTheme.inputWrapper : styles.lightTheme.inputWrapper}>
      {/* Внутренний контейнер, который также меняет стиль в зависимости от текущей темы */}
      <View style={isDarkTheme ? styles.darkTheme.inputContainer : styles.lightTheme.inputContainer}>
        {/* Текстовый элемент, который отображает название текущей темы */}
        <Text style={isDarkTheme ? styles.darkTheme.taskText : styles.lightTheme.taskText}>Темная тема</Text>
        {/* Переключатель, который управляет состоянием темы (включение/выключение) */}
        <Switch
          value={isDarkTheme} // Устанавливает текущее состояние переключателя в зависимости от isDarkTheme
          onValueChange={toggleTheme} // Вызывает функцию toggleTheme при изменении состояния переключателя
        />
      </View>
    </View>
  );
};

export default ThemeSwitcher;
