import { Loader } from '@kleeen/react/components';
import { ReactElement } from 'react';
import Scatter from '../../Scatter/Scatter';
import { WidgetProps } from '@kleeen/types';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
  },
});

export function ScatterWidget({ params, taskName, widgetId }: WidgetProps): ReactElement {
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const classes = useStyles();

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div className={classes.widgetContent}>
      <Scatter context={widgetData} params={params} widgetId={widgetId} />
    </div>
  );
}
