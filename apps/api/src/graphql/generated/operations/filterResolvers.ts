/* eslint @typescript-eslint/camelcase: 0, @typescript-eslint/no-unused-vars: 0 */
import { IResolvers } from 'apollo-server-express';
import { GetFiltersArgs } from '../../../types';

export const filtersResolvers: IResolvers = {
  Query: {
    filters: async (_parent: any, args: { input: GetFiltersArgs }, { dataSources }) => {
      const result = await dataSources.filtersApi.getFilters(args.input);
      return result === 'not implemented' ? dataSources.filtersFakeApi.getFilters(args.input) : result;
    },
  },
};
