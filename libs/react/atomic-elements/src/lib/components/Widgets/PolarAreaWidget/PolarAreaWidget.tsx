import { Loader } from '@kleeen/react/components';
import PolarArea from '../../PolarArea/PolarArea';
import { WidgetProps } from '@kleeen/types';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
  },
});

export function PolarAreaWidget({ params, taskName, widgetId, attributes }: WidgetProps): JSX.Element {
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const classes = useStyles();

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <PolarArea context={widgetData} params={params} attributes={attributes} widgetId={widgetId} />
    </div>
  );
}

export default PolarAreaWidget;
