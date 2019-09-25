import {putTodos} from '../dynamodb/models/todos_model';
import { todo, conditions } from '../interfaces/todo';
import { Logger} from '../util/logger';
export const todoPutFunc = async (conditions:conditions,origin:todo)=>{
  try {
    Logger.info(`[todoPutFunc] conditions`,conditions, `origin`, origin);
    let resultTodoPut = await putTodos(conditions,origin);
    return resultTodoPut;
  } catch(err){
    Logger.error(`[todoPutFunc] err`,err);
    throw err;
  }
};