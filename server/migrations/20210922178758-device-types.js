'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('create table public."deviceTypes"\n' +
            '(\n' +
            '    id             bigserial\n' +
            '        constraint "deviceTypesPkey"\n' +
            '            primary key,\n' +
            '    name       varchar(256)                           not null\n' +
            ');')
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('drop table public."deviceTypes";')
    }
};
