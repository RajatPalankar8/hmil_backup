const timeRequestDBM = require('../model/timerequest.model');
var client = require('../mqtt/mqttConfig');
const { Op } = require('@sequelize/core');

class TimeRequestService{


    static async sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    static async createTimeRequest(msg){
        try{
           return await timeRequestDBM.create({data:msg})
        }
        catch(error){
            throw error
        }
    }
     
    static sendDataToResetGateway(gatewayData) {
        try {
            let macId = gatewayData.macId;
            let userId = gatewayData.userId;
            console.log("userId=", userId, "macId=", macId)
            const resetGatewayPubData = macId + '494A000000';
            console.log("resetGatewayPubData", resetGatewayPubData);
            client.publish('setthreshold', resetGatewayPubData);
            return
        } catch (error) {
            throw error
        }
    }

    static async getTimeRequestProcessing(){
        try{
          return await timeRequestDBM.findOne({where:{'status':{[Op.eq]:0}}})
        }
        catch(error){
            throw error
        }
    }

     //sendDataTime
    static sendDataTime(gatewayData) {//copied same from sdct
        let macId = gatewayData.macId;
        const day = new Date();
        const hh = day.getHours()
        const mm = day.getMinutes()
        const ss = day.getSeconds()
        const datetime = new Date();
        const dd = parseInt(datetime.toISOString().slice(8, 10));
        const h = this.decimalToHex(hh)
        const m = this.decimalToHex(mm)
        const s = this.decimalToHex(ss)
        const d = this.decimalToHex(dd)
        console.log("date,hh,mm,ss,dd", datetime, h, m, s, d)
        const dateTimePubData = macId + '00' + h + m + s + d;
        console.log("pubData", dateTimePubData);
        client.publish('settime', dateTimePubData)
    }

    static sendDataRssi(gatewayData, rssi) {
        let userId = gatewayData.userId;
        let macId = gatewayData.macId;
        console.log("userId=", userId, "macId=", macId)
        if (rssi.length == 1) {
            rssi = '0' + rssi
        }
        const rssiPubData = macId + '46' + rssi + '000000';
        console.log("rssiPubData", rssiPubData);
        client.publish('setthreshold', rssiPubData)
        return
    }

    static sendDataTxPower(gatewayData, txPower) {
        let macId = gatewayData.macId;
        let userId = gatewayData.userId;
        console.log("userId=", userId, "macId=", macId)
        const txPowerPubData = macId + '45' + txPower + '000000';
        console.log("txPowerPubData", txPowerPubData);
        client.publish('setthreshold', txPowerPubData)
        return
    }

    static sendBufferData(gatewayData,buffers){

        var buffer = parseInt(buffers)

		if (buffer.toString().length == 1) {
				buffer = 0 + buffer.toString()
		}
        var bufferf = buffer.toString(16).length == 1 ? '0' + buffer.toString(16).toUpperCase() : buffer.toString(16).toUpperCase()
        let macId = gatewayData.macId;
        let userId = gatewayData.userId;
        console.log("userId=", userId, "macId=", macId)
        const bufferPubData = macId + '48' + bufferf + '000000';
        console.log("bufferPubData", bufferPubData);
        client.publish('setthreshold', bufferPubData)
        return
    }

   static sendMaxDuration(gatewayData,durationThreshold){

    var maxDuration = '';
	var maxDuration1 = durationThreshold;
	var maxDuration1 = parseInt(durationThreshold)
	if (maxDuration1 < 5) {
			maxDuration = 0;
		} else {
			maxDuration = maxDuration1 / 5;
		}
			if (maxDuration.toString().length == 1) {
				maxDuration = 0 + maxDuration.toString()
			}
	var maxDurationn = maxDuration.toString(16).length == 1 ? '0' + maxDuration.toString(16).toUpperCase() : maxDuration.toString(16).toUpperCase()

    let macId = gatewayData.macId;
    let userId = gatewayData.userId;
    console.log("userId=", userId, "macId=", macId)
    const maxDurationPubData = macId + '51' + maxDurationn + '000000';
    console.log("maxDurationPubData", maxDurationPubData);
    client.publish('setthreshold', maxDurationPubData)
    return
   }

   static async sendBuzzerControl(gatewayData,dbuzzerTime,dbuzzerConfig){
        let macId = gatewayData.macId;
        let userId = gatewayData.userId;
        var buzzerTime = '';
		var buzzerTime1 = dbuzzerTime;
		var buzzerConfig = dbuzzerConfig
		var buzzerConfig = parseInt(buzzerConfig)
        console.log("userId=", userId, "macId=", macId)
		if (buzzerConfig.toString().length == 1) {
				buzzerConfig = 0 + buzzerConfig.toString()
			}
		var buzzerConfigg = buzzerConfig.toString(16).length == 1 ? '0' + buzzerConfig.toString(16).toUpperCase() : buzzerConfig.toString(16).toUpperCase()

		var buzzerConfigPubData = macId + '44' + buzzerConfigg + '000000';
		client.publish('setthreshold', buzzerConfigPubData)
		console.log("buzzerConfigPubData", buzzerConfigPubData);

        if (buzzerConfig == 5) {
           await  this.sleep(2000);
            var buzzerTime = parseInt(buzzerTime1)

            if (buzzerTime.toString().length == 1) {
                buzzerTime = 0 + buzzerTime.toString()
            }
            var buzzerTimes = buzzerTime.toString(16).length == 1 ? '0' + buzzerTime.toString(16).toUpperCase() : buzzerTime.toString(16).toUpperCase()

            var buzzerTimePubData = macId + '52' + buzzerTimes + '000000';
            client.publish('setthreshold', buzzerTimePubData)
            console.log("buzzerTimePubData", buzzerTimePubData);
            return
       
        }

        return
        
   }

   static sendScanningInterval(gatewayData,scanningInterval){
    let macId = gatewayData.macId;
    let userId = gatewayData.userId;
    console.log("userId=", userId, "macId=", macId)
    var scanningInterval = parseInt(scanningInterval)

    if (scanningInterval.toString().length == 1) {
        scanningInterval = 0 + scanningInterval.toString()
    }

    var scanningIntervall = scanningInterval.toString(16).length == 1 ? '0' + scanningInterval.toString(16).toUpperCase() : scanningInterval.toString(16).toUpperCase()

    var scanningIntervalPubData = macId + '43' + scanningIntervall + '000000';
    client.publish('setthreshold', scanningIntervalPubData)
    console.log("scanningIntervalPubData", scanningIntervalPubData);
    return
   }

   static sendMeshId(gatewayData){

        var meshId = gatewayData.meshId <= 15 ? '0' + parseInt(gatewayData.meshId).toString(16).toUpperCase() : parseInt(gatewayData.meshId).toString(16).toUpperCase();
        let macId = gatewayData.macId;
        let userId = gatewayData.userId;
        console.log("userId=", userId, "macId=", macId)
        var meshpubData = macId + '59' + meshId + '000000';
     console.log("sendmeshId pubData==", meshpubData );
     client.publish('setthreshold', meshpubData )
   }
    
    static decimalToHex(deciInput) {

        let temp = deciInput.toString(16).toUpperCase();
        if (temp.length == 1) {
            temp = '0' + temp
        }
        //let hexData = temp.length = 1 ? '0' + temp : temp;
        return temp
    }


    
    static async updateStatus(timeRequestId,status){
        try{
           return await timeRequestDBM.update({status:status},{where:{id:timeRequestId}})
        }
        catch(error){
            throw error
        }
    }
    
}


module.exports = TimeRequestService;




