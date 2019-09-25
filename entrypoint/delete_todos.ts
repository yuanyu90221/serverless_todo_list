import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import {todoDeleteFunc} from '../controller/deleteTodos';
import {Response} from '../reshandler/reshandler';
import { Logger } from '../util/logger';
import { condition } from '../interfaces/todo';
export const todosDelete: APIGatewayProxyHandler = async (event, _context) => {
  Logger.log(`[todosDelete]pathParemeters`,event.pathParameters,`[todo]httpMethod`,event.httpMethod)
  Logger.log(`[todosDelete]body`, event.body);
  const headers:Object= {"Content-Type":"application/json"};
  try {
    let resultItems = JSON.parse(event.body);
    let inputBody = Array.isArray(resultItems)?resultItems:[resultItems];
    let input:condition[] = [];
    inputBody.forEach((item:condition)=>{
      input.push({
        id: item.id
      });
    }); 
    Logger.info(`[todoPost] input`, input);
    let result = await todoDeleteFunc(input);
    let responseBody = (result!==null)?JSON.stringify(result):"{}";
    let statusCode = 200;
    let obj = new Response(statusCode,responseBody,headers);
    return obj.toJSON();
  } catch (err){
    let message = err.message? err.message:err.toString();
    let statusCode = 500;
    let obj = new Response(statusCode, message, headers);
    return obj.toJSON();
  }
}