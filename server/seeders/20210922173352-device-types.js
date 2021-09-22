'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('deviceTypes', [
            {
                name: 'ble'
            },
            {
                name: 'wifi'
            },
            {
                name: 'locator'
            },
            {
                name: 'wifi_rtt'
            }

        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('deviceTypes', null, {});
    }
};
