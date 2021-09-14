import { KsRankedListItem, Loader, SimpleList } from '@kleeen/react/components';
import { ReactElement, useEffect } from 'react';
import { formatDataList, parseAttributes } from '@kleeen/frontend/utils';
import {
  useGetNavigationStyle,
  useMasonry,
  useWidgetContext,
  useWindowsDimension,
} from '@kleeen/react/hooks';

import BubbleChart from '../../BubbleChart/BubbleChart';
import { BubbleChartWidgetProps } from './BubbleChartWidget.model';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  widgetContent: {
    height: '100%',
    display: ({ bigWidget }: { bigWidget: boolean }) => (bigWidget ? 'flex' : 'block'),
  },
});

export function BubbleChartWidget({
  attributes,
  disableHeightCalculation,
  params,
  taskName,
  widgetId,
}: BubbleChartWidgetProps): ReactElement {
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const { format, crossLinking, results } = widgetData.data || {};
  const listColumns = parseAttributes(attributes, format);
  const { data, metadata } = formatDataList({ crossLinking, results, format, params, includeMinMax: true });
  const hideHeader = false;
  const { updateLayout } = useMasonry();
  const size = useWindowsDimension();
  const { isNavTop } = useGetNavigationStyle();

  const breakPoint = isNavTop ? 1069 : 1260;
  const bigWidget = size.width > breakPoint && disableHeightCalculation;
  const classes = useStyles({ bigWidget });

  useEffect(() => {
    const cardHeight = 548;
    updateLayout(cardHeight);
  }, [widgetData]);

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <BubbleChart
        attributes={attributes}
        base={params.baseModel}
        bigWidget={bigWidget}
        context={widgetData}
        params={params}
        widgetId={widgetId}
      />
      {bigWidget && (
        <div style={{ height: 'calc(var(--wh-8XL) - var(--wh-2XL))', width: '50%' }}>
          <SimpleList
            columns={listColumns}
            data={data}
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
      )}
    </div>
  );
}
