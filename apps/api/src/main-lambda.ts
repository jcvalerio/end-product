import awsServerlessExpress from 'aws-serverless-express';
import { buildServerlessMode } from '@kleeen/kleeen-api';
import { initServer } from './initServer';
import { waitFoAutoSaveCallbackFromDBManager, tryToCreateDatabase } from './lambda-utils/fake-db-persistance';
import { Express } from 'express';

let appGlobal: Express;
let serverGlobal = null;
const isPersistFakeDB = process.env.PERSIST_FAKE_DB === 'true';

exports.handler = async (event, context) => {
  const { httpMethod, queryStringParameters } = event;
  const operationName = queryStringParameters?.operationName;
  console.log(
    `Request Started -> handler for httpMethod = ${httpMethod} for operationName = ${operationName}`,
  );

  try {
    if (isPersistFakeDB) tryToCreateDatabase(operationName);

    const { server } = await bootstrapServer();
    const response = await awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;

    if (isPersistFakeDB) await waitFoAutoSaveCallbackFromDBManager(operationName, httpMethod);

    return response;
  } catch (err) {
    console.error('error', err);
  }
  return null;
};

async function bootstrapServer(): Promise<{ app: any; server: any }> {
  if (!appGlobal || !serverGlobal) {
    appGlobal = await initServer();
    await buildServerlessMode();
    serverGlobal = await awsServerlessExpress.createServer(appGlobal);
  }
  return { app: appGlobal, server: serverGlobal };
}
