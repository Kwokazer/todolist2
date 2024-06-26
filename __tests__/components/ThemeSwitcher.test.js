import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ThemeSwitcher from '../../components/ThemeSwitcher';

describe('ThemeSwitcher', () => {
  it('should render switch correctly', () => {
    const { getByText } = render(<ThemeSwitcher isDarkTheme={false} toggleTheme={() => {}} />);
    
    expect(getByText('Темная тема')).toBeTruthy();
  });

  it('should call toggleTheme when switch is toggled', () => {
    const toggleTheme = jest.fn();
    const { getByRole } = render(<ThemeSwitcher isDarkTheme={false} toggleTheme={toggleTheme} />);
    
    fireEvent(getByRole('switch'), 'onValueChange');
    
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
