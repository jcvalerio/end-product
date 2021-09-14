import { VisualizationWidgetProps, WidgetProps, WidgetTypes } from '@kleeen/types';

import Area from '../../Area/Area';
import AreaGradient from '../../AreaGradient/AreaGradient';
import AreaMacroMicro from '../../AreaMacroMicro/AreaMacroMicro';
import AreaMasterDetail from '../../AreaMasterDetail/AreaMasterDetail';
import { Loader } from '@kleeen/react/components';
import { makeStyles } from '@material-ui/core';
import { useWidgetContext } from '@kleeen/react/hooks';

const useStyles = makeStyles({
  widgetContent: {
    height: 'calc(var(--wh-5XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS) + var(--wh-S))',
  },
  widgetMacroMicroContent: {
    height: 'calc(var(--wh-7XL) - var(--wh-4XS) - var(--pm-5XS))',
  },
});

function AreaWidgetSubtype({ chartType, context, params, widgetId }): JSX.Element {
  const props: VisualizationWidgetProps = {
    context,
    chartType,
    params,
    widgetId,
  };
  // TODO: @cafe Turn this into a map
  switch (chartType) {
    case WidgetTypes.AREA_GRADIENT:
      return <AreaGradient {...props} />;
    case WidgetTypes.AREA_MASTER_DETAIL:
      return <AreaMasterDetail {...props} />;
    case WidgetTypes.AREA_MACRO_MICRO:
      return <AreaMacroMicro {...props} />;
    default:
    case WidgetTypes.AREA:
      return <Area {...props} />;
  }
}

export function AreaWidget({ chartType, params, taskName, widgetId }: WidgetProps): JSX.Element {
  const widgetData = useWidgetContext({ taskName, widgetId, params });
  const classes = useStyles();

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <div
      className={
        chartType === WidgetTypes.AREA_MACRO_MICRO ? classes.widgetMacroMicroContent : classes.widgetContent
      }
    >
      <AreaWidgetSubtype chartType={chartType} context={widgetData} params={params} widgetId={widgetId} />
    </div>
  );
}

export default AreaWidget;
