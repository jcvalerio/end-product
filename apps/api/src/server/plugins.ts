import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { v4 as uuid } from 'uuid';

/**
 * Logs the queries and its execution time.
 * https://www.apollographql.com/docs/apollo-server/integrations/plugins/#responseforoperation
 */
const LogQueryPlugin: ApolloServerPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  requestDidStart(requestContext) {
    const id = uuid();
    const timeTaken = `${id} - ${'Time taken.'}`;
    console.time(timeTaken);
    console.log(`${id} - Request started! Query:\n ${requestContext.request.query}`);

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      parsingDidStart() {
        console.timeLog(timeTaken, ' - Parsing started!');
      },
      // Fires whenever Apollo Server begins executing the GraphQL operation.
      executionDidStart() {
        console.timeLog(timeTaken, ' - Execution Did Start!');
        return {
          executionDidEnd() {
            console.timeLog(timeTaken, ' - Execution Did End!');
          },
        };
      },
      // Fires whenever Apollo Server is about to send a response
      willSendResponse() {
        console.timeEnd(timeTaken);
      },
    };
  },
};

const logQueries = process.env.LOG_QUERIES === 'true';

export const plugins = logQueries ? [LogQueryPlugin] : [];
