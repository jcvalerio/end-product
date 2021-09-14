export const getFilterQuery = (operationName: string): string => `
  query getFilters($input: GetFilterArgs) {
    ${operationName}(input: $input) {
      results
    }
  }
`;

export const getChartDataQuery = (operationName: string): string => `
  query getWidget($input: DataAggregationArgs) {
    ${operationName}(input: $input) {
      format
      results
      crossLinking
    }
  }
`;

export const getMultiAggWidgetQuery = (operationName: string): string => `
  query getMultiAggWidget($input: MultiTransFormationArgs){
    ${operationName}(input: $input) {
      format
      results
      transformation
      crossLinking
    }
  }
`;

export const dispatchCustomActionQuery = (operationName: string): string => `
  query dispatchCustomAction($input: CustomActionArgs) {
    ${operationName}(input: $input) {
      data
    }
  }
`;

export const getListingDataQuery = (operationName: string): string => `
  query getListing($input: DataListingArgs) {
    ${operationName}(input: $input) {
      format
      data
      pagination
    }
  }
`;

export const getEntityQuery = (entity: string): string => `
  query getEntity($input: String) {
    get${entity}(id: $input) {
      data
    }
  }
`;

export const deleteEntityQuery = (entity: string): string => `
  query deleteEntity($input: String) {
    delete${entity}(id: $input) {
      data
    }
  }
`;

export const updateEntityQuery = (entity: string): string => `
  query updateEntity($input: JSON) {
    update${entity}(entity: $input) {
      data
    }
  }
`;

export const createEntityQuery = (entity: string): string => `
  query createEntity($input: AddEntityInput) {
    add${entity}(input: $input) {
      data
    }
  }
`;

export const listEntityQuery = (entity) => `
  query listEntity ($input: ListEntityInput) {
    list${entity}(input: $input) {
      data
    }
  }
`;

export const autoCompleteQuery = (entity) => `
query autoComplete($input: AutoCompleteByEntityInput) {
  autoComplete${entity}(input: $input) {
    data {
      displayValue
      value
      id
    }
    errorMessage
  }
}`;

export const formatCheckQuery = () => `
  query formatCheck ($input: FormatCheckArgs) {
    formatCheck(input: $input) {
      isValid
      errors {
        message
      }
    }
  }
`;

export const getWorkflowFiltersQuery = (operationName: string): string => `
  query getWorkflowFilters {
    ${operationName} {
      filters {
        name
        statisticalType
        accessLevel
      }
    }
  }
`;
