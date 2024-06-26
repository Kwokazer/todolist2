import * as Notifications from 'expo-notifications';

// Функция для планирования уведомления
export const scheduleNotification = async (task) => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('You need to grant notification permissions to receive alerts!');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Напоминание",
        body: `Пора выполнить задачу: ${task}`,
      },
      trigger: {
        seconds: 3600,
      },
    });
  } catch (error) {
    console.error('Failed to schedule notification', error);
    alert('Failed to schedule notification');
  }
};
