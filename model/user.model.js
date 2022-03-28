'use strict';
const Sequelize = require('sequelize');

const  sequelize  = require('../config/db');

const userDBM = sequelize.define('users',{
    userName: {
        type:Sequelize.STRING,
        allowNull: false
      },
      password: {
        type:Sequelize.STRING,
        allowNull: false
      },
      logo: {
        type:Sequelize.STRING,
        allowNull: false,
        defaultValue: 'logo.jpg'
      },
      isDeleted: {
        type:Sequelize.STRING,
        allowNull: false,
        defaultValue : 'N'
      },
      expiryDate: Sequelize.STRING,
      otp: Sequelize.STRING,
      otpUpdatedOn:{
        type:Sequelize.STRING,
        allowNull: false,
        defaultValue:'0000-00-00 00:00:00'
      },
      userZone:{
        type:Sequelize.STRING,
        allowNull: false,
        defaultValue : '+00:00'
      },
      loginAttempt:{
        type:Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
      },
});

module.exports = userDBM;