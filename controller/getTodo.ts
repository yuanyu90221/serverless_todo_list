import {todoFindById} from '../dynamodb/models/todos_model';
import { condition } from '../interfaces/todo';
import { Logger} from '../util/logger';
export const todoFindByIdFunc = async (condition:condition)=>{
  try {
    Logger.info(`[todoFindByIdFunc] condition`,condition);
    let resultTodo = await todoFindById(condition);
    return resultTodo;
  } catch(err){
    Logger.error(`[todoFindByIdFunc] err`,err);
    throw err;
  }
};