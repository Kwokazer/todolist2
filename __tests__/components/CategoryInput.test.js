import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CategoryInput from '../../components/CategoryInput';

describe('CategoryInput', () => {
  it('should render input correctly', () => {
    const { getByPlaceholderText } = render(<CategoryInput onAddCategory={() => {}} isDarkTheme={false} />);
    
    expect(getByPlaceholderText('Добавить новую категорию')).toBeTruthy();
  });

  it('should call onAddCategory with correct input', () => {
    const onAddCategory = jest.fn();
    const { getByPlaceholderText, getByText } = render(<CategoryInput onAddCategory={onAddCategory} isDarkTheme={false} />);
    
    fireEvent.changeText(getByPlaceholderText('Добавить новую категорию'), 'New Category');
    fireEvent.press(getByText('Добавить к'));
    
    expect(onAddCategory).toHaveBeenCalledWith('New Category');
  });
});
