// Handles skill start up, routing and other functions
const Alexa = require('ask-sdk-core');
const AWS = require("aws-sdk");
const ddbAdapter = require('ask-sdk-dynamodb-persistence-adapter');
const persistenceAdapter = require('ask-sdk-s3-persistence-adapter');

const m = require('./src/main'); // path to external files
const hh = require('./src/helperHandlers'); // path to external files
const utih = require('./src/userIntentHandlers'); // path to external files
const sasnh = require('./src/startAtSpecificNumberHandlers'); // path to external files
const plan = require('./src/previouslyLostAtNumberHandlers'); // path to external files
const dhh = require('./src/deleteHistoryHandlers'); // path to external files

// exports handler
exports.handler = Alexa.SkillBuilders.custom()
    .withPersistenceAdapter(
        new ddbAdapter.DynamoDbPersistenceAdapter({
            tableName: process.env.DYNAMODB_PERSISTENCE_TABLE_NAME,
            createTable: false,
            dynamoDBClient: new AWS.DynamoDB({apiVersion: 'latest', region: process.env.DYNAMODB_PERSISTENCE_REGION})
        })
    )
  .addRequestHandlers(
    m.LaunchRequestHandler, 
    m.SessionEndedRequestHandler, 
    hh.HelpIntentHandler, 
    hh.RepeatIntentHandler, 
    hh.CancelAndStopIntentHandler, 
    utih.UserIntentHandler,
    sasnh.StartAtSpecificNumberHandler,
    plan.PreviouslyLostAtNumberHandler,
    dhh.DeleteHistoryHandler)
    .addErrorHandlers(m.ErrorHandler)
  .lambda();