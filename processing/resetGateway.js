var express = require('express');
var router = express.Router();
const cron = require("node-cron");
var client = require('../mqtt/mqttConfig');
const GateWayService = require('../service/gateway.service');
const TimeRequestService = require('../service/timeRequest.service');

cron.schedule('0 1 * * *', () => {
    processData().then(() => {
        console.log('success');
    }).catch(err => {
        console.log(err);
    });
});

async function processData() {
    try {
        // const data = await getData();
        const gatewayData = await GateWayService.getGatewayMacId();
        console.log("test",gatewayData)
        if (gatewayData) {
            const data =  gatewayData.map(async (data) => {
                console.log("check here");
                 await TimeRequestService.sendDataToResetGateway(data)
            })
            console.log("data==", data)
            await Promise.allSettled([data]);
        }
    } catch (error) {
        console.log("error in gateway reset file", error)

    }
}
























// //5 seconds change to 1:00 "0 1 * * *"
// cron.schedule("*/5 * * * * *",  function() {

// 	return new Promise((resolve,reject)=>{
// 		//var getquery = "SELECT bleId FROM gatewayRegistration WHERE bleId IS NOT NULL";

// 		var result =  GateWayService.getGatewayMacId();

// 		console.log("Here ",result.macid);

// 		if(result){
// 			result.forEach((data)=> {
// 			var resetmac = data.macid + 'FF00FFFF00';
// 			client.publish('setthreshold',resetmac)
// 			console.log("reset gateway on setthreshold=",resetmac)
// 		})
// 		}
// 		resolve()

// 		// dbConnection.query(getquery, function (err, gatewayResult, fields){
//    		// 	if(err) {
//         //     		    	console.log(err);
// 		// 		reject()
//         //    	   	}
//   		// 	else{
//   		// 		if(gatewayResult.length>=1){
// 		// 			gatewayResult.forEach((data)=> {
// 		// 				var resetBle = data.bleId + 'FF00FFFF00';
// 		// 				client.publish('setthreshold',resetBle)
// 		// 				console.log("reset gateway on setthreshold=",resetBle)
// 		// 			})
//    		// 		}
// 		// 		resolve()
//   		// 	}
// 		// });
// 		resolve();
// 	})
// });





module.exports = router;