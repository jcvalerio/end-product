import { VizParams, WidgetState } from '@kleeen/types';

import { WidgetInitialState } from '../store/ducks/widget';
import { getWidgetContextName } from '../helpers';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useEffect } from 'react';
import { useInjectReducerToStore } from './use-inject-reducer-to-store';
import { useKleeenActions } from './useKleeenActions';
import { useKleeenContext } from './useKleeenContext';
import useUrlQueryParams from './useUrlQueryParams';

enum Order {
  asc,
  desc,
  none,
}

export interface WidgetContextProps {
  // TODO: @cafe unify params into the VizParams interface alone
  params: VizParams & Record<string, any>;
  taskName: string;
  widgetId: string;
}

export enum WidgetContextAttributes {
  DisplayValueTitle = 'displayValueTitle',
  ObjectListing = 'object_listing_',
}

export function useWidgetContext({ params, taskName, widgetId }: WidgetContextProps): WidgetState {
  const { filters, operationName } = params;
  const order = params.sorting?.length ? params.sorting[0].sort : Order.none;
  const orderBy = params.sorting?.length ? params.sorting[0].columnName : '';
  const isCustomWidget = isNilOrEmpty(operationName);
  if (isCustomWidget) {
    return WidgetInitialState;
  }
  const widgetContext = getWidgetContextName({ taskName, widgetId });

  const isContextReady = useInjectReducerToStore(widgetContext);

  const entityActions = useKleeenActions(widgetContext);

  const widgetData: WidgetState = useKleeenContext(widgetContext);
  const { status = { version: 0 } } = useKleeenContext(taskName) ?? {};

  const paramsBasedOnRoute = useUrlQueryParams({ extraParamsToInclude: filters, useNestedObjects: true });

  useEffect(() => {
    const canContinue = isContextReady && !isNilOrEmpty(entityActions);
    if (!canContinue) {
      return;
    }

    entityActions.getData({ taskName, widgetId, params, paramsBasedOnRoute });
  }, [
    isContextReady,
    entityActions,
    JSON.stringify(paramsBasedOnRoute),
    status.version,
    params.sorting?.length,
    order,
    orderBy,
  ]);

  return widgetData || WidgetInitialState;
}
