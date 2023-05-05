import axios from 'axios';

let token = null;

// Отправляем запрос на сервер для аутентификации пользователя и получения JWT
axios.post('/login', {
  username: 'user1',
  password: 'password1'
}).then(response => {
  token = response.data.token;
});

// Отправляем запрос на сервер для получения данных с авторизационным заголовком с JWT
axios.get('/data', {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(response => {
  const data = response.data.data;

  console.log(data)
  
  // Обрабатываем полученные данные
  // ...
});