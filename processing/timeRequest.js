var express = require('express');
var router = express.Router();

var client = require('../mqtt/mqttConfig');
var moment = require('moment');
const TimeRequestService = require('../service/timeRequest.service');
const GatewayService = require('../service/gateway.service')
const DeviceSetting = require('../service/deviceSetting.service');
const VALID_STATUS = 1;
const INVALID_STATUS = 2;
const SLEEP = 2000 // milli seconds


processData();



async function getData() {
    try {
        const timeRequestData = await TimeRequestService.getTimeRequestProcessing();
        return timeRequestData;

    } catch (error) {
        throw error;
    }

}

/**
 * This is the starting or main function for processing
 */
async function processData() {
    try {
        const data = await getData();
        if (!data) {
            return processData();
        }
        const totalProcessing = await  processSingleData(data);
       // await Promise.allSettled(totalProcessing);
        processData();
    } catch (error) {
		console.log("Process Data Called Error ",error);
        processData();
    }
}


async function processSingleData(timeRequestData) {
    try {
        let data = timeRequestData.data
        let gatewayId = data.slice(0, 12);

		console.log(data);
		console.log(gatewayId);
        const gatewayData = await GatewayService.getGatewayByGatewayId(gatewayId);
		console.log(gatewayData);
        if (gatewayData.macId == null) {
            throw new Error(`Gateway Id ${gatewayId} macId is null`);
        }
		 let setting = await DeviceSetting.getSetting(gatewayData.userId)
		 console.log('device Settings: ',setting);
         TimeRequestService.sendDataTime(gatewayData)

        await TimeRequestService.sleep(SLEEP);

         TimeRequestService.sendDataRssi(gatewayData, setting.rssi)

         await TimeRequestService.sleep(SLEEP);

         TimeRequestService.sendDataTxPower(gatewayData, setting.txPower)

         await TimeRequestService.sleep(SLEEP);

         TimeRequestService.sendBufferData(gatewayData, setting.buffer)

         await TimeRequestService.sleep(SLEEP);

         TimeRequestService.sendMaxDuration(gatewayData, setting.durationThreshold)

         await TimeRequestService.sleep(SLEEP);

         await TimeRequestService.sendBuzzerControl(gatewayData,setting.buzzerTime,setting.buzzerConfig)

         await TimeRequestService.sleep(SLEEP);

         TimeRequestService.sendScanningInterval(gatewayData, setting.scanningInterval)

         await TimeRequestService.sleep(SLEEP);

         TimeRequestService.sendMeshId(gatewayData)

         await TimeRequestService.sleep(SLEEP);
		// status 1 processed
          TimeRequestService.updateStatus(timeRequestData.id, VALID_STATUS);

		  await TimeRequestService.sleep(SLEEP);

    } catch (error) {
        console.log(error);
        try {
			// status 2 invalid 
            await TimeRequestService.updateStatus(timeRequestData.id, INVALID_STATUS);
        } catch (error) {
            console.log(error);
        }
    }
}