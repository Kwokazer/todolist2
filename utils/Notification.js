import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const scheduleNotification = async (task) => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
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
      seconds: 60, // Уведомление через 1 минуту
    },
  });
};
