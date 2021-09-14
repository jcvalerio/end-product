import { formatDataList, formatSeverity, parseAttributes } from '@kleeen/frontend/utils';

import { SimpleList } from '@kleeen/react/components';
import { WidgetProps } from '@kleeen/types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const bem = 'ks-table';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
    // Table widgets are the only type of widgets that need to ignore the card-content imposed padding
    margin: '0 calc(-1 * var(--pm-L))',
  },
});

export function TableWidget({ attributes, params, taskName, widgetId }: WidgetProps): JSX.Element {
  const widgetData = useWidgetContext({ taskName, widgetId, params }) || { data: {} };
  const { format, crossLinking, results } = widgetData.data || {};
  const listColumns = parseAttributes(attributes, format);
  const hideHeader = false;
  const { data } = formatDataList({ crossLinking, results, format, params });
  const newWidgetData = {
    isLoading: false,
    ...widgetData,
    data,
    format: formatSeverity(format, params),
  };
  const classes = useStyles();

  return (
    <div className={classnames(bem, classes.widgetContent)}>
      <SimpleList
        columns={listColumns}
        data={newWidgetData.data}
        hideHeader={hideHeader}
        listItemOptions={{
          widgetId,
        }}
      />
    </div>
  );
}

export default TableWidget;
