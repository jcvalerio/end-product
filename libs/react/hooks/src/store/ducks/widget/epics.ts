import * as Helpers from '../../helpers';

import { ActionsObservable, Epic } from 'redux-observable';

import { Action } from 'redux';
import { BaseApiService } from '@kleeen/frontend/utils';
import { WidgetActions } from '../../types';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { map } from 'rxjs/operators';
import { parseData } from './widgetDataParser';

export function getData(input: WidgetActions.GetDataInput): any {
  if (isNilOrEmpty(input)) {
    throw SyntaxError('Input has an invalid value');
  }

  const { params, paramsBasedOnRoute } = input;
  const { operationName = 'getData' } = params;

  return BaseApiService.graphqlChartWidgetQuery(params, paramsBasedOnRoute).pipe(
    map((request) => request.response),
    map((response) => response.data[operationName]),
    // TODO: @carreta find a better place/way to parse this data.
    map((data) => parseData(data)),
  );
}

export function generateEpics(
  actions: WidgetActions.Actions,
): { [key: string]: (action$: ActionsObservable<Action>) => Epic } {
  return {
    /**
     * Epics/getWidgetData
     * @desc generic getWidgetData
     */
    getWidgetData(action$: ActionsObservable<Action>): Epic {
      const prepareRequest = (action: WidgetActions.GetData): any => {
        const { payload } = action;
        return getData(payload);
      };

      const onRequestSuccess = (response: any, action: WidgetActions.GetData): Action[] => {
        return [actions.getDataSuccess({ response })];
      };

      const onRequestFailure = (error: Error): Action => {
        return actions.getDataFailure({ response: error });
      };

      return Helpers.doRequest(
        action$,
        actions.getData.type,
        prepareRequest,
        onRequestSuccess,
        onRequestFailure,
      );
    },
    getMoreRowsData(action$: ActionsObservable<Action>): Epic {
      const prepareRequest = (action: WidgetActions.GetData): any => {
        const { payload } = action;
        return getData(payload);
      };

      const onRequestSuccess = (response: any, action: WidgetActions.GetData): Action[] => {
        return [actions.getMoreDataSuccess({ response })];
      };

      const onRequestFailure = (error: Error): Action => {
        return actions.getMoreDataFailure({ response: error });
      };

      return Helpers.doRequest(
        action$,
        actions.getMoreData.type,
        prepareRequest,
        onRequestSuccess,
        onRequestFailure,
      );
    },
  };
}
