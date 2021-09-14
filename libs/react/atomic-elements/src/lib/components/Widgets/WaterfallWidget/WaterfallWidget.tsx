import { Loader } from '@kleeen/react/components';
import { Waterfall } from '../../Waterfall/Waterfall';
import { WidgetProps } from '@kleeen/types';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'var(--card-viz-height-S)',
  },
});

export function WaterfallWidget({ taskName, widgetId, params }: WidgetProps): JSX.Element {
  const widgetData = useWidgetContext({
    taskName,
    widgetId,
    params: { ...params, aggregatedByType: 'over' },
  });
  const classes = useStyles();

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <Waterfall context={widgetData} params={params} widgetId={widgetId} />
    </div>
  );
}

export default WaterfallWidget;
