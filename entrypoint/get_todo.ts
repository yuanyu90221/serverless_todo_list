import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import {todoFindByIdFunc} from '../controller/getTodo';
import {Response} from '../reshandler/reshandler';
import { Logger } from '../util/logger';
export const todo: APIGatewayProxyHandler = async (event, _context) => {
  Logger.log(`[todo]pathParemeters`,event.pathParameters,`[todo]httpMethod`,event.httpMethod)
  const headers:Object= {"Content-Type":"application/json"};
  try {
    let {id} = event.pathParameters;
    let result = await todoFindByIdFunc({id});
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