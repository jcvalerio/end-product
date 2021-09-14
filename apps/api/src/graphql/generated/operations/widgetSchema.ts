/* eslint-disable max-lines */
import { gql } from 'apollo-server-express';

export const widgetSchema = gql`
  type GraphResult {
    format: JSON
    results: JSON
    crossLinking: JSON
  }

  type MultiTransFormationResults {
    crossLinking: JSON
    format: JSON
    results: JSON
    transformation: String!
  }

  type ListingResult {
    data: JSON
    format: JSON
    pagination: JSON
  }

  input DataListingArgs {
    entity: String!
    attributes: JSON!
    filters: JSON
    pagination: JSON
    sorting: [JSON!]
  }

  input MultiTransFormationArgs {
    attributes: [String]
    entity: String!
    filters: JSON
    transformations: [String!]!
  }

  input CustomActionArgs {
    entity: String!
    functionName: String!
    filters: JSON
  }
  
  type Filters {
    name: String!
    statisticalType: String!
    accessLevel: AccessLevel!
  }

  type WorkflowFiltersResult {
    filters: [Filters!]!
  }

    extend type Query {
          # Widget Summary
    # View: Workflow 1
    # Widget: Table of Company 1
    # Thing: Company
    # Attributes: company
    # Widget type: goal
    object_listing_4fcaa21d_c27c_4a13_9e11_fea63a72bcf7(input: DataListingArgs): ListingResult
    }
  `;
