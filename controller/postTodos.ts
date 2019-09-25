import {postTodos} from '../dynamodb/models/todos_model';
import { todo } from '../interfaces/todo';
import { Logger} from '../util/logger';
export const todoPostFunc = async (input:todo[])=>{
  try {
    Logger.info(`[todoPostFunc] input`,input);
    let resultTodoPost = await postTodos(input);
    return resultTodoPost;
  } catch(err){
    Logger.error(`[todoPostFunc] err`,err);
    throw err;
  }
};