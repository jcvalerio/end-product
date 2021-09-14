import { useKleeenActions, useKleeenContext, useUrlQueryParams } from './index';

import { FormatProps } from '@kleeen/types';
import camelcase from 'lodash.camelcase';
import { pathOr } from 'ramda';
import { useEffect } from 'react';

type WidgetDataType = {
  entity: {
    [key: string]: { displayValue: string };
  };
  isLoading?: boolean;
};

export function useGetDisplayValue({
  formatType,
  objectValue,
  taskName,
}: {
  formatType?: string;
  objectValue: string;
  taskName: string;
}): { displayValue: string; format: FormatProps } {
  const attributes = [{ name: objectValue, aggregation: 'noAggregation' }];

  const { getRequest } = useKleeenActions(taskName);
  const widgetData: WidgetDataType = useKleeenContext(taskName);
  const { paramsBasedOnRoute } = useUrlQueryParams();

  const getDisplayValue = pathOr('', ['entity', objectValue, 'displayValue']);
  const displayValue = getDisplayValue(widgetData);
  const currentEntityValue = paramsBasedOnRoute[camelcase(objectValue)];

  useEffect(() => {
    getRequest({
      entity: objectValue,
      params: {
        attributes,
        baseModel: objectValue,
        formatType,
        id: currentEntityValue,
        taskName,
        value: currentEntityValue,
      },
    });
  }, [objectValue, taskName]);

  const format = pathOr({}, ['data', 'format', objectValue], widgetData);
  return { displayValue, format };
}
