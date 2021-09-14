import { OnInputChangeEvent, RegisterEvents, WidgetProps } from '@kleeen/types';
import { useKleeenActions, useWidgetContext } from '@kleeen/react/hooks';

import { KsConfigTable } from '@kleeen/react/components';
import { ReactElement } from 'react';

interface ConfigTableWidgetProps extends WidgetProps {
  onInputChange: OnInputChangeEvent;
  registerEvents: RegisterEvents;
}

export function ConfigTableWidget({
  actions,
  attributes,
  params,
  registerEvents,
  taskName,
  widgetId,
  ...props
}: ConfigTableWidgetProps): ReactElement {
  const entityActions = useKleeenActions(taskName);
  const widgetData = useWidgetContext({
    taskName,
    widgetId,
    params: { ...params, attributes },
  });

  return (
    <KsConfigTable
      actions={actions}
      attributes={attributes}
      data={widgetData}
      entityActions={entityActions}
      onRegisterEvents={registerEvents}
      params={params}
      taskName={taskName}
      widgetId={widgetId}
      {...props}
    />
  );
}
