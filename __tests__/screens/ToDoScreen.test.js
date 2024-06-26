import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToDoScreen from '../../screens/ToDoScreen';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('../../utils/Notification', () => ({
  scheduleNotification: jest.fn(),
}));

describe('ToDoScreen Integration', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it('should add and display a new task', async () => {
    const { getByPlaceholderText, getByTestId, getByText, queryByText } = render(<ToDoScreen isDarkTheme={false} />);

    // Добавление новой категории
    fireEvent.changeText(getByPlaceholderText('Добавить новую категорию'), 'Test Category 1');
    fireEvent.press(getByTestId('addCategoryButton'));

    // Убедимся, что категория добавлена
    let categoryElement;
    await waitFor(() => {
      categoryElement = getByTestId(/^category-/);
      expect(categoryElement).toBeTruthy();
    });

    // Попытка добавить категорию с тем же именем
    fireEvent.changeText(getByPlaceholderText('Добавить новую категорию'), 'Test Category 1');
    fireEvent.press(getByTestId('addCategoryButton'));

    // Убедимся, что дубликат не добавлен
    await waitFor(() => {
      expect(queryByText('Категория с таким именем уже существует')).toBeTruthy();
    });

    // Добавление новой задачи
    fireEvent.changeText(getByPlaceholderText('Добавить новую задачу'), 'Test Task 1');
    fireEvent.press(getByTestId('addTaskButton'));

    // Убедимся, что задача добавлена
    await waitFor(() => {
      expect(getByText('Test Task 1')).toBeTruthy();
    });
  });

  it('should remove a task', async () => {
    const { getByPlaceholderText, getByTestId, getByText, queryByTestId } = render(<ToDoScreen isDarkTheme={false} />);

    // Добавление новой категории
    fireEvent.changeText(getByPlaceholderText('Добавить новую категорию'), 'Test Category 2');
    fireEvent.press(getByTestId('addCategoryButton'));

    // Убедимся, что категория добавлена
    let categoryElement;
    await waitFor(() => {
      categoryElement = getByTestId(/^category-/);
      expect(categoryElement).toBeTruthy();
    });

    // Добавление новой задачи
    fireEvent.changeText(getByPlaceholderText('Добавить новую задачу'), 'Test Task 2');
    fireEvent.press(getByTestId('addTaskButton'));

    // Убедимся, что задача добавлена
    await waitFor(() => {
      expect(getByText('Test Task 2')).toBeTruthy();
    });

    // Удаление задачи
    const removeButton = getByTestId(`removeTaskButton-Test Task 2`);
    fireEvent.press(removeButton);

    // Убедимся, что задача удалена
    await waitFor(() => {
      expect(queryByTestId(`task-Test Task 2`)).toBeNull();
    });
  });
});
