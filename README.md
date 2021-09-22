### Для сборки контейнеров в корне проекта выполнить команду: docker-compose up 

### Структура БД
Для просмотра струкутуры в БД запустится докер с образом "adminer" на http://localhost:8080/
Данные для входа:
  - движок: PostgreSQL;
  - сервер: "db";
  - имя пользователя: "postgres";
  - пароль: "docker";
  - база данных: "nav_test"


### Описание АПИ

Запрос на получение типов устройств:
GET http://localhost:3000/device-types/

Запрос на получение пользователей:
GET http://localhost:3000/user/

Запросы на получение устройств:
GET http://localhost:3000/device/
GET http://localhost:3000/device/:id

Запрос на создание устройства:
POST http://localhost:3000/device/
Пример тела запроса:
{
    "user_email": "ivanov_p@gmail.com",
    "mac": "75-F2-20-4D-",
    "type_id": 2,
    "name": "IEEE 802.11"
}

Запрос на удаление устройства:
DELETE http://localhost:3000/device/:id
