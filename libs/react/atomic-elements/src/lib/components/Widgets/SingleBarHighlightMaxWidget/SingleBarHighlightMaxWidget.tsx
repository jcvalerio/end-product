import { Loader } from '@kleeen/react/components';
import SingleBarHighlightMax from '../../SingleBarHighlightMax/SingleBarHighlightMax';
import { WidgetProps } from '@kleeen/types';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'var(--card-viz-height-L)',
  },
});
export function SingleBarHighlightMaxWidget({
  attributes,
  params,
  taskName,
  widgetId,
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
      <SingleBarHighlightMax
        attributes={attributes}
        base={params.baseModel}
        context={widgetData}
        params={params}
        widgetId={widgetId}
      />
    </div>
  );
}

export default SingleBarHighlightMaxWidget;
