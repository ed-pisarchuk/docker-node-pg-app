FROM node:12

# создание директории приложения
WORKDIR /server/

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json /server/

RUN npm install

# Если вы создаете сборку для продакшн
# RUN npm ci --only=production

# копируем исходный код
COPY . /server/

