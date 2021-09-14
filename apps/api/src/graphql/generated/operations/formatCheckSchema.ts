import { gql } from 'apollo-server-express';

export const formatCheckSchema = gql`
  enum AccessLevel {
    SHOW
    HIDE
    DISABLED
  }

  type FormatCheckError {
    message: String!
  }

  type FormatCheckResult {
    isValid: Boolean!
    errors: [FormatCheckError!]
  }

  type AccessControlCheckResult {
    accessLevel: AccessLevel!
  }

  input FormatCheckArgs {
    taskName: String!
    widgetId: String!
    formField: String!
    formValue: String!
  }

  input AccessControlCheckArgs {
    taskName: String
    widgetId: String!
    section: String
  }

  extend type Query {
    formatCheck(input: FormatCheckArgs): FormatCheckResult
    accessControlCheck(input: AccessControlCheckArgs): AccessControlCheckResult
  }
`;
