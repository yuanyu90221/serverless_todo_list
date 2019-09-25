import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import {todosGet} from '../controller/getTodos';
import {Response} from '../reshandler/reshandler';
import { Logger } from '../util/logger';
export const todos: APIGatewayProxyHandler = async (event, _context) => {
  Logger.log(`[todos] httpMethod`, event.httpMethod);
  const headers:Object= {"Content-Type":"application/json"};
  try {
    let result = await todosGet();
    let responseBody = JSON.stringify(result);
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
