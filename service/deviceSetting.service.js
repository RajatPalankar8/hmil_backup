const deviceSettingDBM = require('../model/deviceSetting.model');

class DeviceSettingService{
    static async getSetting(userId){
        try{
           return await deviceSettingDBM.findOne({where:{userId}})
        }catch(error){
            throw error;
        }
    }
}


module.exports = DeviceSettingService;