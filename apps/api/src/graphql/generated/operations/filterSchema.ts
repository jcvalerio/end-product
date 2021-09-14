import { gql } from 'apollo-server-express';

export const filterSchema = gql`
  type FilterResult {
    results: JSON
  }

  input GetFilterArgs {
    attributes: [String]!
  }

  extend type Query {
    filters(input: GetFilterArgs): FilterResult
  }
`;
