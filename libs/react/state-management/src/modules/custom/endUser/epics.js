import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { actions as ActionsStructure } from './slice';
import { BaseApiService } from '@kleeen/frontend/utils';
import { actions as EndUserPreferencesActionsStructure } from '../endUserPreferences/slice';

const actions = ActionsStructure.actions;
const endUserPreferencesActions = EndUserPreferencesActionsStructure.actions;

/**
 * Epics/endUser
 * @desc add
 */
export function addEndUser(action$) {
  return action$.pipe(
    ofType(actions.addRequest.type),
    switchMap((action) =>
      BaseApiService.post('endUser', action.payload).pipe(
        map((request) => request.response),
        mergeMap((response) => [actions.addSuccess(response), actions.getRequest()]),
        catchError(BaseApiService.getErrorHandler('endUserEpic', 'add')),
        catchError(({ error }) => ActionsObservable.of(actions.addFailure(error))),
      ),
    ),
  );
}

/**
 * Epics/endUser
 * @desc get
 */
export function getEndUser(action$) {
  return action$.pipe(
    ofType(actions.getRequest.type),
    switchMap((action) => {
      const payload = action.payload || { paramsBasedOnRoute: {} };
      const queryObject = {
        ...payload.paramsBasedOnRoute,
      };
      const queryParams = Object.entries(queryObject)
        .map(
          ([param, value]) =>
            `${param}${payload.type === 'FILTER' && !param.startsWith('_') ? '_like' : ''}=${value}`,
        )
        .join('&');

      return BaseApiService.get(`endUser?${queryParams}`).pipe(
        map((request) => request.response),
        mergeMap((response) => [actions.getSuccess(response)]),
        catchError(BaseApiService.getErrorHandler('endUserEpic', 'get')),
        catchError(({ error }) => ActionsObservable.of(actions.getFailure(error))),
      );
    }),
  );
}

/**
 * Epics/endUser
 * @desc remove
 */
export function removeEndUser(action$) {
  return action$.pipe(
    ofType(actions.removeRequest.type),
    switchMap((action) =>
      BaseApiService.delete(`endUser/${action.payload.id}`, action.payload).pipe(
        map((request) => request.response),
        mergeMap((response) => [actions.removeSuccess(response), actions.getRequest()]),
        catchError(BaseApiService.getErrorHandler('endUserEpic', 'remove')),
        catchError(({ error }) => ActionsObservable.of(actions.removeFailure(error))),
      ),
    ),
  );
}

/**
 * Epics/endUser
 * @desc getEndUserPreferences
 */
export function getEndUserPreferences(action$) {
  return action$.pipe(
    ofType(actions.setCurrentUser.type),
    switchMap((action) => {
      const { payload } = action;
      return [endUserPreferencesActions.getEndUserPreferences(payload)];
    }),
  );
}
