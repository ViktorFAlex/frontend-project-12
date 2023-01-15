export default {
  translation: {
    validators: {
      required: 'Обязательное поле',
      name: 'от 3 до 20 символов',
      password: 'Не менее 6 символов',
      confirmPassword: 'Пароли должны совпадать',
      userExists: 'Такой пользователь уже существует',
      incorrectInputs: 'Неверные имя пользователя или пароль',
      unique: 'Должно быть уникальным',
    },
    elements: {
      signup: 'Регистрация',
      username: 'Имя пользователя',
      nickname: 'Ваш ник',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      toSignup: 'Зарегистрироваться',
      signedUp: 'Уже зарегистрированы?',
      toLogin: 'Войти',
      notFound: 'Страница не найдена',
      youCanNavigate: 'Но вы можете перейти',
      toMainPage: 'на главную страницу',
      noAccount: 'Нет аккаунта?',
      add: 'Добавить',
      remove: 'Удалить',
      rename: 'Переименовать',
      cancel: 'Отменить',
      send: 'Отправить',
      sure: 'Уверены?',
    },
    messages: {
      newMessage: 'Новое сообщение',
      printMessage: 'Введите сообщение...',
      total: '{{count}} сообщение',
      total_few: '{{count}} сообщения',
      total_many: '{{count}} сообщений',
    },
    channels: {
      management: 'Управление каналом',
      add: 'Добавить канал',
      rename: 'Переименовать канал',
      remove: 'Удалить канал',
      name: 'Имя канала',
    },
    toast: {
      loggedOut: 'Вы разлогинились!',
      signedUp: 'Вы успешно зарегистрировались!',
      networkError: 'Ошибка соединения',
      add: 'Канал создан',
      rename: 'Канал переименован',
      remove: 'Канал удалён',
    },
  },
};
