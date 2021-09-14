import { Loader } from '@kleeen/react/components';
import Pie from '../../Pie/Pie';
import { WidgetProps } from '@kleeen/types';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
  },
});

export function PieWidget({ attributes, params, taskName, widgetId }: WidgetProps): JSX.Element {
  const widgetData = useWidgetContext({
    params,
    taskName,
    widgetId,
  });
  const classes = useStyles();

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <Pie context={widgetData} attributes={attributes} params={params} widgetId={widgetId} />
    </div>
  );
}

export default PieWidget;
