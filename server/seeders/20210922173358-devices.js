'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('devices', [
      {
        userId: 1,
        typeId: 2,
        name: "Celrax Wi-Fi Receiver 150Mbps, 2.4Ghz, 802.11B/G/N USB 2.0 Wireless Wi-Fi Network Adapter",
        mac: '00:26:57:00:1f:02',
        createdAt: new Date()
      },
      {
        userId: 2,
        typeId: 3,
        name: "GPS-трекер X-Keeper Invis DUOS 3d L",
        mac: '00-15-F2-20-4D-6B',
        createdAt: new Date()
      },
      {
        userId: 3,
        typeId: 1,
        name: "SIGUR MR1 BLE",
        mac: '00-75-F2-20-4D-02',
        createdAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('devices', null, {});
  }
};
