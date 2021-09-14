import GraphQLJSON from 'graphql-type-json';
import { IResolvers } from 'apollo-server-express';

export const baseResolvers: IResolvers = {
  Query: {
    exampleQuery: () => ({
      data: { name: 'this is an example result' },
    }),
  },

  //https://www.apollographql.com/docs/graphql-tools/scalars/
  JSON: GraphQLJSON,
};
