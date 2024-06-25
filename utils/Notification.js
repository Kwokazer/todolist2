import * as Notifications from 'expo-notifications'; // Импорт библиотеки expo-notifications для работы с уведомлениями
import * as Permissions from 'expo-permissions'; // Импорт библиотеки expo-permissions для работы с разрешениями

// Функция для планирования уведомления
export const scheduleNotification = async (task) => {
  // Запрос на разрешение отправки уведомлений
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  
  // Проверка, предоставлено ли разрешение
  if (status !== 'granted') {
    // Если разрешение не предоставлено, выводим предупреждение
    alert('You need to grant notification permissions to receive alerts!');
    return; // Выход из функции, если разрешение не предоставлено
  }

  // Планирование уведомления с помощью функции scheduleNotificationAsync
  await Notifications.scheduleNotificationAsync({
    content: {
      // Заголовок уведомления
      title: "Напоминание",
      // Тело уведомления, содержащее текст задачи
      body: `Пора выполнить задачу: ${task}`,
    },
    trigger: {
      // Триггер для отправки уведомления через 1 час (3600 секунд)
      seconds: 3600,
    },
  });
};
