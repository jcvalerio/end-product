import {
  Attribute,
  GroupByProps,
  ValueProp,
  ValuesProps,
  VisualizationWidgetProps,
  VizCommonParams,
} from '@kleeen/types';
import React, { ReactElement } from 'react';
import { generalBaseOptions, maxLabelLength, radialCrosshair, radialLegend } from '../generalBaseOptions';
import { useCrossLinkingMenuOnViz, useTextFormattersForViz } from '@kleeen/react/hooks';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import VariablePie from 'highcharts/modules/variable-pie';
import { clone } from 'ramda';
import { formatRadialResults } from '@kleeen/frontend/utils';
import merge from 'lodash.merge';

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
  chart: {
    type: 'variablepie',
    marginBottom: 0,
    marginTop: 0,
  },
  plotOptions: {
    variablepie: {
      borderWidth: 0.5,
    },
  },
  legend: radialLegend,
  tooltip: {
    pointFormat: '{point.name}: {point.y}',
  },
});
interface VizCommonProps extends VizCommonParams {
  attributes: Attribute[];
  base?: string;
  containerProps?: { [key: string]: any };
  context: any; //WidgetState;
  widgetId?: string;
}

export function PolarArea(props: VisualizationWidgetProps & VizCommonProps): ReactElement {
  const { context, params } = props;
  const results = context.data?.results || [];
  const format = context.data?.format || {};
  const { xAxis = {}, yAxis = {} } = format || {};
  const { crossLinking, openMenuIfCrossLink } = useCrossLinkingMenuOnViz(props, { xAxis, yAxis });

  const formattedResults = formatRadialResults(results, xAxis, true, crossLinking, yAxis);
  // TODO: prefix and suffix

  const { groupBy } = params;
  const [formatterGroupBy, formatterGroupByForTooltip, formatterValue] = useTextFormattersForViz(params);

  const options = {
    ...baseOptions,
    xAxis: {
      ...baseOptions.xAxis,
      ...xAxis,
    },
    yAxis: {
      ...baseOptions.yAxis,
      ...yAxis,
    },
    series: [
      {
        data: formattedResults,
        point: radialCrosshair,
        events: {
          click: (e) => {
            openMenuIfCrossLink(e);
          },
        },
      },
    ],
    legend: {
      ...baseOptions.legend,
      labelFormatter() {
        if (groupBy.formatType === 'timestamp') {
          return formatterGroupByForTooltip(this.name);
        }
        const name = formatterGroupBy(this.name) as string;
        return name.length > maxLabelLength
          ? [...name].splice(0, maxLabelLength).join('').trim() + '...'
          : name;
      },
    },
    tooltip: {
      ...baseOptions.tooltip,
      formatter(this) {
        return `${formatterGroupByForTooltip(this.point.name)}: ${formatterValue(this.point.y)}`;
      },
    },
  };
  const containerProps = { ...props.containerProps, style: { height: '100%', width: '100%' } };

  if (context.isLoading) {
    return <Loader />;
  }

  return (
    <HighchartsReact
      containerProps={containerProps}
      highcharts={VariablePie(Highcharts)}
      options={clone(options)}
      {...props}
    />
  );
}

export default React.memo(PolarArea);
