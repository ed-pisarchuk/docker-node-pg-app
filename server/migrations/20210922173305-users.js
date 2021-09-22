'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('create table public.users\n' +
        '(\n' +
        '    id             bigserial\n' +
        '        constraint "usersPkey"\n' +
        '            primary key,\n' +
        '    email       varchar(256)                           not null,\n' +
        '    name       varchar(256)                           not null\n' +
        ');')
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.sequelize.query('drop table public.users;')
  }
};
