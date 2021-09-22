'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        email: 'sv_pomanova@mail.ru',
        name: 'Романова Светлана Васильевна'
      },
      {
        email: 'gn.bondarenko@gmail.com',
        name: 'Бондаренко Генадий Викторович'
      },
      {
        email: 'ivanov_p@gmail.com',
        name: 'Иванов Павел'
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};