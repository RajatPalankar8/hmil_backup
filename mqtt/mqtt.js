var express = require('express');
var router = express.Router();
var client = require('../mqtt/mqttConfig');
const TimeRequestService = require('../service/timeRequest.service');
const DataCollectionService = require('../service/datacollection.service');
const userModel = require('../model/user.model')
const GateWayService = require('../service/gateway.service');

const db = require("../config/db");

db.authenticate().then(()=>{
	db.sync().then(()=>{
	  console.log("Success");
	});
  });

client.on('connect', function () {
	client.subscribe('gatewaydata');
  	client.subscribe('safralert');
  	client.subscribe('gatewayversion');
	client.subscribe('pingalert');
	
})
 
client.on('message', function (topic, message) {

	var len = message.toString().length;
	switch (topic) {
    		case 'gatewaydata':
      			return gatewayInsert(message);
    		case 'gatewayversion':
      			return gatewayInsert(message);
    		case 'pingalert':
      			//return gatewayInsert(message);
			return pingAlertInsert(message);
		    case 'safralert':
      			return safralert(message);
  	}
});

async function gatewayInsert(message){
	var msg = message.toString();
	var len = message.toString().length;
	if((len==22) || (len==24) || (len ==30) || (len == 34) || (len == 70) || (len == 32)){
		console.log("gatewayInsert dataCollection: ",msg);
		DataCollectionService.createDataCollection(msg);
	}
}

async function pingAlertInsert(message) {
	var msg = message.toString();
	//console.log("raw==",message)
	//console.log("rawtostring",msg)
	var gatewayId = msg.slice(0,12);
	var queryText=''
	var query=''
	var len = message.toString().length;
	if (len == 24) {
		let result = await GateWayService.getGatewayByGatewayId(gatewayId);
		if(result){
			GateWayService.updateGatewayPingAlert(gatewayId);
		}else{
			console.log("gateway not found");
		}
	}
}


async function safralert(message) {	
	var msg = message.toString();
	
	var len = message.toString().length;
console.log("len", len);
console.log("msg", msg);
	if((len == 22) || (len==24) || (len == 28) || (len == 30) || (len == 34) || (len == 70) || (len == 32))
	{	
		if((msg.slice(12, 26) == '00111111111111') || (msg.slice(12, 28) == '0011111111111111') || (msg.slice(12, 30) == '001111111111111111') || (msg.slice(12, 32) == '00111111111111111111')){
          // timeRequest
			console.log("SafrAlert timeRequest: ",msg);		
			TimeRequestService.createTimeRequest(msg);		
		}
		else {
			// datacollection
			console.log("SafrAlert dataCollection: ",msg);
			DataCollectionService.createDataCollection(msg);
		}
	}
}

module.exports = router;  

