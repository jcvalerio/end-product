import { gql } from 'apollo-server-express';

export const baseSchema = gql`
  type GenericEntity {
    data: JSON
  }

  type CustomActionResults {
    data: JSON
  }

  input DataAggregationArgsDataPoint {
    name: String!
    transformation: String!
  }

  input DataAggregationArgs {
    value: DataAggregationArgsDataPoint!
    groupBy: DataAggregationArgsDataPoint
    cardinality: Cardinality!
    filters: JSON
  }

  enum Cardinality {
    MULTI
    SINGLE
  }
`;
