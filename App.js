import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoScreen from './screens/ToDoScreen';
import TaskScreen from './screens/TaskScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ToDoScreen">
        <Stack.Screen name="ToDoScreen" component={ToDoScreen} options={{ title: 'Todo List' }} />
        <Stack.Screen name="TaskScreen" component={TaskScreen} options={{ title: 'Task Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
