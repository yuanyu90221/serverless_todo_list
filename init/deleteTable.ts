import AWS from 'aws-sdk';
import {TABLE_TODOSLIST} from '../config/table';
import {deleteDBTable} from '../dynamodb/init/util';
import { Logger } from '../util/logger';
const dynamoDB = new AWS.DynamoDB();
(async()=>{
  const deleteTableArg = {
    TableName: TABLE_TODOSLIST
  };
  try {
    const deleteResult = await deleteDBTable(dynamoDB, deleteTableArg);
    Logger.log(`deleteResult`, deleteResult);
  } catch(err){
    Logger.error(err);
  }
})();