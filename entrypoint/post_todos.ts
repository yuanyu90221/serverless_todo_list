import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import {todoPostFunc} from '../controller/postTodos';
import {Response} from '../reshandler/reshandler';
import { Logger } from '../util/logger';
import { todo } from '../interfaces/todo';
import uuidV4 from 'uuid/v4';
export const todosPost: APIGatewayProxyHandler = async (event, _context) => {
  Logger.log(`[todosPost]pathParemeters`,event.pathParameters,`[todo]httpMethod`,event.httpMethod)
  Logger.log(`[todosPost]body`, event.body);
  const headers:Object= {"Content-Type":"application/json"};
  try {
    let resultItems = JSON.parse(event.body);
    let inputBody = Array.isArray(resultItems)?resultItems:[resultItems];
    let input:todo[] = [];
    inputBody.forEach((item:todo)=>{
      input.push({
        id: uuidV4(),
        toDoContent: item.toDoContent,
        toDoStatus: item.toDoStatus
      });
    }); 
    Logger.info(`[todoPost] input`, input);
    let result = await todoPostFunc(input);
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