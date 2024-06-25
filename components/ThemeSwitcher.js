import React from 'react';
import { View, Text, Switch } from 'react-native';
import styles from '../styles';

const ThemeSwitcher = ({ isDarkTheme, toggleTheme }) => {
  return (
    <View style={isDarkTheme ? styles.darkTheme.inputWrapper : styles.lightTheme.inputWrapper}>
      <View style={isDarkTheme ? styles.darkTheme.inputContainer : styles.lightTheme.inputContainer}>
        <Text style={isDarkTheme ? styles.darkTheme.taskText : styles.lightTheme.taskText}>Темная тема</Text>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
        />
      </View>
    </View>
  );
};

export default ThemeSwitcher;
