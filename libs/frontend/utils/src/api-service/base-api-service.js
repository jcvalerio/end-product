import {
  httpStatusCode as HTTP_STATUS_CODE,
  buildUrlQueryParams,
  entityMap,
  isNilOrEmpty,
  removeTrailingSlash,
  upperCamelCase,
} from '@kleeen/common/utils';
import {
  autoCompleteQuery,
  createEntityQuery,
  deleteEntityQuery,
  dispatchCustomActionQuery,
  formatCheckQuery,
  getChartDataQuery,
  getEntityQuery,
  getFilterQuery,
  getListingDataQuery,
  getMultiAggWidgetQuery,
  getWorkflowFiltersQuery,
  listEntityQuery,
  updateEntityQuery,
} from './grahpql-operations';
import { from, throwError } from 'rxjs';

import { KSAuth } from '@kleeen/auth';
import { _throw } from 'rxjs/observable/throw';
import { ajax } from 'rxjs/ajax';
import { dissoc } from 'ramda';
import { environment } from '@kleeen/environment';
import querystring from 'querystring';
import { switchMap } from 'rxjs/operators';

const ENDPOINT_URL = environment.settings.middlewareAPI;

const showAlert = (message, baseAction) => {
  console.warn('baseAPi log:', message, baseAction);
  return {
    ...baseAction,
    error: message,
  };
};

export class BaseApiService {
  static get(url, responseType = 'json', params = {}, customUrl = false) {
    const queryParams = buildUrlQueryParams(params);
    return BaseApiService.ajax(
      'GET',
      `${url}${queryParams}`,
      responseType,
      undefined,
      {
        'X-Requested-With': 'XMLHttpRequest',
      },
      ENDPOINT_URL,
      customUrl,
    );
  }

  static delete(
    url,
    body,
    responseType = 'json',
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
    },
    stringify = true,
  ) {
    return BaseApiService.ajax(
      'DELETE',
      url,
      responseType,
      stringify ? querystring.stringify(body) : body,
      { ...headers },
      ENDPOINT_URL,
    );
  }

  static post(
    url,
    body,
    responseType = 'json',
    headers = {
      'Content-Type': 'application/json',
    },
    stringify = true,
  ) {
    return BaseApiService.ajax(
      'POST',
      url,
      responseType,
      stringify ? JSON.stringify(body) : body,
      {
        ...headers,
      },
      ENDPOINT_URL,
    );
  }

  static patch(
    url,
    body,
    responseType = 'json',
    headers = {
      'Content-Type': 'application/json',
    },
    stringify = true,
  ) {
    return BaseApiService.ajax(
      'PATCH',
      url,
      responseType,
      stringify ? JSON.stringify(body) : body,
      {
        ...headers,
      },
      ENDPOINT_URL,
    );
  }

  static ajax(method, url, responseType, body, headers, endpointUrl, customUrl) {
    return from(KSAuth.currentSession()).pipe(
      switchMap((currentSession) => {
        if (!currentSession.isValid()) {
          return _throw({
            error: new Error('Invalid session'),
          });
        }
        const token = currentSession.getIdToken().getJwtToken();
        const operationContext = {
          url: customUrl ? url : `${endpointUrl}/${removeTrailingSlash(url)}`,
          method,
          responseType,
          headers: { token, ...headers },
          body,
        };
        const operationContextUpdated = KSAuth.setContext(operationContext);
        return ajax(operationContextUpdated);
      }),
    );
  }

  static getErrorHandler(className, methodName) {
    return (error) => {
      let actions = [];
      switch (error.status) {
        case HTTP_STATUS_CODE.FORBIDDEN: {
          actions = [
            showAlert('Not Authorized', {
              type: 'primary',
              icon: 'i-flash',
            }),
          ];
          break;
        }
        case HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR: {
          if (error.responseType === 'json' && error.response.errorMessage) {
            actions = [
              showAlert(error.response.errorMessage, {
                type: 'primary',
                icon: 'i-flash',
              }),
            ];
          } else {
            actions = [
              showAlert('Internal Server Error', {
                type: 'primary',
                icon: 'i-flash',
              }),
            ];
          }
          break;
        }
        case HTTP_STATUS_CODE.NOT_FOUND:
        case HTTP_STATUS_CODE.BAD_REQUEST:
        case HTTP_STATUS_CODE.BAD_GATEWAY: {
          actions = [
            showAlert('Something went wrong. Try again or contact your support admin.', {
              type: 'primary',
              icon: 'i-flash',
            }),
          ];
          break;
        }
        case HTTP_STATUS_CODE.SESSION_EXPIRED: {
          actions = [];
          break;
        }
        default:
          break;
      }

      /* eslint-disable no-console */
      console.error(className, methodName, error);
      /* eslint-enable no-console */
      return _throw({
        error,
        errorActions: actions,
      });
    };
  }

  static genericChartWidgetQuery = ({ payload }) => {
    const { baseModel, aggregatedByType, aggregatedBy, aggregation_attribute, aggregation, ...restParams } =
      payload.params;
    const { paramsBasedOnRoute } = payload.paramsBasedOnRoute;

    let aggregationQueries = {};
    if (aggregatedByType) {
      aggregationQueries = {
        [`_${aggregatedByType}`]: aggregatedBy,
        _aggregation_attribute: aggregation_attribute,
        _aggregation: aggregation,
      };
    }

    const queryObject = {
      ...restParams,
      ...paramsBasedOnRoute,
      ...aggregationQueries,
    };

    const queryParams = Object.entries(queryObject)
      .map(
        ([param, value]) =>
          `${param}${payload.type === 'FILTER' && !param.startsWith('_') ? '_like' : ''}=${value}`,
      )
      .join('&');

    return BaseApiService.get(`${baseModel}?${queryParams}`);
  };

  static genericDispatchCustomAction = (params = {}, { paramsBasedOnRoute } = {}) => {
    const { operationName, baseModel, displayName } = params;
    const parsedOperationName = operationName ? operationName : `${displayName}${entityMap[baseModel]}`;

    const variables = {
      input: {
        functionName: displayName,
        entity: baseModel,
        filters: paramsBasedOnRoute,
      },
    };
    const query = dispatchCustomActionQuery(parsedOperationName);

    return BaseApiService.post(`graphql?operationName=${parsedOperationName}`, { query, variables });
  };

  static graphqlChartWidgetQuery = (params = {}, { paramsBasedOnRoute } = {}) => {
    let query, variables;
    const { operationName } = params;
    if (isNilOrEmpty(operationName)) {
      return throwError(new TypeError(`operationName has an invalid value`));
    }
    const isListingOperation = ['widget_config', 'entity_detail', 'summary_slot', 'object_listing'].some(
      (item) => operationName.includes(item),
    );

    if (isListingOperation) {
      variables = {
        input: {
          attributes: params.attributes,
          filters: paramsBasedOnRoute,
          entity: params.baseModel,
          pagination: params.pagination,
          sorting: params.sorting,
        },
      };
      query = getListingDataQuery(operationName);
    } else if (operationName === 'filters') {
      variables = {
        input: {
          attributes: params.attributes ? params.attributes.split(',') : [],
        },
      };
      query = getFilterQuery(operationName);
    } else if (operationName.includes('widget_statistics')) {
      variables = {
        input: {
          attributes: params.value.attributes?.map(({ name }) => name),
          filters: paramsBasedOnRoute,
          entity: params.value.name,
          transformations: params.value.transformations.map(({ transformation }) => transformation),
        },
      };
      query = getMultiAggWidgetQuery(operationName);
    } else if (operationName.includes('workflow_filters')) {
      query = getWorkflowFiltersQuery(operationName);
    } else {
      const { groupBy, value } = params;
      const groupByWithoutFormatType = dissoc('formatType', groupBy);
      const groupByToUse = isNilOrEmpty(groupByWithoutFormatType) ? null : groupByWithoutFormatType;
      variables = {
        input: {
          cardinality: params.cardinality,
          filters: paramsBasedOnRoute,
          groupBy: groupByToUse,
          value: dissoc('formatType', value),
        },
      };
      query = getChartDataQuery(operationName);
    }

    return BaseApiService.post(`graphql?operationName=${operationName}`, { query, variables });
  };

  static commonQueryFactory = (entityName, queryToApply, operationName) => {
    return (params) => {
      const variables = { input: params };
      const parsedNamed = upperCamelCase(entityName);
      const query = queryToApply(entityMap[parsedNamed] || entityMap[entityName] || entityName);

      return BaseApiService.post(`graphql?operationName=${operationName}`, { query, variables });
    };
  };

  static graphqlEntityCRUD = (entityName) => ({
    create: BaseApiService.commonQueryFactory(entityName, createEntityQuery, `create${entityName}`),
    read: (params) => {
      return BaseApiService.commonQueryFactory(entityName, getEntityQuery, `read${entityName}`)(params.id);
    },
    update: BaseApiService.commonQueryFactory(entityName, updateEntityQuery, `update${entityName}`),
    delete: (params) => {
      return BaseApiService.commonQueryFactory(
        entityName,
        deleteEntityQuery,
        `delete${entityName}`,
      )(params.id);
    },
    list: BaseApiService.commonQueryFactory(entityName, listEntityQuery, `list${entityName}`),
  });

  static graphqlEntityAutoComplete = (entityName) => {
    return BaseApiService.commonQueryFactory(
      entityName,
      autoCompleteQuery,
      `autocomplete${entityName}`,
    )({ entity: entityName });
  };

  static graphqlFormatCheck = ({ taskName, widgetId, formField, formValue }) => {
    return BaseApiService.commonQueryFactory(
      null,
      formatCheckQuery,
      'formatCheck',
    )({ taskName, widgetId, formField, formValue });
  };
}
