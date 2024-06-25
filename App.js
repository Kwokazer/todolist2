import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoScreen from './screens/ToDoScreen';
import TaskScreen from './screens/TaskScreen';
import { StatusBar, Switch } from 'react-native';
import styles from './styles';

const Stack = createStackNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkTheme ? styles.darkTheme.headerContainer.backgroundColor : styles.lightTheme.headerContainer.backgroundColor,
          },
          headerTintColor: isDarkTheme ? styles.darkTheme.headerText.color : styles.lightTheme.headerText.color,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="ToDoScreen"
          options={{
            title: 'Todo List',
            headerRight: () => (
              <Switch
                value={isDarkTheme}
                onValueChange={toggleTheme}
                style={{ marginRight: 10 }}
              />
            ),
          }}
        >
          {(props) => <ToDoScreen {...props} isDarkTheme={isDarkTheme} />}
        </Stack.Screen>
        <Stack.Screen name="TaskScreen">
          {(props) => <TaskScreen {...props} isDarkTheme={isDarkTheme} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
