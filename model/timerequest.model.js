'use strict';
const Sequelize = require('sequelize');

const  sequelize  = require('../config/db');

const timeReqDBM = sequelize.define('timeRequests',{
  data: Sequelize.STRING,
  status: { 
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  updatedOn: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
  }
});

module.exports = timeReqDBM;