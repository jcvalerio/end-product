/* eslint @typescript-eslint/camelcase: 0, @typescript-eslint/no-unused-vars: 0, max-lines: 0 */
import { DataListingArgs } from '../../../types';
import { IResolvers } from 'apollo-server-express';

export const widgetResolvers: IResolvers = {
  Query: {
    object_listing_4fcaa21d_c27c_4a13_9e11_fea63a72bcf7: async (
      _parent: any,
      args: { input: DataListingArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.object_listing_4fcaa21d_c27c_4a13_9e11_fea63a72bcf7(
        args.input,
      );

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.object_listing_4fcaa21d_c27c_4a13_9e11_fea63a72bcf7(args.input, {
            ...rest,
          })
        : result;
    },
  },
};
