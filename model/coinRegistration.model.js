'use strict';
const Sequelize = require('sequelize');

const  sequelize  = require('../config/db');

const coinRegistrationDBM = sequelize.define('coinregistrations',{
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
        coinId: Sequelize.INTEGER,
        coinName: Sequelize.STRING,
        gatewayId: Sequelize.STRING,
        batteryStatus: {
          type:DataTypes.INTEGER,
          defaultValue:0
        },
        batteryUpdatedOn: Sequelize.DATE,
        coinType: {
          type:Sequelize.STRING,
          defaultValue:'LO'
        }
});

module.exports = coinRegistrationDBM;