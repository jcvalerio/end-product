import { Widget, WidgetTypes } from '@kleeen/types';

import { isNilOrEmpty } from '@kleeen/common/utils';
import { useWidgetContext } from '@kleeen/react/hooks';

export function getRowsCountByWidget(widget?: Widget): number {
  if (isNilOrEmpty(widget) || isNilOrEmpty(widget.params)) {
    return 0;
  }
  const currentWidgetData = useWidgetContext({
    taskName: widget?.params?.baseModel,
    widgetId: widget?.id,
    params: { ...widget?.params, attributes: widget?.attributes },
  });
  const rowsRetrieved =
    currentWidgetData.data?.pagination?.totalCount ?? currentWidgetData.data?.data?.length ?? 0;
  return rowsRetrieved;
}

export function getRowsCountFromFirstTable(widgets: Widget[]): number {
  const currentWidget = widgets.find((w) => w.chartType === WidgetTypes.FULL_TABLE);
  return getRowsCountByWidget(currentWidget);
}
