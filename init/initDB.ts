import AWS from 'aws-sdk';
import {Logger} from '../util/logger'
import {TABLE_TODOSLIST} from '../config/table';
import {listDBTables, createDBTable} from '../dynamodb/init/util';
const dynamoDB = new AWS.DynamoDB();
(async()=>{
  const toDoListArgs = {
    TableName: TABLE_TODOSLIST,
    KeySchema: [
      {
        AttributeName: "id", KeyType: "HASH"
      }
    ],
    AttributeDefinitions: [       
      { AttributeName: "id", AttributeType: "S" } 
    ],
    BillingMode: 'PAY_PER_REQUEST'
  };
  try {
    const createResult = await createDBTable(dynamoDB,toDoListArgs);
    Logger.log(`createResult`, createResult);
    const listResult = await listDBTables(dynamoDB,{});
    Logger.log(`listResult`, listResult);
  } catch(err){
    Logger.error(err);
  }
})();
