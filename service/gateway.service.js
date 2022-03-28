const GatewayModel = require("../model/gatewayRegistration.model");
const { Op } = require('@sequelize/core');

class GateWayService{
    static async getGatewayByGatewayId(gatewayId){
        console.log(" gateway Id : ",gatewayId);
        try{
            return await GatewayModel.findOne({where:{gatewayId:gatewayId}})
        }catch(error){
            throw error;
        }
    }

    static async updateGatewayPingAlert(gatewayId){
        console.log(" gateway Id Update : ",gatewayId);
         try{
            return GatewayModel.update({pingAlertTime: new Date()},{where:{gatewayId:gatewayId}});
         }catch(error){
            throw error;
         }
       

    }

    static async getGatewayMacId(){
        console.log(" get Gateway macId : ");
        try{
            return await GatewayModel.findAll({where:{'macid' :{[Op.ne]: null}}})
        }catch(error){
            throw error;
        }
       
    }
}

module.exports = GateWayService;