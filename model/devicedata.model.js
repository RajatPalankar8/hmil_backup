'use strict';
const Sequelize = require('sequelize');

const  sequelize  = require('../config/db');

const devicedataDBM = sequelize.define('devicedatas',{
    userId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id'
        }
      },
      subUserId: {
        type: Sequelize.INTEGER,defaultValue:0
      },
      device1: Sequelize.INTEGER,
      device1Name: Sequelize.STRING,
      device2: Sequelize.INTEGER,
      device2Name: Sequelize.STRING,
      updatedOn: Sequelize.DATE,
      totTime: {
        type:Sequelize.STRING,
        defaultValue:'00:00:05'
      },
      dataReceivedTime: {
        type:Sequelize.DATE,defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      }
});

module.exports = devicedataDBM;