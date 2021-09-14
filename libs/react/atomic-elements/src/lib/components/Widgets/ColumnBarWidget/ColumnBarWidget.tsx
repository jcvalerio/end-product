import ColumnBar from '../../ColumnBar/ColumnBar';
import { Loader } from '@kleeen/react/components';
import { WidgetProps } from '@kleeen/types';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS) + var(--wh-S))',
  },
});

export function ColumnBarWidget({
  attributes,
  params,
  taskName,
  widgetId,
  chartType,
}: WidgetProps): JSX.Element {
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
      <ColumnBar
        context={widgetData}
        base={params.baseModel}
        params={params}
        subType={chartType}
        attributes={attributes}
        widgetId={widgetId}
      />
    </div>
  );
}

export default ColumnBarWidget;
