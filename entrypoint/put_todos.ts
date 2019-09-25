import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import {todoFindByIdFunc} from '../controller/getTodo';
import {todoPutFunc} from '../controller/putTodos';
import {Response} from '../reshandler/reshandler';
import { Logger } from '../util/logger';
export const todosPut: APIGatewayProxyHandler = async (event, _context) => {
  Logger.log(`[todosPut]pathParemeters`,event.pathParameters,`[todo]httpMethod`,event.httpMethod)
  Logger.log(`[todosPut]body`, event.body);
  const headers:Object= {"Content-Type":"application/json"};
  try {
    let {id} = event.pathParameters;
    let resultItems = JSON.parse(event.body);
    let inputBody = resultItems;
    Logger.info(`[todosPut] id`,id, `inputBody`,inputBody);
    let origin = await todoFindByIdFunc({id})
    let result = await todoPutFunc({id,...inputBody},origin);
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
};