import { Key, useEffect } from 'react';

import { AutocompleteState } from '@kleeen/types';
import { useKleeenActions } from './useKleeenActions';
import { useSelector } from 'react-redux';

export function useKsAutoComplete({
  entity,
  taskName,
  widgetId,
}: {
  entity?: string;
  taskName: string;
  widgetId: Key;
}): AutocompleteState {
  const entityActions = useKleeenActions(taskName);
  const widgetData = useSelector((state) => state[taskName]?.widgets[widgetId]);

  useEffect(() => {
    if (entityActions && entity && widgetId) {
      entityActions.getAutoCompleteValues({ entity, widgetId });
    }
  }, [entityActions, entity, widgetId]);

  const resolvedValues = (widgetData && widgetData.autoCompleteValues) || { isLoading: false, data: [] };

  return resolvedValues;
}
