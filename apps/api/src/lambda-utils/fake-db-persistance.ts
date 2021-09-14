import fs from 'fs';

const { KAPI_AUTO_SAVE_INTERVAL = 1000, KAPI_DB_PATH } = process.env;
const TRY_TO_CREATE_DATABASE_OPERATION_NAME = 'tryToCreateDatabase';

function isTryingToCreateTheDatabase(operationName: string): boolean {
  return operationName === TRY_TO_CREATE_DATABASE_OPERATION_NAME;
}

function isAnUpdateRequest(operationName: string): boolean {
  return ['delete', 'update'].some((method: string) =>
    operationName.toLocaleLowerCase().startsWith(method.toLocaleLowerCase()),
  );
}

export function tryToCreateDatabase(operationName: string): void {
  if (!KAPI_DB_PATH) throw 'KAPI_DB_PATH is not defined';

  if (isTryingToCreateTheDatabase(operationName)) {
    fs.mkdirSync(KAPI_DB_PATH, { recursive: true });
    const kapiFilePath = `${KAPI_DB_PATH}kapi.db`;
    fs.closeSync(fs.openSync(kapiFilePath, 'w'));
  }
}

/**
 * Currently our implementation use LokiJS to manage the underlying database
 * in order to keep auto generated synchronized between Lambdas
 * we have to wait for the auto save before continue or finish the Lambda execution.
 *
 * @func waitFoAutoSaveCallbackFromDBManager
 * @param {string} operationName the operation to be use for waiting
 * @param {string} httpMethod http request method type
 *
 * @return {Promise}
 * @see {@link http://techfort.github.io/LokiJS|LokiJS}
 */
export async function waitFoAutoSaveCallbackFromDBManager(
  operationName: string,
  httpMethod: string,
): Promise<void> {
  if (httpMethod.toLocaleLowerCase() === 'options') {
    return Promise.resolve();
  }

  if (isTryingToCreateTheDatabase(operationName) || isAnUpdateRequest(operationName)) {
    const millisecondsToWait = Number(KAPI_AUTO_SAVE_INTERVAL);
    if (!Number.isNaN(millisecondsToWait)) {
      console.log(`Waiting for operationName = ${operationName}`);
      return new Promise((resolve) => setTimeout(resolve, millisecondsToWait + 500));
    }
  }
  return Promise.resolve();
}
