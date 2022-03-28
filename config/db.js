

// /*Sequelize mysql*/
//var config = require('../config');
var Sequelize = require('sequelize');
//const { mySQLConfig } = require('./index')
var sequelize = new Sequelize(
    'hmil_db',
    'root',
    null, {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    },
    
);



module.exports = sequelize;




// const Sequelize = require("sequelize");

// const sequelize = new Sequelize('hmil_db','root',null,{
//   host: 'localhost',
//   dialect: 'mysql',
//   operatorsAliases: false,

//   pool: {
//     max: 100,
//     min: 1,
//     acquire: 30000,
//     idle: 10000
//   }
// });

// // const db = {};

// // db.Sequelize = Sequelize;
// // db.sequelize = sequelize;

// module.exports = sequelize;

 