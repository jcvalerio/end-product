import { IResolvers } from 'apollo-server-express';
import { DispatchCustomActionResults } from '../../../types';

export const entityResolvers: IResolvers = {
  Query: {
    // Timestamp Resolvers
    add184335: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api184335.addEntity(input.entity, input.parent),
    }),
    list184335: (_parent, args, { dataSources }) => ({ data: dataSources.api184335.listEntity(args) }),
    get184335: (_parent, { id }, { dataSources }) => ({ data: dataSources.api184335.getEntity(id) }),
    delete184335: (_parent, { id }, { dataSources }) => ({ data: dataSources.api184335.deleteEntity(id) }),
    update184335: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api184335.updateEntity(entity),
    }),
    autoComplete184335: (_parent, params, { dataSources }) => ({
      data: dataSources.api184335.getAutoCompleteValues(params.input),
    }),

    // Company Resolvers
    add184337: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api184337.addEntity(input.entity, input.parent),
    }),
    list184337: (_parent, args, { dataSources }) => ({ data: dataSources.api184337.listEntity(args) }),
    get184337: (_parent, { id }, { dataSources }) => ({ data: dataSources.api184337.getEntity(id) }),
    delete184337: (_parent, { id }, { dataSources }) => ({ data: dataSources.api184337.deleteEntity(id) }),
    update184337: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api184337.updateEntity(entity),
    }),
    autoComplete184337: (_parent, params, { dataSources }) => ({
      data: dataSources.api184337.getAutoCompleteValues(params.input),
    }),

    // Expense Resolvers
    add191065: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api191065.addEntity(input.entity, input.parent),
    }),
    list191065: (_parent, args, { dataSources }) => ({ data: dataSources.api191065.listEntity(args) }),
    get191065: (_parent, { id }, { dataSources }) => ({ data: dataSources.api191065.getEntity(id) }),
    delete191065: (_parent, { id }, { dataSources }) => ({ data: dataSources.api191065.deleteEntity(id) }),
    update191065: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api191065.updateEntity(entity),
    }),
    autoComplete191065: (_parent, params, { dataSources }) => ({
      data: dataSources.api191065.getAutoCompleteValues(params.input),
    }),
  },
};
