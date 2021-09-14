import { gql } from 'apollo-server-express';

export const entitySchema = gql`
  input AutoCompleteByEntityInput {
    entity: String!
    offset: Int
    totalCount: Int
    limit: Int
  }

  input AddEntityParent {
    id: String!
    entity: String
  }

  input AddEntityInput {
    entity: JSON
    parent: AddEntityParent
  }

  input ListEntityInput {
    entity: JSON
  }

  type AutoCompleteOptionShape {
    displayValue: String!
    value: String
    id: String
  }

  type AutoCompleteResponse {
    data: [AutoCompleteOptionShape]
    errorMessage: String
  }

  extend type Query {
    # Timestamp
    add184335(input: AddEntityInput): GenericEntity
    list184335(input: ListEntityInput): GenericEntity
    get184335(id: String): GenericEntity
    delete184335(id: String): GenericEntity
    update184335(entity: JSON): GenericEntity
    autoComplete184335(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # Company
    add184337(input: AddEntityInput): GenericEntity
    list184337(input: ListEntityInput): GenericEntity
    get184337(id: String): GenericEntity
    delete184337(id: String): GenericEntity
    update184337(entity: JSON): GenericEntity
    autoComplete184337(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # Expense
    add191065(input: AddEntityInput): GenericEntity
    list191065(input: ListEntityInput): GenericEntity
    get191065(id: String): GenericEntity
    delete191065(id: String): GenericEntity
    update191065(entity: JSON): GenericEntity
    autoComplete191065(input: AutoCompleteByEntityInput): AutoCompleteResponse
  }
`;
