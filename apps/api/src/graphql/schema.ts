import { gql } from 'apollo-server-express';

export const baseSchema = gql`
  scalar JSON

  type exampleQuery {
    data: JSON
  }

  type Query {
    exampleQuery: exampleQuery
  }
`;
