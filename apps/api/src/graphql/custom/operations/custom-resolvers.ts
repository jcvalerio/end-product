import { IResolvers } from 'apollo-server-express';

/**
 * Here you can add your custom resolvers.
 * Please refer to the official documentation about how to add a custom resolver.
 * https://www.apollographql.com/docs/apollo-server/data/resolvers/
 * @example
 * Query: {
 *   myCustomQuery: async (_parent: unknown, args: { input: DataListingArgs }, context) =>
       myCustomQueryFunction(args.input, context),
 * }
 */
export const customResolvers: IResolvers = {
  Query: {
    // Add your custom resolvers HERE.
    myCustomQueryExample: () => ({ data: 'This is an example resolver.' }),
  },
};
