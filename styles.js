import { StyleSheet } from 'react-native';

const colors = {
  primary: '#6200ee',
  secondary: '#03dac4',
  background: '#f0f0f0',
  textPrimary: '#333',
  textSecondary: '#fff',
  border: '#ddd',
  shadow: '#000',
};

const spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

const fontSizes = {
  small: 14,
  medium: 16,
  large: 20,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.large,
  },
  inputWrapper: {
    marginBottom: spacing.large,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.textSecondary,
    padding: spacing.medium,
    borderRadius: spacing.medium,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: spacing.medium,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: spacing.small,
    paddingLeft: spacing.medium,
    marginRight: spacing.medium,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: spacing.small,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: spacing.small,
    elevation: 2,
  },
  addButtonText: {
    color: colors.textSecondary,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
  list: {
    marginTop: spacing.large,
  },
  taskContainer: {
    backgroundColor: colors.textSecondary,
    padding: spacing.medium,
    marginVertical: spacing.small,
    borderRadius: spacing.medium,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: spacing.medium,
    elevation: 2,
    marginHorizontal: spacing.medium,
  },
  taskText: {
    fontSize: fontSizes.medium,
    color: colors.textPrimary,
  },
});

export default styles;
export { colors, spacing, fontSizes };
