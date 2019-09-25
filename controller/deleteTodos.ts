import {deleteTodos} from '../dynamodb/models/todos_model';
import { condition } from '../interfaces/todo';
import { Logger} from '../util/logger';
export const todoDeleteFunc = async (input:condition[])=>{
  try {
    Logger.info(`[todoDeleteFunc] input`,input);
    let resultTodoDelete = await deleteTodos(input);
    return resultTodoDelete;
  } catch(err){
    Logger.error(`[todoDeleteFunc] err`,err);
    throw err;
  }
};