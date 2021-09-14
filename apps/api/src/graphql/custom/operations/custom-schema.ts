import { gql } from 'apollo-server-express';

/**
 * Here you can add your custom schema.
 * Please refer to the official documentation about how to add your custom schema.
 * https://www.apollographql.com/docs/apollo-server/schema/schema/
 */
export const customSchema = gql`
  extend type Query {
    # Add your custom schema HERE.
    myCustomQueryExample: String
  }
`;
