import { ApolloServer, AuthenticationError, ServerRegistration } from 'apollo-server-express';
import {
  baseResolvers,
  baseSchema,
  customResolvers,
  customSchema,
  dataSources as generatedDataSources,
  generatedResolvers,
  generatedSchema,
  customDataSources,
} from '../graphql';

import express from 'express';
import { getUser } from '../utils';
import { plugins } from './plugins';

export const configureGraphQLServer = async (app: express.Application): Promise<void> => {
  const typeDefs = [baseSchema, ...generatedSchema, ...customSchema];
  const resolvers = [baseResolvers, ...generatedResolvers, ...customResolvers];
  const dataSources = () => ({
    ...generatedDataSources(),
    ...customDataSources(),
  });

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context: ({ req }) => {
      const { headers = {} } = req;
      // Get the user token from the headers.
      const { token = '', ...restOfHeaders } = headers;

      // try to retrieve a user with the token
      const user = getUser(token);

      if (!user) throw new AuthenticationError('you must be logged in');

      // add the user to the context
      return { user, token, headers: restOfHeaders };
    },
    plugins,
  });

  apolloServer.applyMiddleware({ app, path: '/graphql' } as ServerRegistration);
};
