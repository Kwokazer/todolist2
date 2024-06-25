import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoScreen from './screens/ToDoScreen';
import TaskScreen from './screens/TaskScreen';
import { StatusBar, Switch } from 'react-native';
import styles from './styles';

const Stack = createStackNavigator(); // Создание стека навигации

// Главный компонент приложения
const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false); // Состояние для управления темой (темная или светлая)

  // Функция для переключения темы
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme); // Переключение состояния темы на противоположное
  };

  return (
    // Контейнер навигации
    <NavigationContainer>
      {/* Статус-бар с изменением стиля в зависимости от текущей темы */}
      <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />
      {/* Навигационный стек */}
      <Stack.Navigator
        screenOptions={{
          // Стили для заголовка экрана в зависимости от текущей темы
          headerStyle: {
            backgroundColor: isDarkTheme ? styles.darkTheme.headerContainer.backgroundColor : styles.lightTheme.headerContainer.backgroundColor,
          },
          // Цвет текста заголовка в зависимости от текущей темы
          headerTintColor: isDarkTheme ? styles.darkTheme.headerText.color : styles.lightTheme.headerText.color,
          // Стили текста заголовка
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Экран ToDoScreen */}
        <Stack.Screen
          name="ToDoScreen"
          options={{
            title: 'Todo List', // Заголовок экрана
            // Переключатель темы в заголовке экрана
            headerRight: () => (
              <Switch
                value={isDarkTheme} // Текущее состояние переключателя
                onValueChange={toggleTheme} // Функция для изменения состояния темы
                style={{ marginRight: 10 }} // Стиль для переключателя
              />
            ),
          }}
        >
          {/* Передача пропсов в компонент ToDoScreen */}
          {(props) => <ToDoScreen {...props} isDarkTheme={isDarkTheme} />}
        </Stack.Screen>
        {/* Экран TaskScreen */}
        <Stack.Screen name="TaskScreen">
          {/* Передача пропсов в компонент TaskScreen */}
          {(props) => <TaskScreen {...props} isDarkTheme={isDarkTheme} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;