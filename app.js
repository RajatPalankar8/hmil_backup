const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const ErrorHandler = require('./error');
const db = require("./config/db");
const timeRequestDBM = require('./model/timerequest.model');
const dataCollectionDBM = require('./model/dataCollection.model');
const deviceregistration = require('./model/deviceRegistration.model');
const deviceSettingDBM = require('./model/deviceSetting.model');
db.authenticate().then(()=>{
  db.sync().then(()=>{
    console.log("Success");
  });
});
 

app.use(cors());

// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/", ()=>{
  console.log("This is root");
});

//no route validation
app.use((req, res, next) => {
    var err = new Error("Route Not Found");
    // @ts-ignore
    err.status = 404;
    next(err);
});


app.use(ErrorHandler.errorHandler);

module.exports = app;