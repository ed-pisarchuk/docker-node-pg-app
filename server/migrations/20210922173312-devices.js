'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('create table public.devices\n' +
        '(\n' +
        '    id             bigserial\n' +
        '        constraint "devicesPkey"\n' +
        '            primary key,\n' +
        '    "typeId"       integer                           not null,\n' +
        '    mac       varchar(256)                           not null,\n' +
        '    name       varchar(256)                           not null,\n' +
        '    "userId"    integer                           not null,\n' +
        '    "createdAt"    timestamp with time zone default now() not null,\n' +
        '    "updatedAt"    timestamp with time zone default now()' +
        ');')
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.sequelize.query('drop table public.devices;')
  }
};
