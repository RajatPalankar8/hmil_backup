'use strict';
const Sequelize = require('sequelize');

const  sequelize  = require('../config/db');

const gatewayRegistrationDBM = sequelize.define('gatewayregistrations',{
    userId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id'
        }
      },
      subUserId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      macId: {
        allowNull: true,
        type:Sequelize.STRING
      },
      gatewayId: {
        type:Sequelize.STRING,
        
      },
      gatewayName: Sequelize.STRING,
      meshId: {
        type:Sequelize.INTEGER,
        defaultValue: 0
      },
      currentVersion: Sequelize.STRING,
      nextUpdate: Sequelize.STRING,
      bleVersion: Sequelize.STRING,
      pingAlertTime: Sequelize.DATE
});

module.exports = gatewayRegistrationDBM ;