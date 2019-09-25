# todo_list

# prevent install

```command
npm i -g serverless
```
# how to create

```command
serverless create --template aws-nodejs-typescript --path todo_list
```

# how to setup

先把 env_init.sh內部的對應的key value填完

接著執行以下
```command
sh env_init.sh
```
# initial DB 
```command
npm run create
```
# how to deploy

```command
serverless deploy
```

***Notice***

if you have multiple credential

you could use export AWS_PROFILE=${profile_key} to change deply root id

## how to test

```command
npm run test
```
## how to remove

```command
npm run remove
```
## how to deleteTable
```command
npm run delete
```