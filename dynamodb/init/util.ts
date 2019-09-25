import { Logger } from "../../util/logger";

export const listDBTables = async(dbInstance, params)=>{
  Logger.log(`[listDBTables] params`, params);
  return new Promise((resolve, reject)=>{
    dbInstance.listTables(params, (err, data)=>{
      if(err) {
        Logger.error(`[listDBTables] err`, err);
        reject(err);
      }
      resolve(data);
    });
  });
};
export const createDBTable = async(dbInstance, params)=>{
  Logger.log(`[createDBTable] params`, params);
  return new Promise((resolve, reject)=>{
    dbInstance.createTable(params, (err, data)=>{
      if(err) {
        Logger.error(`[createDBTable] error`, err);
        reject(err);
      }
      resolve(data);
    });
  });
};

export const deleteDBTable = async(dbInstance, params)=>{
  Logger.log(`[deleteDBTable] params`, params);
  return new Promise((resolve, reject)=>{
    dbInstance.deleteTable(params, (err, data)=>{
      if(err) {
        Logger.error(`[deleteDBTable] error`, err);
        reject(err);
      }
      resolve(data);
    });
  });
};