const dataCollectionDBM = require('../model/dataCollection.model');

class DataCollectionService{
    static async createDataCollection(msg){
        try{
           return await dataCollectionDBM.create({data:msg});
        }catch(error){
            throw error;
        }
      
    }
}


module.exports = DataCollectionService;