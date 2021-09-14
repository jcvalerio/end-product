import { AccessControlCheckArgs, FormatCheckArgs } from '../../../types';

/* eslint @typescript-eslint/camelcase: 0, @typescript-eslint/no-unused-vars: 0 */
import { IResolvers } from 'apollo-server-express';

export const formatCheckResolvers: IResolvers = {
  Query: {
    formatCheck: async (_parent: any, args: { input: FormatCheckArgs }, { dataSources }) => {
      const result = await dataSources.formatCheckApi.formatCheck(args.input);
      return result === 'not implemented' ? dataSources.formatCheckFakeApi.formatCheck(args.input) : result;
    },

    accessControlCheck: async (_parent: any, args: { input: AccessControlCheckArgs }, { dataSources }) => {
      const result = await dataSources.formatCheckApi.accessControlCheck(args.input);
      return result === 'not implemented'
        ? dataSources.formatCheckFakeApi.accessControlCheck(args.input)
        : result;
    },
  },
};
