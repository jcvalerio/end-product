import { DocumentNode } from 'graphql';
import { IResolvers } from 'apollo-server-express';
import { customResolvers as resolvers } from './custom-resolvers';
import { customSchema as schema } from './custom-schema';

export const customResolvers: IResolvers[] = [resolvers];

export const customSchema: DocumentNode[] = [schema];
