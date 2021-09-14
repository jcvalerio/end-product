import { KsRankedListItem, SimpleList } from '@kleeen/react/components';
import { formatDataList, formatSeverity, parseAttributes } from '@kleeen/frontend/utils';

import { WidgetProps } from '@kleeen/types';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
    // Table widgets are the only type of widgets that need to ignore the card-content imposed padding
    margin: '0 calc(-1 * var(--pm-L))',
  },
});

export function RankedListWidget({ attributes, params, taskName, widgetId }: WidgetProps): JSX.Element {
  const widgetData = useWidgetContext({ taskName, widgetId, params }) || { data: {} };
  const { format, crossLinking, results } = widgetData.data || {};
  const listColumns = parseAttributes(attributes, format);
  const hideHeader = false;
  const { data, metadata } = formatDataList({ crossLinking, results, format, params, includeMinMax: true });
  const newWidgetData = {
    isLoading: false,
    ...widgetData,
    data,
    format: formatSeverity(format, params),
  };
  const classes = useStyles();

  return (
    <div className={classes.widgetContent}>
      <SimpleList
        columns={listColumns}
        data={newWidgetData.data}
        hideHeader={hideHeader}
        listItemOptions={{
          widgetId,
        }}
        listOptions={{
          ListItemComponent: KsRankedListItem,
          sortBy: metadata?.valueColumnName,
        }}
        metadata={metadata}
      />
    </div>
  );
}

export default RankedListWidget;
