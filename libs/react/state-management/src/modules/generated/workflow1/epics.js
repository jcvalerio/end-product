import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, map, mergeMap, tap, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { BaseApiService, addDisplayValue } from '@kleeen/frontend/utils';
import { v4 as uuidv4 } from 'uuid';
import { actions as ActionsStructure } from './slice';
import { actions as ActionsNotifications } from '../../custom/notifications';

const notificationActions = ActionsNotifications.actions;
const actions = ActionsStructure.actions;

/**
 * Add
 * @desc Redux-Observable Epic which allows to add an entity in "workflow1" workflow.
 */
export function addRequest(action$) {
  return action$.pipe(
    ofType(actions.addRequest.type),
    switchMap(({ payload }) => {
      const displayValue = payload.entity[payload.entityKey];
      delete payload.entity[payload.entityKey];

      return BaseApiService.graphqlEntityCRUD(payload.entityKey)
        .create({ entity: { displayValue, ...addDisplayValue(payload.entity), parent: payload.parent } })
        .pipe(
          map((request) => request.response),
          mergeMap((response) => [actions.addSuccess(response)]),
          catchError(BaseApiService.getErrorHandler(`${displayValue}`, 'add')),
          catchError(({ error }) => ActionsObservable.of(actions.addFailure(error))),
        );
    }),
  );
}

/**
 * Bulk Add
 * @desc Redux-Observable Epic which allows to add entities in bulk in "workflow1" workflow.
 */
export function bulkAdd(action$) {
  return action$.pipe(
    ofType(actions.bulkAddRequest.type),
    mergeMap(({ payload }) =>
      forkJoin(
        payload.map(({ entity, entityKey, parent }) => {
          const displayValue = entity[entityKey];
          delete entity[entityKey];

          return BaseApiService.graphqlEntityCRUD(entityKey)
            .create({ entity: { displayValue, ...addDisplayValue(entity), parent } })
            .pipe(catchError(BaseApiService.getErrorHandler(`${displayValue}`, 'bulkAdd')));
        }),
      ).pipe(
        mergeMap((request) => [actions.addSuccess(request.response)]),
        catchError(({ error }) => ActionsObservable.of(actions.addFailure(error))),
      ),
    ),
  );
}

/**
 * Delete
 * @desc Redux-Observable Epic which allows to delete an entity in "workflow1" workflow.
 */
export function deleteRequest(action$) {
  return action$.pipe(
    ofType(actions.deleteRequest.type),
    switchMap((action) =>
      BaseApiService.graphqlEntityCRUD(action.payload.entityKey)
        .delete({
          id: action.payload && action.payload.id,
        })
        .pipe(
          map((request) => request.response),
          mergeMap((response) => [actions.deleteSuccess(response)]),
          catchError(BaseApiService.getErrorHandler(`${action.payload.id}`, 'delete')),
          catchError(({ error }) => ActionsObservable.of(actions.deleteFailure(error))),
        ),
    ),
  );
}

/**
 * Bulk Delete
 * @desc Redux-Observable Epic which allows to delete entities in bulk in "workflow1" workflow.
 */
export function bulkDelete(action$) {
  return action$.pipe(
    ofType(actions.bulkDeleteRequest.type),
    mergeMap(({ payload }) =>
      forkJoin(
        payload.map(({ entityKey, id }) => {
          return BaseApiService.graphqlEntityCRUD(entityKey)
            .delete({ id })
            .pipe(catchError(BaseApiService.getErrorHandler(`${id}`, 'bulkDelete')));
        }),
      ).pipe(
        mergeMap((request) => [actions.deleteSuccess(request.response)]),
        catchError(({ error }) => ActionsObservable.of(actions.deleteFailure(error))),
      ),
    ),
  );
}

/**
 * Safe Delete
 * @desc Redux-Observable Epic which allows to safely delete entities in "workflow1" workflow.
 */
export function safeDelete(action$) {
  return action$.pipe(
    ofType(actions.safeDeleteRequest.type),
    mergeMap((action) =>
      BaseApiService.graphqlEntityCRUD('Company')
        .delete({
          id: action.payload && action.payload.id,
        })
        .pipe(
          map((request) => request.response),
          mergeMap((response) => [actions.safeDeleteSuccess(response)]),
          tap(() => action.payload.goBack()),
          catchError(BaseApiService.getErrorHandler(`${action.payload.id}`, 'safeDelete')),
          catchError(({ error }) => ActionsObservable.of(actions.safeDeleteFailure(error))),
        ),
    ),
  );
}

/**
 * Dispatch Custom Action
 * @desc Redux-Observable Epic which allows to dispatch a custom action in "workflow1" workflow.
 */
export function dispatchCustomAction(action$) {
  return action$.pipe(
    ofType(actions.dispatchCustomAction.type),
    mergeMap((action) => {
      const { params, paramsBasedOnRoute, taskName } = action.payload;
      return BaseApiService.genericDispatchCustomAction(params, paramsBasedOnRoute).pipe(
        map((request) => request.response),
        map((response) => response.data[params.operationName]),
        mergeMap((response) => [
          actions.dispatchCustomActionSuccess({
            widgetId: action.payload.widgetId,
            response,
          }),
          notificationActions.addNotification({
            key: uuidv4(),
            notification: {
              message: {
                message: response?.data?.customMessage,
                variant: response?.data?.success ? 'success' : 'error',
                actions: response?.data?.actions,
                functionName: response?.data?.functionName,
                title: response?.data?.customTitle,
                taskName,
              },
              options: {
                key: uuidv4(),
                persist: true,
              },
            },
          }),
        ]),
        catchError(BaseApiService.getErrorHandler(`${action.payload.widgetId}`, 'dispatchCustomAction')),
        catchError(({ error }) => ActionsObservable.of(actions.dispatchCustomActionFailure(error))),
      );
    }),
  );
}

/**
 * Get
 * @desc Redux-Observable Epic which allows to get an entity in "workflow1" workflow.
 */
export function getRequest(action$) {
  return action$.pipe(
    ofType(actions.getRequest.type),
    mergeMap((action) =>
      BaseApiService.graphqlEntityCRUD(action.payload.entity)
        .read(action.payload.params)
        .pipe(
          map((request) => request.response),
          mergeMap((response) => [actions.getSuccess(response)]),
          catchError(BaseApiService.getErrorHandler(`${action.payload.entity}`, 'get')),
          catchError(({ error }) => ActionsObservable.of(actions.getFailure(error))),
        ),
    ),
  );
}

/**
 * Auto Complete
 * @desc Redux-Observable Epic which allows to auto-complete values in "workflow1" workflow.
 */
export function getAutoCompleteValues(action$) {
  return action$.pipe(
    ofType(actions.getAutoCompleteValues.type),
    mergeMap((action) =>
      BaseApiService.graphqlEntityAutoComplete(action.payload.entity).pipe(
        map((request) => request.response),
        mergeMap((response) => {
          const [resolverResponse] = Object.values(response.data);
          return [
            actions.getAutoCompleteValuesSuccess({ ...resolverResponse, widgetId: action.payload.widgetId }),
          ];
        }),
        catchError(BaseApiService.getErrorHandler(`${action.payload.entity}`, 'getAutoCompleteValues')),
        catchError(({ error }) => ActionsObservable.of(actions.getAutoCompleteValuesFailure(error))),
      ),
    ),
  );
}

/**
 * Get Widget Data
 * @desc Redux-Observable Epic which allows to get the data for a widget in "workflow1" workflow.
 */
export function getWidgetData(action$) {
  return action$.pipe(
    ofType(actions.getData.type),
    mergeMap((action) => {
      if (action.payload.params && action.payload.params.operationName) {
        const { params, paramsBasedOnRoute } = action.payload;
        return BaseApiService.graphqlChartWidgetQuery(params, paramsBasedOnRoute).pipe(
          map((request) => request.response),
          map((response) => response.data[params.operationName]),
          mergeMap((response) => [
            actions.getDataSuccess({
              widgetId: action.payload.widgetId,
              response,
            }),
          ]),
          catchError(BaseApiService.getErrorHandler(`${action.payload.widgetId}`, 'getWidgetData')),
          catchError(({ error }) => ActionsObservable.of(actions.getDataFailure(error))),
        );
      }
      return BaseApiService.genericChartWidgetQuery({
        payload: action.payload || { paramsBasedOnRoute: {} },
        ...action.payload.params,
      }).pipe(
        map((request) => request.response),
        mergeMap((response) => [actions.getDataSuccess({ widgetId: action.payload.widgetId, response })]),
        catchError(BaseApiService.getErrorHandler(`${action.payload.widgetId}`, 'getWidgetData')),
        catchError(({ error }) => ActionsObservable.of(actions.getDataFailure(error))),
      );
    }),
  );
}

/**
 * Update
 * @desc Redux-Observable Epic which allows to update an entity in "workflow1" workflow.
 */
export function updateRequest(action$) {
  return action$.pipe(
    ofType(actions.updateRequest.type),
    mergeMap((action) =>
      BaseApiService.graphqlEntityCRUD(action.payload.entity)
        .update(action.payload.params)
        .pipe(
          map((request) => request.response),
          mergeMap((response) => [actions.updateSuccess(response)]),
          catchError(BaseApiService.getErrorHandler(`${action.payload.entity}`, 'update')),
          catchError(({ error }) => ActionsObservable.of(actions.updateFailure(error))),
        ),
    ),
  );
}

/**
 * Bulk Update
 * @desc Redux-Observable Epic which allows to update entities in bulk in "workflow1" workflow.
 */
export function bulkUpdate(action$) {
  return action$.pipe(
    ofType(actions.bulkUpdateRequest.type),
    mergeMap((action) =>
      forkJoin(
        action.payload.map(({ entity, params }) =>
          BaseApiService.graphqlEntityCRUD(entity)
            .update(params)
            .pipe(catchError(BaseApiService.getErrorHandler(`${entity}`, 'bulkUpdate'))),
        ),
      ).pipe(
        mergeMap((request) => [actions.updateSuccess(request.response)]),
        catchError(({ error }) => ActionsObservable.of(actions.updateFailure(error))),
      ),
    ),
  );
}
