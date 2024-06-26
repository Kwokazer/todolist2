import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TaskItem from '../../components/TaskItem';
import { Alert } from 'react-native';

jest.useFakeTimers();

describe('TaskItem', () => {
  it('should render task correctly', () => {
    const task = 'Test Task';
    const { getByText } = render(<TaskItem task={task} isDarkTheme={false} onRemove={() => {}} />);
    
    expect(getByText(task)).toBeTruthy();
  });

  it('should call onRemove when delete button is pressed', () => {
    const task = 'Test Task';
    const onRemove = jest.fn();
    const { getByRole } = render(<TaskItem task={task} isDarkTheme={false} onRemove={onRemove} />);
    
    jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      buttons[1].onPress();
    });

    fireEvent.press(getByRole('button'));
    
    waitFor(() => {
      expect(onRemove).toHaveBeenCalledTimes(1);
    });
  });
});
