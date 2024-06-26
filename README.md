# My React Native To-Do App

This is a simple To-Do application built with React Native and Expo.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js (https://nodejs.org/)
- You have installed Expo globally (`npm install -g expo`)
- You have an emulator installed or a physical device to run the app

## Getting Started

Follow these instructions to set up and run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/my-react-native-todo-app.git
cd my-react-native-todo-app
```

### 2. Install dependencies

```bash
npm install
```
### 3. Start the Expo server

```bash
npx expo start
```
This command will start the Expo development server. You should see a QR code in your terminal or browser.

### 4. Run the app

# On a physical device
Download the Expo Go app from the App Store (iOS) or Google Play Store (Android).
Open the Expo Go app and scan the QR code from the terminal or browser.

# On an emulator
Make sure you have an iOS or Android emulator installed and running.
Press `i` to open on iOS emulator or `a` to open on Android emulator from the Expo server page.


- `App.js` - The entry point of the application.
- `components/` - Contains the reusable components of the application.
  - `TaskInput.js` - Component for adding tasks.
  - `TaskItem.js` - Component for displaying a single task.
  - `ImagePicker.js` - Component for picking images.
  - `CategoryInput.js` - Component for adding new categories.
  - `ThemeSwitcher.js` - Component for toggling between dark and light themes.
- `screens/` - Contains the screen components of the application.
  - `ToDoScreen.js` - Screen for displaying and adding tasks.
  - `TaskScreen.js` - Screen for displaying task details.
- `styles/` - Contains the styles for the application.
- `utils/` - Contains utility functions and modules.
  - `Notification.js` - Utility for handling notifications.
- `__tests__/` - Contains test files for the application.
    - `components/`
        - `CategoryInput.test.js` - Test file for CategoryInput component.
        - `TaskItem.test.js` - Test file for TaskItem component.
        - `ThemeSwitcher.test.js` - Test file for ThemeSwitcher component.
    - `screens/`
        - `ToDoScreen.test.js` - Test file for ToDoScreen component.
- `assets/` - Contains the assets like images and icons.

Using AsyncStorage
The application uses `@react-native-async-storage/async-storage` to persist tasks between sessions. Make sure the package is installed by running `npm install`.

Troubleshooting
If you encounter issues, try the following steps:

Ensure all dependencies are installed correctly (`npm install`).
Restart the Expo server (`npx expo start`).
Clear the cache and restart the Expo server (`npx expo start --reset-cache`).
