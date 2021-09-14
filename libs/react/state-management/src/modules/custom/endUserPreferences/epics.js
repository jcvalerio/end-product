import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { actions as ActionsStructure } from './slice';
import { BaseApiService } from '@kleeen/frontend/utils';

const actions = ActionsStructure.actions;

/**
 * Epics/endUserPreferences
 * @desc get
 */
export function getEndUserPreferences(action$) {
  return action$.pipe(
    ofType(actions.getEndUserPreferences.type),
    switchMap((action) => {
      return BaseApiService.get(`endUserPreferences/${action.payload.username}`).pipe(
        map((request) => request.response),
        mergeMap((response) => [actions.getEndUserPreferencesSuccess(response)]),
        catchError(BaseApiService.getErrorHandler('endUserPreferencesEpic', 'get')),
        catchError(({ error }) => ActionsObservable.of(actions.getEndUserPreferencesFailure(error))),
      );
    }),
  );
}

/**
 * Epics/endUserPreferences
 * @desc create
 */
export function createEndUserPreferences(action$) {
  return action$.pipe(
    ofType(actions.createEndUserPreferences.type),
    switchMap((action) => {
      return BaseApiService.post(`EndUserPreferences`, action.payload).pipe(
        map((request) => request.response),
        mergeMap((response) => [actions.saveEndUserPreferencesSuccess(response)]),
        catchError(BaseApiService.getErrorHandler('endUserPreferencesEpic', 'get')),
        catchError(({ error }) => ActionsObservable.of(actions.saveEndUserPreferencesFailure(error))),
      );
    }),
  );
}

/**
 * Epics/endUserPreferences
 * @desc save
 */
export function saveEndUserPreferences(action$) {
  return action$.pipe(
    ofType(actions.saveEndUserPreferences.type),
    switchMap((action) => {
      return BaseApiService.patch(`endUserPreferences`, action.payload).pipe(
        map((request) => request.response),
        mergeMap((response) => [actions.saveEndUserPreferencesSuccess(response)]),
        catchError(BaseApiService.getErrorHandler('endUserPreferencesEpic', 'get')),
        catchError(({ error }) => ActionsObservable.of(actions.saveEndUserPreferencesFailure(error))),
      );
    }),
  );
}
