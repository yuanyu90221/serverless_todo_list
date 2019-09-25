import AWS from 'aws-sdk';
import {TABLE_TODOSLIST} from '../../config/table';
import {todo, condition, conditions} from '../../interfaces/todo';
import { Logger } from '../../util/logger';
const docClient= new AWS.DynamoDB.DocumentClient();

export const todoFindAll = async ():Promise<todo[]> => {
  return new Promise((resolve, reject)=>{
    const params = {
      TableName: TABLE_TODOSLIST
    };
    docClient.scan(params, (err, result)=>{
      if(err) {
        reject(err);
      } else {
        const resultArray = result.Items;
        const resultItems: todo[] = [];
        resultArray.forEach((item:todo)=>{
          resultItems.push(item);
        }); 
        console.log(resultItems);
        resolve(resultItems);
      }
    });
  });
};

export const todoFindById = async(condition:condition):Promise<todo|null> => {
  return new Promise((resolve, reject)=>{
    const params = {
      TableName: TABLE_TODOSLIST,
      Key: condition
    };
    docClient.get(params, (err, data)=>{
      if(err) {
        reject(err);
      } else {
        const result = data.Item?data.Item:null;
        console.log(`result`,result);
        if(result!==null) {
          const resultTodo:todo = {
            id: result.id,
            toDoContent: result.toDoContent,
            toDoStatus: result.toDoStatus
          }
          resolve(resultTodo);
        } else resolve(null);
      }
    });
  });
}; 

export const postTodos = async(input:todo[]):Promise<todo[]> =>{
  return new Promise((resolve,reject)=>{
    // parse input into putRequests
    const requestBody = input.map((item:todo)=>{
      return {
        PutRequest: {
          Item: {
            ...item
          }
        }
      }
    });
    Logger.info(`requestBody`,requestBody);
    const params = {
      RequestItems: {
        [`${TABLE_TODOSLIST}`]:[...requestBody]
      }
    };
    docClient.batchWrite(params, (err, data)=>{
      if (err){
        reject(err);
      } else {
        Logger.info(`success`, data);
        resolve(input);
      }
    });  
  });
};

export const putTodos = async(conditions:conditions,origin:todo):Promise<todo|null>=>{
  let updateOne: todo ={
    id: conditions.id,
    toDoContent: (conditions.toDoContent)?conditions.toDoContent:origin.toDoContent,
    toDoStatus: (conditions.toDoStatus)?conditions.toDoStatus:origin.toDoStatus 
  };
  Logger.info(`[putTodos] updateOne`,updateOne);
  return new Promise((resolve,reject)=>{
    const params = {
      TableName: TABLE_TODOSLIST,
      Key: {
        id:updateOne.id
      },
      UpdateExpression: "set toDoContent= :c, toDoStatus= :s ",
      ExpressionAttributeValues:{
        ":c": updateOne.toDoContent,
        ":s": updateOne.toDoStatus
      },
      ReturnValues:"UPDATED_NEW"
    };
    docClient.update(params, (err, data)=>{
      if(err){
        reject(err);
      } else {
        Logger.info(`data`,data);
        if (data) {
          resolve(updateOne);
        }
        else {
          resolve(null);
        }
      }
    });
  });
}

export const deleteTodos = async(input:condition[]):Promise<condition[]> =>{
  return new Promise((resolve,reject)=>{
    // parse input into putRequests
    const requestBody = input.map((item:condition)=>{
      return {
        DeleteRequest: {
          Key: {
            id: item.id
          }
        }
      }
    });
    Logger.info(`requestBody`,requestBody);
    const params = {
      RequestItems: {
        [`${TABLE_TODOSLIST}`]:[...requestBody]
      }
    };
    docClient.batchWrite(params, (err, data)=>{
      if (err){
        reject(err);
      } else {
        Logger.info(`success`, data);
        resolve(input);
      }
    });  
  });
};