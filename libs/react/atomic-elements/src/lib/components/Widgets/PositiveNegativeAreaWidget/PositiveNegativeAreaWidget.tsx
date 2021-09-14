import { Loader } from '@kleeen/react/components';
import PositiveNegativeArea from '../../PositiveNegativeArea/PositiveNegativeArea';
import { WidgetProps } from '@kleeen/types';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
  },
});

export function PositiveNegativeAreaWidget({ taskName, widgetId, params }: WidgetProps): JSX.Element {
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
      <PositiveNegativeArea context={widgetData} params={params} widgetId={widgetId} />
    </div>
  );
}

export default PositiveNegativeAreaWidget;
