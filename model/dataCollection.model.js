'use strict';
const Sequelize = require('sequelize');

const  sequelize  = require('../config/db');

const dataCollectionDBM = sequelize.define('datacollections',{
    data: Sequelize.STRING,
    updatedOn: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    status: { 
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
});

module.exports = dataCollectionDBM;