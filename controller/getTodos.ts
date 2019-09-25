import {todoFindAll} from '../dynamodb/models/todos_model';
import {Logger} from '../util/logger';
export const todosGet = async ()=>{
  try {
    let resultTodos = await todoFindAll();
    Logger.info(`[todosGet] resultTodos`,resultTodos);
    return resultTodos;
  } catch(err){
    Logger.error(`[todosGet] err`,err);
    throw err;
  }
};