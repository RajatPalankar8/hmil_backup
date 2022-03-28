'use strict';
const Sequelize = require('sequelize');

const  sequelize  = require('../config/db');

const devicesettingsDBM = sequelize.define('devicesettings',{
    userId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id'
        }
      },
      dForeignId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'deviceregistrations',
          key: 'id'
        }
      },
      distance: {
          type:Sequelize.INTEGER,
          defaultValue: 0
        },
      rssi: {
          type:Sequelize.STRING,
        defaultValue: 0
     },
      txPower:{ 
          type:Sequelize.STRING,
          defaultValue: 20
        },
      txPowerHex: {
          type:Sequelize.STRING,
          defaultValue: 51
        },
      buffer: {
          type:Sequelize.INTEGER,
          defaultValue: 0
       },
      durationThreshold: {
          type:Sequelize.INTEGER,
          defaultValue: 0
        },
      buzzerTime: {
          type:Sequelize.INTEGER,
          defaultValue: 30
        },
      buzzerConfig: {
          type:Sequelize.INTEGER,
          defaultValue: 1
        },
      scanningInterval: {
          type:Sequelize.INTEGER,
          defaultValue: 5
        },
      maxDistance: {
          type:Sequelize.INTEGER,
          defaultValue: 100
        }
});

module.exports = devicesettingsDBM;