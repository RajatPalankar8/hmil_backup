'use strict';
const Sequelize = require('sequelize');

const  sequelize  = require('../config/db');

const deviceRegistrationDBM = sequelize.define('deviceregistrations',{
    userId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id'
        }
      },
      deviceName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      subUserId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      coinId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      distance: Sequelize.INTEGER,
      batteryStatus: Sequelize.INTEGER,
      batteryUpdatedOn: Sequelize.DATE,
      dataReceivedTime: Sequelize.DATE
});

module.exports = deviceRegistrationDBM;